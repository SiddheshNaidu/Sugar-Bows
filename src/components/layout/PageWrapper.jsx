import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './PageWrapper.css'

export default function PageWrapper({ children, className = '' }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <main className={`page-wrapper ${className}`}>
      {children}
    </main>
  )
}
