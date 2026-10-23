import Image from 'next/image'
import Link from 'next/link'

export default function SiteFooter () {
  return (
    <footer className='border-t border-white/10 bg-[#080908]'>
      <div className='mx-auto flex max-w-360 flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10'>
        <Link
          href='/'
          className='flex items-center gap-2.5'
          aria-label='FitLog home'
        >
          <Image src='/images/logo.png' alt='' width={28} height={28} />

          <span className='font-black tracking-[0.15em] text-white'>
            FIT<span className='fitlog-lime'>LOG</span>
          </span>
        </Link>

        <p className='text-xs leading-6 text-neutral-500'>
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  )
}
