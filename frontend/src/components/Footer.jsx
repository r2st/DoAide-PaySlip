import { Link } from 'react-router-dom'

const DOAIDE_PRODUCTS = [
  { name: 'SalaryDecode', href: 'https://salary.doaide.com', desc: 'Salary intelligence' },
  { name: 'RentBanao', href: 'https://rentbanao.doaide.com', desc: 'Rent receipts' },
  { name: 'PaySlip', href: 'https://payslip.doaide.com', desc: 'Payslip generator' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">
              DoAide <span className="text-gray-500 font-light">|</span> <span className="text-primary-400">PaySlip</span>
            </h3>
            <p className="text-sm">
              Free salary slip generator for Indian employees and small businesses.
              No login required.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/generator" className="hover:text-white transition-colors">Salary Slip Generator</Link></li>
              <li><Link to="/ctc-breakdown" className="hover:text-white transition-colors">CTC Breakdown Calculator</Link></li>
              <li><Link to="/batch" className="hover:text-white transition-colors">Batch Generation</Link></li>
              <li><Link to="/professional-tax" className="hover:text-white transition-colors">Professional Tax by State</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Guides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog/payslip-format-india" className="hover:text-white transition-colors">Payslip Format India</Link></li>
              <li><Link to="/blog/salary-structure-breakdown" className="hover:text-white transition-colors">Salary Structure Breakdown</Link></li>
              <li><Link to="/blog/form-16-guide" className="hover:text-white transition-colors">Form 16 Guide</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">All Articles</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">DoAide Products</h4>
            <ul className="space-y-2 text-sm">
              {DOAIDE_PRODUCTS.map(p => (
                <li key={p.name}>
                  <a href={p.href} className="hover:text-white transition-colors">
                    {p.name} <span className="text-gray-600">— {p.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} DoAide. All rights reserved.</p>
          <a
            href="https://doaide.com"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-xs"
          >
            <span className="w-5 h-5 rounded bg-primary-600 flex items-center justify-center text-white font-bold" style={{ fontSize: '8px' }}>DA</span>
            A DoAide Product
          </a>
        </div>
      </div>
    </footer>
  )
}
