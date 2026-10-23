import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownRight, Dumbbell } from 'lucide-react'

function WorkoutSkeleton ({ index }) {
  return (
    <article
      aria-hidden='true'
      className='overflow-hidden rounded-2xl border border-white/10 bg-[#111311]'
    >
      <div className='fitlog-skeleton h-44 bg-white/[0.04]' />

      <div className='space-y-4 p-4'>
        <div className='flex gap-2'>
          <div className='fitlog-skeleton h-5 w-16 rounded-full bg-white/10' />
          <div className='fitlog-skeleton h-5 w-12 rounded-full bg-white/10' />
        </div>

        <div className='fitlog-skeleton h-5 w-4/5 rounded bg-white/10' />

        <div className='fitlog-skeleton h-3 w-2/3 rounded bg-white/[0.07]' />

        <div className='flex justify-between border-t border-white/10 pt-4'>
          <div className='fitlog-skeleton h-4 w-16 rounded bg-white/10' />
          <div className='fitlog-skeleton h-4 w-16 rounded bg-white/10' />
          <div className='fitlog-skeleton h-4 w-10 rounded bg-white/10' />
        </div>
      </div>
    </article>
  )
}

export default function Home () {
  return (
    <>
      <section className='relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_75%_40%,rgba(204,255,0,0.08),transparent_42%)]'>
        <div className='mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-12 lg:py-24'>
          <div className='relative z-10'>
            <p className='mb-5 flex items-center gap-2 text-xs font-black tracking-[0.25em] text-[#ccff00]'>
              <span className='h-2 w-2 rounded-full bg-[#ccff00]' />
              WORKOUT LIBRARY
            </p>

            <h1 className='max-w-3xl text-5xl leading-[0.98] font-black tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl'>
              TRAIN WITH
              <br />
              INTENT.
              <br />
              LOG EVERY <span className='text-[#ccff00]'>SET.</span>
            </h1>

            <p className='mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base'>
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href='#library'
              className='fitlog-button mt-8 inline-flex items-center gap-3 rounded-md px-5 py-4 text-xs tracking-[0.08em] uppercase'
            >
              <Dumbbell size={17} />
              Browse Workouts
              <ArrowDownRight size={17} />
            </a>

            <div className='mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-[10px] font-bold tracking-[0.17em] text-neutral-500'>
              <span>BUILT FOR CONSISTENCY</span>
              <span className='text-[#ccff00]'>/</span>
              <span>TRACK EVERY SESSION</span>
            </div>
          </div>

          <div className='relative mx-auto w-full max-w-[440px] lg:max-w-none'>
            <div className='absolute inset-8 rounded-full bg-[#ccff00]/[0.06] blur-3xl' />

            <div className='relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[#10120e]'>
              <div className='absolute inset-4 rounded-[1.5rem] border border-dashed border-white/10' />

              <div className='absolute top-6 left-6 z-10 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-[9px] font-bold tracking-[0.18em] text-neutral-300 backdrop-blur'>
                MOVEMENT / DISCIPLINE
              </div>

              <Image
                src='/images/banner.png'
                alt='Illustration of a person performing a seated gym exercise'
                width={334}
                height={334}
                priority
                className='relative z-10 h-auto w-[84%] drop-shadow-[0_0_35px_rgba(204,255,0,0.08)]'
              />

              <div className='absolute right-5 bottom-5 left-5 z-10 flex items-center justify-between rounded-xl border border-white/10 bg-black/70 p-4 backdrop-blur'>
                <div>
                  <p className='text-[9px] font-bold tracking-[0.18em] text-neutral-500'>
                    YOUR NEXT SESSION
                  </p>
                  <p className='mt-1 text-sm font-black text-white'>
                    STARTS WITH ONE REP.
                  </p>
                </div>

                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#ccff00] text-black'>
                  <Dumbbell size={19} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id='library'
        className='section-anchor mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20'
      >
        <div className='mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
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

          <span className='inline-flex w-fit items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-[10px] font-bold tracking-wider text-neutral-400'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-[#ccff00]' />
            WORKOUT DATA
          </span>
        </div>

        <div
          role='status'
          aria-live='polite'
          className='mb-5 flex items-center gap-3 text-xs text-neutral-400'
        >
          <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/15 border-t-[#ccff00]' />
          Loading workouts…
        </div>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {Array.from({ length: 12 }, (_, index) => (
            <WorkoutSkeleton key={index} index={index} />
          ))}
        </div>

        <p className='mt-6 text-center text-xs text-neutral-600'>
          Your workout library will appear here.
        </p>
      </section>
    </>
  )
}
