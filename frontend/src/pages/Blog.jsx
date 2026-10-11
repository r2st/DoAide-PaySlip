import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const POSTS = [
  {
    slug: '/blog/payslip-format-india',
    title: 'Payslip Format in India: Complete Guide to Salary Slip Components (2025-26)',
    description: 'Understand the standard payslip format used in India. Learn about mandatory fields, earnings, deductions, and how to read your salary slip correctly.',
    date: 'April 15, 2025',
    readTime: '12 min read',
  },
  {
    slug: '/blog/salary-structure-breakdown',
    title: 'Salary Structure Breakdown in India: Understanding CTC, Gross, and Net Pay',
    description: 'Complete guide to Indian salary structure. Understand CTC vs gross vs net salary, Basic Pay, HRA, DA, PF, ESI, and how each component is calculated.',
    date: 'May 10, 2025',
    readTime: '14 min read',
  },
  {
    slug: '/blog/form-16-guide',
    title: 'Form 16 Guide for Salaried Employees in India: Everything You Need to Know',
    description: 'Complete guide to Form 16. Understand Part A, Part B, how to use it for ITR filing, deadlines, and what to do if your employer doesn\'t provide it.',
    date: 'June 20, 2025',
    readTime: '13 min read',
  },
]

export default function Blog() {
  useEffect(() => {
    document.title = 'Blog — Payslip, Salary & Tax Guides for Indian Employees | DoAide PaySlip'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Guides on payslip format, salary structure, CTC breakdown, Form 16, and tax filing for Indian employees and small businesses.')
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
        <p className="text-lg text-gray-600 dark:text-slate-400">
          Guides on payslip formats, salary structure, CTC breakdown, tax filing, and everything
          Indian employees and HR professionals need to know about payroll.
        </p>
      </header>

      <div className="space-y-8">
        {POSTS.map(post => (
          <Link
            key={post.slug}
            to={post.slug}
            className="block bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all group"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm mb-3">{post.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-500">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
