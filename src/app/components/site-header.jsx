'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bookmark, CalendarDays, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Workout', href: '/' },
  { label: 'My Plan', href: '/my-plan' }
]

function readCount (key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || '[]')

    return Array.isArray(value) ? value.length : 0
  } catch {
    return 0
  }
}

export default function SiteHeader () {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [counts, setCounts] = useState({
    plan: 0,
    saved: 0
  })

  useEffect(() => {
    function refreshCounts () {
      setCounts({
        plan: readCount('fitlog-plan'),
        saved: readCount('fitlog-saved')
      })
    }

    refreshCounts()

    window.addEventListener('storage', refreshCounts)
    window.addEventListener('fitlog:updated', refreshCounts)

    return () => {
      window.removeEventListener('storage', refreshCounts)
      window.removeEventListener('fitlog:updated', refreshCounts)
    }
  }, [])

  const isWorkoutActive = pathname === '/' || pathname.startsWith('/workout/')

  const isPlanActive = pathname === '/my-plan'

  function getLinkClass (active) {
    return `rounded-lg px-4 py-2 text-sm font-bold transition ${
      active
        ? 'bg-white/[0.07] text-[#ccff00]'
        : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
    }`
  }

  function renderNavLinks () {
    return navItems.map(item => {
      const active = item.href === '/' ? isWorkoutActive : isPlanActive

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className={getLinkClass(active)}
        >
          {item.label}
        </Link>
      )
    })
  }

  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-[#080908]/95 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10'>
        <Link
          href='/'
          aria-label='FitLog home'
          className='flex shrink-0 items-center gap-2.5'
        >
          <Image src='/images/logo.png' alt='' width={32} height={32} />

          <div>
            <span className='text-xl font-black tracking-[0.14em] text-white'>
              FIT<span className='fitlog-lime'>LOG</span>
            </span>

            <p className='hidden text-[9px] font-bold tracking-[0.18em] text-neutral-500 sm:block'>
              WORKOUT LIBRARY
            </p>
          </div>
        </Link>

        <nav
          aria-label='Main navigation'
          className='hidden items-center gap-1 md:flex'
        >
          {renderNavLinks()}
        </nav>

        <div className='flex shrink-0 items-center gap-2'>
          <Link
            href='/my-plan'
            title="Today's Plan"
            className='inline-flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3 py-2 text-[10px] font-black tracking-wide text-black transition hover:bg-[#d9ff4d] sm:gap-2 sm:px-4 sm:text-xs'
          >
            <CalendarDays size={14} />
            <span>PLAN</span>
            <span className='rounded-full bg-black/10 px-1.5 py-0.5'>
              {counts.plan}
            </span>
          </Link>

          <Link
            href='/my-plan'
            title='Saved workouts'
            className='inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-2 text-[10px] font-black tracking-wide text-white transition hover:border-[#ccff00] sm:gap-2 sm:px-4 sm:text-xs'
          >
            <Bookmark size={14} />
            <span>SAVED</span>
            <span className='rounded-full bg-white/10 px-1.5 py-0.5'>
              {counts.saved}
            </span>
          </Link>

          <button
            type='button'
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
            className='rounded-lg border border-white/15 p-2 text-white transition hover:border-[#ccff00] md:hidden'
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label='Mobile navigation'
          className='flex flex-col gap-2 border-t border-white/10 px-4 py-4 md:hidden'
        >
          {renderNavLinks()}
        </nav>
      )}
    </header>
  )
}
