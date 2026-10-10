import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/generator', label: 'Generator' },
  { path: '/ctc-breakdown', label: 'CTC Breakdown' },
  { path: '/batch', label: 'Batch' },
  { path: '/professional-tax', label: 'Professional Tax' },
  { path: '/blog', label: 'Blog' },
]

export default function Header() {
  const location = useLocation()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              PaySlip<span className="text-primary-600">Maker</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="text-xs text-gray-400">
            by <a href="https://doaide.com" className="text-primary-600 hover:underline">DoAide</a>
          </div>
        </div>
      </div>
    </header>
  )
}
