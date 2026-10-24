/* eslint-disable @next/next/no-img-element -- image URLs come from an external API with unknown hosts */
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Clock3,
  Flame,
  Star,
  ChevronDown,
  Dumbbell,
  ArrowUpRight
} from 'lucide-react'

const SORT_OPTIONS = [
  { label: 'Duration', value: 'duration' },
  { label: 'Calories', value: 'caloriesBurned' },
  { label: 'Rating', value: 'rating' }
]

function WorkoutCard ({ workout }) {
  const imageSrc = workout.image || '/images/banner.png'

  return (
    <Link
      href={`/workout/${encodeURIComponent(workout.id)}`}
      className='group block overflow-hidden rounded-2xl border border-white/10 bg-[#111311] transition duration-200 hover:-translate-y-1 hover:border-[#ccff00]/50 hover:bg-[#151713]'
    >
      <div className='relative h-52 overflow-hidden bg-[#171a14] sm:h-48'>
        <img
          src={imageSrc}
          alt={workout.name}
          loading='lazy'
          onError={event => {
            if (!event.currentTarget.src.endsWith('/images/banner.png')) {
              event.currentTarget.src = '/images/banner.png'
            }
          }}
          className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
        />

        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/10' />

        <div className='absolute bottom-3 left-3 flex flex-wrap gap-2'>
          {workout.muscleGroups.slice(0, 3).map(muscle => (
            <span
              key={muscle}
              className='rounded-md border border-white/15 bg-black/60 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white backdrop-blur'
            >
              {muscle}
            </span>
          ))}
        </div>

        <span className='absolute top-3 right-3 rounded-full border border-[#ccff00]/25 bg-black/60 p-2 text-[#ccff00] backdrop-blur'>
          <ArrowUpRight size={15} />
        </span>
      </div>

      <div className='p-4 sm:p-5'>
        <p className='mb-2 text-[9px] font-black tracking-[0.2em] text-[#ccff00]'>
          {workout.difficulty.toUpperCase()}
        </p>

        <h3 className='line-clamp-2 min-h-12 text-lg leading-6 font-black text-white'>
          {workout.name.toUpperCase()}
        </h3>

        <p className='mt-2 flex items-center gap-2 text-xs text-neutral-400'>
          <Dumbbell size={14} className='shrink-0 text-[#ccff00]' />
          <span className='truncate'>{workout.equipment}</span>
        </p>

        <div className='mt-5 grid grid-cols-3 border-t border-white/10 pt-4'>
          <div className='flex flex-col gap-1'>
            <span className='flex items-center gap-1.5 text-[10px] text-neutral-500'>
              <Clock3 size={12} className='text-[#ccff00]' />
              TIME
            </span>
            <span className='text-xs font-bold text-neutral-200'>
              {workout.duration} min
            </span>
          </div>

          <div className='flex flex-col gap-1'>
            <span className='flex items-center gap-1.5 text-[10px] text-neutral-500'>
              <Flame size={12} className='text-[#ccff00]' />
              CALORIES
            </span>
            <span className='text-xs font-bold text-neutral-200'>
              {workout.caloriesBurned} kcal
            </span>
          </div>

          <div className='flex flex-col gap-1'>
            <span className='flex items-center gap-1.5 text-[10px] text-neutral-500'>
              <Star size={12} className='text-[#ccff00]' />
              RATING
            </span>
            <span className='text-xs font-bold text-neutral-200'>
              {workout.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function WorkoutLibrary ({ initialWorkouts }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('duration')

  const filteredWorkouts = useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = initialWorkouts.filter(workout => {
      const searchableText = [
        workout.name,
        workout.equipment,
        workout.difficulty,
        ...workout.muscleGroups
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(query)
    })

    return [...result].sort((a, b) => a[sortBy] - b[sortBy])
  }, [initialWorkouts, search, sortBy])

  return (
    <section
      id='library'
      className='section-anchor mx-auto max-w-360 px-5 py-16 sm:px-8 lg:px-12 lg:py-20'
    >
      <div className='mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
        <div>
          <p className='mb-3 text-[10px] font-black tracking-[0.22em] text-[#ccff00]'>
            FIND YOUR NEXT LIFT
          </p>

          <h2 className='text-4xl font-black tracking-tight text-white sm:text-5xl'>
            THE <span className='text-[#ccff00]'>LIBRARY</span>
          </h2>

          <p className='mt-3 text-sm text-neutral-400'>
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <label className='flex items-center gap-2 rounded-lg border border-white/10 bg-[#111311] px-3 py-2.5'>
            <Search size={16} className='text-neutral-500' />

            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder='Search workouts...'
              aria-label='Search workouts'
              className='w-full bg-transparent text-sm text-white outline-none sm:w-48'
            />
          </label>

          <label className='flex items-center gap-3 rounded-lg border border-white/10 bg-[#111311] px-3 py-2.5'>
            <span className='whitespace-nowrap text-[10px] font-black tracking-wider text-neutral-500'>
              SORT BY
            </span>

            <span className='relative flex items-center'>
              <select
                value={sortBy}
                onChange={event => setSortBy(event.target.value)}
                aria-label='Sort workouts'
                className='w-full appearance-none bg-transparent pr-6 text-sm font-bold text-white outline-none'
              >
                {SORT_OPTIONS.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                    className='bg-[#111311]'
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className='pointer-events-none absolute right-0 text-[#ccff00]'
              />
            </span>
          </label>
        </div>
      </div>

      <div className='mb-5 flex items-center justify-between text-xs text-neutral-500'>
        <span>
          {filteredWorkouts.length} workout
          {filteredWorkouts.length === 1 ? '' : 's'} found
        </span>

        <span className='hidden tracking-[0.15em] sm:inline'>
          SELECT A LIFT TO VIEW DETAILS
        </span>
      </div>

      {filteredWorkouts.length > 0 ? (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {filteredWorkouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : initialWorkouts.length === 0 ? (
        <div className='rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center'>
          <Dumbbell className='mx-auto mb-4 text-[#ccff00]' size={32} />
          <h3 className='text-lg font-black text-white'>
            WORKOUTS UNAVAILABLE
          </h3>
          <p className='mt-2 text-sm leading-6 text-neutral-400'>
            We could not load the workout API. Check your connection and try
            reloading the page.
          </p>
        </div>
      ) : (
        <div className='rounded-2xl border border-white/10 px-6 py-12 text-center'>
          <Search className='mx-auto mb-4 text-neutral-500' size={28} />
          <h3 className='text-lg font-black text-white'>NO WORKOUTS FOUND</h3>
          <p className='mt-2 text-sm text-neutral-500'>
            Try another workout name, muscle group, or equipment.
          </p>
          <button
            type='button'
            onClick={() => setSearch('')}
            className='fitlog-button mt-5 rounded-md px-4 py-2 text-xs'
          >
            Clear Search
          </button>
        </div>
      )}
    </section>
  )
}
