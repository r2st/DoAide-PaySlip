import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Generator from './pages/Generator'
import CTCBreakdown from './pages/CTCBreakdown'
import Batch from './pages/Batch'
import ProfessionalTax from './pages/ProfessionalTax'

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
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
