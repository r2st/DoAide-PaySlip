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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
