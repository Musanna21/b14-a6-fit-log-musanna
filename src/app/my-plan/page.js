'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Dumbbell,
  Flame,
  Search,
  Star,
  X
} from 'lucide-react'
import { toast } from 'react-toastify'

const PLAN_KEY = 'fitlog-plan'
const SAVED_KEY = 'fitlog-saved'
const PLAN_LIMIT = 5

function readList (key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || '[]')

    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

function saveList (key, items) {
  window.localStorage.setItem(key, JSON.stringify(items))

  // Keep the navbar counters synchronized in the same browser tab.
  window.dispatchEvent(new Event('fitlog:updated'))
}

function formatNumber (value) {
  const number = Number(value)

  return Number.isFinite(number) ? number.toLocaleString() : '0'
}

function WorkoutItem ({ workout, isPlanItem, onRemove, onMarkDone }) {
  const isDone = Boolean(workout.done)

  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-[#111311] transition ${
        isDone ? 'border-[#ccff00]/25' : 'border-white/10 hover:border-white/20'
      }`}
    >
      <div className='flex flex-col sm:flex-row'>
        {/* Workout thumbnail */}
        <Link
          href={`/workout/${encodeURIComponent(workout.id)}`}
          aria-label={`View ${workout.name} details`}
          className='relative h-48 shrink-0 overflow-hidden bg-[#181b15] sm:h-auto sm:min-h-55 sm:w-48 lg:w-56'
        >
          <img
            src={workout.image || '/images/banner.png'}
            alt={workout.name}
            loading='lazy'
            onError={event => {
              if (!event.currentTarget.src.endsWith('/images/banner.png')) {
                event.currentTarget.src = '/images/banner.png'
              }
            }}
            className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
              isDone ? 'opacity-60' : ''
            }`}
          />

          <div className='absolute top-3 left-3 rounded-md border border-white/15 bg-black/70 px-2.5 py-1.5 text-[9px] font-black tracking-wider text-[#ccff00]'>
            {isPlanItem ? "TODAY'S PLAN" : 'SAVED WORKOUT'}
          </div>

          {isDone && (
            <div className='absolute right-3 bottom-3 flex items-center gap-1 rounded-md bg-[#ccff00] px-2.5 py-1.5 text-[9px] font-black text-black'>
              <Check size={12} />
              COMPLETED
            </div>
          )}
        </Link>

        {/* Workout details and actions */}
        <div className='flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6'>
          <div className='flex items-start justify-between gap-3'>
            <div className='min-w-0'>
              <p className='mb-2 text-[9px] font-black tracking-[0.2em] text-[#ccff00]'>
                {workout.difficulty || 'WORKOUT'}
              </p>

              <h2
                className={`text-xl leading-tight font-black uppercase sm:text-2xl ${
                  isDone ? 'text-neutral-400' : 'text-white'
                }`}
              >
                {workout.name}
              </h2>

              <p className='mt-2 flex items-center gap-2 text-xs text-neutral-400'>
                <Dumbbell size={14} className='shrink-0 text-[#ccff00]' />
                <span className='wrap-break-word'>
                  {workout.equipment || 'Bodyweight'}
                </span>
              </p>
            </div>

            <button
              type='button'
              onClick={() => onRemove(workout.id)}
              aria-label={`Remove ${workout.name}`}
              title='Remove workout'
              className='shrink-0 rounded-lg border border-white/10 p-2 text-neutral-500 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400'
            >
              <X size={17} />
            </button>
          </div>

          {/* Workout statistics */}
          <div className='mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4'>
            <div>
              <p className='flex items-center gap-1.5 text-[9px] font-bold tracking-wide text-neutral-500'>
                <Clock3 size={12} className='text-[#ccff00]' />
                DURATION
              </p>
              <p className='mt-1 text-xs font-bold text-white'>
                {formatNumber(workout.duration)} min
              </p>
            </div>

            <div>
              <p className='flex items-center gap-1.5 text-[9px] font-bold tracking-wide text-neutral-500'>
                <Flame size={12} className='text-[#ccff00]' />
                CALORIES
              </p>
              <p className='mt-1 text-xs font-bold text-white'>
                {formatNumber(workout.caloriesBurned)} kcal
              </p>
            </div>

            <div>
              <p className='flex items-center gap-1.5 text-[9px] font-bold tracking-wide text-neutral-500'>
                <Star size={12} className='text-[#ccff00]' />
                RATING
              </p>
              <p className='mt-1 text-xs font-bold text-white'>
                {formatNumber(workout.rating)}
              </p>
            </div>
          </div>

          {/* Card buttons */}
          <div className='mt-5 flex flex-wrap items-center gap-2'>
            <Link
              href={`/workout/${encodeURIComponent(workout.id)}`}
              className='inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-3 py-2.5 text-[10px] font-black uppercase tracking-wide text-white transition hover:border-[#ccff00]/50 hover:text-[#ccff00]'
            >
              View Details
              <ArrowRight size={13} />
            </Link>

            {isPlanItem && (
              <button
                type='button'
                disabled={isDone}
                onClick={() => onMarkDone(workout.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-[10px] font-black uppercase tracking-wide transition ${
                  isDone
                    ? 'cursor-default border border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]'
                    : 'fitlog-button'
                }`}
              >
                {isDone ? <CheckCircle2 size={14} /> : <Check size={14} />}
                {isDone ? 'Done' : 'Mark as Done'}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function MetricCard ({ label, value, unit, icon }) {
  return (
    <div className='rounded-xl border border-white/10 bg-[#111311] p-4 sm:p-5'>
      <div className='flex items-center justify-between gap-3'>
        <p className='text-[10px] font-black tracking-[0.16em] text-neutral-500'>
          {label}
        </p>

        <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#ccff00]/10 text-[#ccff00]'>
          {icon}
        </span>
      </div>

      <p className='mt-4 text-3xl font-black tracking-tight text-white'>
        {formatNumber(value)}
        {unit && (
          <span className='ml-1 text-sm font-bold text-neutral-500'>
            {unit}
          </span>
        )}
      </p>
    </div>
  )
}

function EmptyState ({ activeTab }) {
  const isPlanTab = activeTab === 'plan'

  return (
    <div className='rounded-2xl border border-dashed border-white/15 bg-[#111311]/70 px-5 py-14 text-center sm:py-20'>
      <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/5 text-[#ccff00]'>
        {isPlanTab ? <CalendarDays size={30} /> : <Bookmark size={30} />}
      </div>

      <p className='mt-6 text-[10px] font-black tracking-[0.25em] text-[#ccff00]'>
        {isPlanTab ? 'YOUR NEXT SESSION STARTS HERE' : 'KEEP IT FOR LATER'}
      </p>

      <h2 className='mt-3 text-3xl font-black text-white sm:text-4xl'>
        {isPlanTab ? 'NOTHING HERE YET' : 'NO SAVED WORKOUTS'}
      </h2>

      <p className='mx-auto mt-3 max-w-md text-sm leading-7 text-neutral-400'>
        {isPlanTab
          ? 'Browse the library and add a lift to get today moving.'
          : 'Save workouts from the library so you can quickly find them again.'}
      </p>

      <Link
        href='/'
        className='fitlog-button mt-7 inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs uppercase'
      >
        Go to workouts
        <ArrowRight size={15} />
      </Link>
    </div>
  )
}

export default function MyPlanPage () {
  const [activeTab, setActiveTab] = useState('plan')
  const [plan, setPlan] = useState([])
  const [saved, setSaved] = useState([])
  const [search, setSearch] = useState('')
  const [ready, setReady] = useState(false)

  // Read browser storage after the page mounts to avoid hydration errors.
  useEffect(() => {
    function syncFromStorage () {
      const storedPlan = readList(PLAN_KEY).map(item => ({
        ...item,
        done: Boolean(item.done)
      }))

      setPlan(storedPlan)
      setSaved(readList(SAVED_KEY))
      setReady(true)
    }

    syncFromStorage()

    window.addEventListener('storage', syncFromStorage)
    window.addEventListener('fitlog:updated', syncFromStorage)

    return () => {
      window.removeEventListener('storage', syncFromStorage)
      window.removeEventListener('fitlog:updated', syncFromStorage)
    }
  }, [])

  const metrics = useMemo(() => {
    return {
      exercises: plan.length,
      minutes: plan.reduce(
        (total, item) => total + (Number(item.duration) || 0),
        0
      ),
      calories: plan.reduce(
        (total, item) => total + (Number(item.caloriesBurned) || 0),
        0
      )
    }
  }, [plan])

  const visibleWorkouts = useMemo(() => {
    const items = activeTab === 'plan' ? plan : saved
    const query = search.trim().toLowerCase()

    return items.filter(item => {
      const searchableText = [
        item.name,
        item.equipment,
        item.difficulty,
        ...(Array.isArray(item.muscleGroups) ? item.muscleGroups : [])
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(query)
    })
  }, [activeTab, plan, saved, search])

  function removeWorkout (id) {
    if (activeTab === 'plan') {
      const nextPlan = plan.filter(item => String(item.id) !== String(id))

      setPlan(nextPlan)
      saveList(PLAN_KEY, nextPlan)
      toast.info("Workout removed from today's plan.")
    } else {
      const nextSaved = saved.filter(item => String(item.id) !== String(id))

      setSaved(nextSaved)
      saveList(SAVED_KEY, nextSaved)
      toast.info('Workout removed from Saved.')
    }
  }

  function markWorkoutDone (id) {
    const workout = plan.find(item => String(item.id) === String(id))

    if (!workout || workout.done) return

    const nextPlan = plan.map(item =>
      String(item.id) === String(id) ? { ...item, done: true } : item
    )

    setPlan(nextPlan)
    saveList(PLAN_KEY, nextPlan)

    toast.success(`${workout.name} marked as done!`)
  }

  function changeTab (tab) {
    setActiveTab(tab)
    setSearch('')
  }

  if (!ready) {
    return (
      <section className='mx-auto min-h-[65vh] max-w-360 px-5 py-16 sm:px-8 lg:px-12'>
        <p className='mb-4 text-[10px] font-black tracking-[0.2em] text-[#ccff00]'>
          FITLOG / MY PLAN
        </p>

        <div
          role='status'
          aria-live='polite'
          className='flex items-center gap-3 text-sm text-neutral-400'
        >
          <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/15 border-t-[#ccff00]' />
          Loading workouts…
        </div>
      </section>
    )
  }

  const isPlanTab = activeTab === 'plan'

  return (
    <section className='mx-auto min-h-[70vh] max-w-360 px-5 py-12 sm:px-8 lg:px-12 lg:py-16'>
      {/* Heading */}
      <div className='mb-9'>
        <p className='mb-3 text-[10px] font-black tracking-[0.25em] text-[#ccff00]'>
          WORKOUT TRACKER / DAILY LOG
        </p>

        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h1 className='text-5xl leading-none font-black tracking-tight text-white sm:text-6xl'>
              MY <span className='text-[#ccff00]'>PLAN</span>
            </h1>

            <p className='mt-4 max-w-xl text-sm leading-6 text-neutral-400'>
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <div className='w-fit rounded-lg border border-white/10 bg-[#111311] px-4 py-3'>
            <p className='text-[9px] font-black tracking-[0.18em] text-neutral-500'>
              DAILY CAPACITY
            </p>

            <p className='mt-1 text-lg font-black text-white'>
              <span className='text-[#ccff00]'>{plan.length}</span>
              <span className='mx-1 text-neutral-600'>/</span>
              {PLAN_LIMIT}
              <span className='ml-2 text-xs font-bold text-neutral-500'>
                LIFTS
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Summary metrics */}
      <div className='mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3'>
        <MetricCard
          label='EXERCISES'
          value={metrics.exercises}
          icon={<Dumbbell size={18} />}
        />

        <MetricCard
          label='TOTAL DURATION'
          value={metrics.minutes}
          unit='min'
          icon={<Clock3 size={18} />}
        />

        <MetricCard
          label='TOTAL CALORIES'
          value={metrics.calories}
          unit='kcal'
          icon={<Flame size={18} />}
        />
      </div>

      {/* Tabs */}
      <div className='mb-6 flex flex-col gap-4 border-b border-white/10 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => changeTab('plan')}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-4 text-xs font-black uppercase tracking-wide transition ${
              isPlanTab
                ? 'border-[#ccff00] text-[#ccff00]'
                : 'border-transparent text-neutral-500 hover:text-white'
            }`}
          >
            <CalendarDays size={15} />
            Today&apos;s Plan
            <span className='rounded-full bg-white/10 px-2 py-1 text-[10px]'>
              {plan.length}
            </span>
          </button>

          <button
            type='button'
            onClick={() => changeTab('saved')}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-4 text-xs font-black uppercase tracking-wide transition ${
              !isPlanTab
                ? 'border-[#ccff00] text-[#ccff00]'
                : 'border-transparent text-neutral-500 hover:text-white'
            }`}
          >
            <Bookmark size={15} />
            Saved
            <span className='rounded-full bg-white/10 px-2 py-1 text-[10px]'>
              {saved.length}
            </span>
          </button>
        </div>

        {visibleWorkouts.length > 0 && (
          <label className='mb-3 flex items-center gap-2 rounded-lg border border-white/10 bg-[#111311] px-3 py-2.5 sm:mb-0'>
            <Search size={15} className='text-neutral-500' />

            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder='Search your workouts...'
              aria-label='Search your workouts'
              className='w-full bg-transparent text-xs text-white outline-none sm:w-52'
            />
          </label>
        )}
      </div>

      {/* List heading */}
      <div className='mb-5 flex items-center justify-between gap-3'>
        <div>
          <h2 className='text-sm font-black uppercase tracking-[0.14em] text-white'>
            {isPlanTab ? "TODAY'S SESSION" : 'SAVED WORKOUTS'}
          </h2>

          <p className='mt-1 text-xs text-neutral-500'>
            {visibleWorkouts.length}{' '}
            {visibleWorkouts.length === 1 ? 'workout' : 'workouts'}
            {search.trim() ? ' matching your search' : ''}
          </p>
        </div>

        {isPlanTab && plan.length > 0 && (
          <span className='hidden items-center gap-1.5 text-[10px] font-bold tracking-wide text-neutral-500 sm:flex'>
            <CheckCircle2 size={14} className='text-[#ccff00]' />
            {plan.filter(item => item.done).length} COMPLETED
          </span>
        )}
      </div>

      {/* Workout list */}
      {visibleWorkouts.length > 0 ? (
        <div className='space-y-4'>
          {visibleWorkouts.map(workout => (
            <WorkoutItem
              key={workout.id}
              workout={workout}
              isPlanItem={isPlanTab}
              onRemove={removeWorkout}
              onMarkDone={markWorkoutDone}
            />
          ))}
        </div>
      ) : search.trim() ? (
        <div className='rounded-2xl border border-white/10 bg-[#111311] px-5 py-12 text-center'>
          <Search size={26} className='mx-auto mb-4 text-neutral-500' />

          <h2 className='text-xl font-black text-white'>NO MATCHES FOUND</h2>

          <p className='mt-2 text-sm text-neutral-400'>
            Try a different workout name or equipment.
          </p>

          <button
            type='button'
            onClick={() => setSearch('')}
            className='fitlog-button mt-5 rounded-md px-4 py-2.5 text-xs'
          >
            Clear Search
          </button>
        </div>
      ) : (
        <EmptyState activeTab={activeTab} />
      )}

      {isPlanTab && plan.length >= PLAN_LIMIT && (
        <p className='mt-6 text-center text-xs leading-6 text-neutral-500'>
          Your plan is full. Remove a workout before adding another lift.
        </p>
      )}
    </section>
  )
}
