'use client'

/* eslint-disable @next/next/no-img-element -- image URLs come from an external API with unknown hosts */

const FALLBACK_IMAGE = '/images/banner.png'

// Client Component so the onError fallback can be used from Server Components.
export default function WorkoutImage ({ src, alt, className }) {
  return (
    <img
      src={src || FALLBACK_IMAGE}
      alt={alt}
      onError={event => {
        if (!event.currentTarget.src.endsWith(FALLBACK_IMAGE)) {
          event.currentTarget.src = FALLBACK_IMAGE
        }
      }}
      className={className}
    />
  )
}
