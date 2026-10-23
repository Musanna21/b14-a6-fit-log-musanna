'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function ErrorPage ({ error, reset }) {
  useEffect(() => {
    console.error('FitLog application error:', error)
  }, [error])

  return (
    <main className='flex min-h-[65vh] items-center justify-center px-5 py-16'>
      <div className='max-w-lg text-center'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400'>
          <AlertTriangle size={30} />
        </div>

        <p className='mt-7 text-xs font-black tracking-[0.25em] text-[#ccff00]'>
          SOMETHING WENT WRONG
        </p>

        <h1 className='mt-3 text-4xl font-black text-white'>
          LET&apos;S TRY AGAIN
        </h1>

        <p className='mt-4 text-sm leading-7 text-neutral-400'>
          An unexpected error interrupted this page. You can retry or return to
          the workout library.
        </p>

        <div className='mt-7 flex flex-wrap justify-center gap-3'>
          <button
            type='button'
            onClick={() => reset()}
            className='fitlog-button inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs uppercase'
          >
            <RefreshCw size={15} />
            Try Again
          </button>

          <Link
            href='/'
            className='inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-xs font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]'
          >
            <Home size={15} />
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}
