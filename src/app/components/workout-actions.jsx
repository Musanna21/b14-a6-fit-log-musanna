'use client'

import { CalendarPlus, Bookmark } from 'lucide-react'
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

function writeList (key, list) {
  window.localStorage.setItem(key, JSON.stringify(list))
  window.dispatchEvent(new Event('fitlog:updated'))
}

export default function WorkoutActions ({ workout }) {
  function addToPlan () {
    const plan = readList(PLAN_KEY)

    if (plan.some(item => item.id === workout.id)) {
      toast.warning("This workout is already in today's plan.")
      return
    }

    if (plan.length >= PLAN_LIMIT) {
      toast.error('Your plan is full. The limit is five workouts.')
      return
    }

    writeList(PLAN_KEY, [...plan, workout])
    toast.success("Added to today's plan.")
  }

  function saveForLater () {
    const saved = readList(SAVED_KEY)

    if (saved.some(item => item.id === workout.id)) {
      toast.info('This workout is already saved.')
      return
    }

    writeList(SAVED_KEY, [...saved, workout])
    toast.success('Workout saved for later.')
  }

  return (
    <div className='flex flex-col gap-3 sm:flex-row'>
      <button
        type='button'
        onClick={addToPlan}
        className='fitlog-button inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-xs uppercase'
      >
        <CalendarPlus size={16} />
        Add to Today&apos;s Plan
      </button>

      <button
        type='button'
        onClick={saveForLater}
        className='inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-xs font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]'
      >
        <Bookmark size={16} />
        Save for Later
      </button>
    </div>
  )
}
