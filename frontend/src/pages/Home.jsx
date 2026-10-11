import { Link } from 'react-router-dom'

const FEATURES = [
  {
    title: 'Salary Slip Generator',
    description: 'Create professional payslips with company details, earnings, and deductions. Download as PDF instantly.',
    link: '/generator',
    icon: '📄',
  },
  {
    title: 'CTC Breakdown',
    description: 'Auto-calculate salary components from your CTC using standard Indian ratios — Basic, HRA, DA, PF, and more.',
    link: '/ctc-breakdown',
    icon: '📊',
  },
  {
    title: 'Batch Generation',
    description: 'Generate payslips for multiple months at once. Download as a ZIP file with all PDFs.',
    link: '/batch',
    icon: '📦',
  },
  {
    title: 'Professional Tax',
    description: 'Check professional tax rates for any Indian state. Updated for FY 2025-26.',
    link: '/professional-tax',
    icon: '🏛️',
  },
]

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Free Salary Slip Generator
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Generate professional payslips for Indian employees and small businesses.
            No login required. Multiple templates. Instant PDF download.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generator"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-700 font-semibold rounded-lg shadow-lg hover:bg-primary-50 transition-colors"
            >
              Generate Payslip
            </Link>
            <Link
              to="/ctc-breakdown"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg border border-primary-400 hover:bg-primary-400 transition-colors"
            >
              CTC Calculator
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Everything You Need for Payroll
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map(f => (
              <Link
                key={f.link}
                to={f.link}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all group"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm">{f.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Payroll Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/blog/payslip-format-india" className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 border border-gray-100 dark:border-slate-600 transition-all group">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Payslip Format in India</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm">Understand standard payslip components, mandatory fields, earnings, and deductions.</p>
            </Link>
            <Link to="/blog/salary-structure-breakdown" className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 border border-gray-100 dark:border-slate-600 transition-all group">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Salary Structure Breakdown</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm">CTC vs gross vs net salary — understand how Indian salaries are structured.</p>
            </Link>
            <Link to="/blog/form-16-guide" className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 border border-gray-100 dark:border-slate-600 transition-all group">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Form 16 Guide</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm">Everything about Form 16 — Part A, Part B, ITR filing, and deadlines.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Why DoAide PaySlip?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="text-primary-600 dark:text-primary-400 font-bold text-2xl mb-2">100% Free</div>
              <p className="text-gray-600 dark:text-slate-400 text-sm">No hidden charges, no signup, no limits on generation</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="text-primary-600 dark:text-primary-400 font-bold text-2xl mb-2">3 Templates</div>
              <p className="text-gray-600 dark:text-slate-400 text-sm">Standard, Corporate, and Modern designs for every business</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="text-primary-600 dark:text-primary-400 font-bold text-2xl mb-2">India Ready</div>
              <p className="text-gray-600 dark:text-slate-400 text-sm">Built for Indian payroll — PF, ESI, PT, TDS all covered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
