import Link from 'next/link'
import { ArrowLeft, Dumbbell } from 'lucide-react'

export default function NotFound () {
  return (
    <main className='flex min-h-[70vh] items-center justify-center px-5 py-16'>
      <div className='max-w-lg text-center'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ccff00]/20 bg-[#ccff00]/5 text-[#ccff00]'>
          <Dumbbell size={28} />
        </div>

        <p className='mt-7 text-xs font-black tracking-[0.25em] text-[#ccff00]'>
          ERROR 404
        </p>

        <h1 className='mt-3 text-5xl font-black text-white'>LIFT NOT FOUND</h1>

        <p className='mt-4 text-sm leading-7 text-neutral-400'>
          We couldn&apos;t find that workout. Head back to the library and
          choose another exercise.
        </p>

        <Link
          href='/'
          className='fitlog-button mt-7 inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs uppercase'
        >
          <ArrowLeft size={15} />
          Back to Workouts
        </Link>
      </div>
    </main>
  )
}
