import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Generator from './pages/Generator'
import CTCBreakdown from './pages/CTCBreakdown'
import Batch from './pages/Batch'
import ProfessionalTax from './pages/ProfessionalTax'
import Blog from './pages/Blog'
import PayslipFormatIndia from './pages/blog/PayslipFormatIndia'
import SalaryStructureBreakdown from './pages/blog/SalaryStructureBreakdown'
import Form16Guide from './pages/blog/Form16Guide'

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('da-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('da-theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark]
}

export default function App() {
  const [dark, setDark] = useTheme()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Header />
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </div>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/ctc-breakdown" element={<CTCBreakdown />} />
          <Route path="/batch" element={<Batch />} />
          <Route path="/professional-tax" element={<ProfessionalTax />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/payslip-format-india" element={<PayslipFormatIndia />} />
          <Route path="/blog/salary-structure-breakdown" element={<SalaryStructureBreakdown />} />
          <Route path="/blog/form-16-guide" element={<Form16Guide />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
