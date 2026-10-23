import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import SiteFooter from './components/site-footer'
import SiteHeader from './components/site-header'
import ToastProvider from './components/toast-provider'

export const metadata = {
  title: 'FitLog — Workout Library',
  description:
    "Browse workouts, build today's training plan, and save exercises for later."
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col antialiased'>
        <SiteHeader />
        <main className='flex-1'>{children}</main>
        <SiteFooter />
        <ToastProvider />
      </body>
    </html>
  )
}
