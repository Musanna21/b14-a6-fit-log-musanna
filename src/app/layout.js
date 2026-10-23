import './globals.css'
import SiteFooter from './components/site-footer'
import SiteHeader from './components/site-header'

export const metadata = {
  title: 'FitLog — Workout Library',
  description:
    "A dark, no-nonsense gym companion. Pick a lift, build today's plan, and log every set."
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col antialiased'>
        <SiteHeader />

        <main className='flex-1'>{children}</main>

        <SiteFooter />
      </body>
    </html>
  )
}
