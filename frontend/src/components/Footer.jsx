import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">
              PaySlip<span className="text-primary-400">Maker</span>
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
            <h4 className="text-white font-medium mb-3">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://doaide.com" className="hover:text-white transition-colors">DoAide</a></li>
              <li><a href="https://salary.doaide.com" className="hover:text-white transition-colors">SalaryDecode</a></li>
              <li><a href="https://rentbanao.doaide.com" className="hover:text-white transition-colors">RentBanao</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} DoAide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
