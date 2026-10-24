import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Clock3,
  Flame,
  Star,
  Dumbbell,
  Layers,
  Repeat
} from 'lucide-react'

import { getWorkoutById } from '../../../lib/fitlog'
import WorkoutActions from '../../../components/workout-actions'

export default async function WorkoutDetailPage ({ params }) {
  const { id } = await params
  const workout = await getWorkoutById(id)

  if (!workout) {
    notFound()
  }

  return (
    <section className='mx-auto max-w-360 px-5 py-10 sm:px-8 lg:px-12 lg:py-14'>
      <Link
        href='/'
        className='mb-8 inline-flex items-center gap-2 text-xs font-bold text-neutral-400 transition hover:text-[#ccff00]'
      >
        <ArrowLeft size={15} />
        BACK TO THE LIBRARY
      </Link>

      <div className='grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12'>
        <div className='relative min-h-75 overflow-hidden rounded-2xl border border-white/10 bg-[#111311] sm:min-h-105 lg:min-h-150'>
          <img
            src={workout.image || '/images/banner.png'}
            alt={workout.name}
            onError={event => {
              if (!event.currentTarget.src.endsWith('/images/banner.png')) {
                event.currentTarget.src = '/images/banner.png'
              }
            }}
            className='absolute inset-0 h-full w-full object-cover'
          />

          <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent' />

          <div className='absolute right-5 bottom-5 left-5'>
            <p className='text-[10px] font-black tracking-[0.2em] text-[#ccff00]'>
              WORKOUT / DETAIL
            </p>
            <h1 className='mt-2 text-3xl font-black uppercase text-white sm:text-5xl'>
              {workout.name}
            </h1>
          </div>
        </div>

        <div>
          <p className='text-[10px] font-black tracking-[0.2em] text-[#ccff00]'>
            YOUR NEXT SESSION
          </p>

          <h2 className='mt-3 text-3xl font-black uppercase text-white sm:text-4xl'>
            {workout.name}
          </h2>

          <p className='mt-4 text-sm leading-7 text-neutral-400'>
            {workout.description}
          </p>

          <div className='mt-5 flex flex-wrap gap-2'>
            {workout.muscleGroups.map(group => (
              <span
                key={group}
                className='rounded-md border border-[#ccff00]/20 bg-[#ccff00]/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#ccff00]'
              >
                {group}
              </span>
            ))}
          </div>

          <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3'>
            <Stat
              icon={<Dumbbell size={15} />}
              label='EQUIPMENT'
              value={workout.equipment}
            />
            <Stat
              icon={<Layers size={15} />}
              label='DIFFICULTY'
              value={workout.difficulty}
            />
            <Stat
              icon={<Repeat size={15} />}
              label='SETS'
              value={workout.sets}
            />
            <Stat
              icon={<Clock3 size={15} />}
              label='DURATION'
              value={`${workout.duration} min`}
            />
            <Stat
              icon={<Flame size={15} />}
              label='CALORIES'
              value={`${workout.caloriesBurned} kcal`}
            />
            <Stat
              icon={<Star size={15} />}
              label='RATING'
              value={workout.rating.toFixed(1)}
            />
          </div>

          <div className='mt-9'>
            <h3 className='text-xs font-black tracking-[0.18em] text-white'>
              INSTRUCTIONS
            </h3>

            <ol className='mt-4 space-y-3'>
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${index}-${instruction}`}
                  className='flex gap-3 rounded-xl border border-white/10 bg-[#111311] p-3.5'
                >
                  <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black'>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <p className='pt-1 text-sm leading-6 text-neutral-300'>
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className='mt-8'>
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat ({ icon, label, value }) {
  return (
    <div className='min-w-0 rounded-xl border border-white/10 bg-[#111311] p-3.5'>
      <p className='flex items-center gap-2 text-[9px] font-black tracking-wider text-neutral-500'>
        <span className='text-[#ccff00]'>{icon}</span>
        {label}
      </p>

      <p className='mt-2 wrap-break-word text-sm font-bold text-white'>{value}</p>
    </div>
  )
}
