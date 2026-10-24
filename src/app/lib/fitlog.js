// Optionally set FITLOG_API_URL in the environment to use a different API first.
const API_BASES = [
  process.env.FITLOG_API_URL,
  'https://api.abcz.workers.dev/api/fitlog',
  'https://api.api-store.workers.dev/api/fitlog'
].filter(Boolean)

const REQUEST_TIMEOUT_MS = 5000

function toNumber (value, fallback = 0) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : fallback
  }

  const match = String(value ?? '').match(/[\d.]+/)
  const parsed = match ? Number(match[0]) : NaN

  return Number.isFinite(parsed) ? parsed : fallback
}

function toStringArray (value) {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean)
  }

  if (typeof value === 'string' && value.trim()) {
    return value
      .split(/[,|]/)
      .map(item => item.trim())
      .filter(Boolean)
  }

  return []
}

function unwrapArray (payload) {
  if (Array.isArray(payload)) return payload

  const candidates = [
    payload?.data,
    payload?.workouts,
    payload?.results,
    payload?.items,
    payload?.data?.workouts,
    payload?.data?.items
  ]

  return candidates.find(Array.isArray) ?? []
}

function unwrapObject (payload) {
  if (Array.isArray(payload)) return payload[0] ?? null

  return (
    payload?.data?.workout ??
    payload?.data ??
    payload?.workout ??
    payload ??
    null
  )
}

export function normalizeWorkout (item) {
  if (!item || typeof item !== 'object') return null

  const id = item.id ?? item._id ?? item.slug
  const name = item.name ?? item.title ?? item.workoutName

  if (id == null || !name) return null

  const muscleGroups = toStringArray(
    item.muscleGroups ??
      item.muscle_groups ??
      item.muscles ??
      item.muscleGroup ??
      item.categories ??
      item.category ??
      item.tags
  )

  const instructions = toStringArray(
    item.instructions ?? item.steps ?? item.howTo
  )

  const equipmentValue =
    item.equipment ?? item.equipments ?? item.equipmentName ?? 'Bodyweight'

  const equipment = Array.isArray(equipmentValue)
    ? equipmentValue.join(', ')
    : String(equipmentValue)

  return {
    id: String(id),
    name: String(name),
    image:
      item.image ??
      item.imageUrl ??
      item.image_url ??
      item.thumbnail ??
      item.photo ??
      '',
    muscleGroups,
    equipment,
    difficulty: String(item.difficulty ?? 'Not specified'),
    duration: toNumber(
      item.duration ?? item.durationMinutes ?? item.durationMin
    ),
    caloriesBurned: toNumber(
      item.caloriesBurned ?? item.calories_burned ?? item.calories ?? item.kcal
    ),
    sets: toNumber(item.sets),
    reps: String(item.reps ?? '—'),
    rating: toNumber(item.rating ?? item.score),
    description: String(
      item.description ?? item.details ?? 'No description provided.'
    ),
    instructions:
      instructions.length > 0
        ? instructions
        : [
            'Review the exercise form before beginning.',
            'Choose a suitable weight and controlled pace.',
            'Perform the movement with proper technique.',
            'Rest and repeat according to your training plan.'
          ]
  }
}

export async function getWorkouts () {
  for (const baseUrl of API_BASES) {
    try {
      const response = await fetch(baseUrl, {
        cache: 'no-store',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
      })

      if (!response.ok) continue

      const payload = await response.json()

      const workouts = unwrapArray(payload)
        .map(normalizeWorkout)
        .filter(Boolean)

      if (workouts.length > 0) {
        return workouts
      }
    } catch (error) {
      console.error(`Failed to fetch workouts from ${baseUrl}`, error)
    }
  }

  return []
}

export async function getWorkoutById (id) {
  const workouts = await getWorkouts()

  // An empty list means the API could not be reached. Throw so the error page
  // (with a retry button) is shown instead of a misleading "not found".
  if (workouts.length === 0) {
    throw new Error('The workout API is currently unavailable.')
  }

  return workouts.find(workout => String(workout.id) === String(id)) ?? null
}
