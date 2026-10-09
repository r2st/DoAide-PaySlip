import { useState } from 'react'
import { getProfessionalTax } from '../utils/api'
import { INDIAN_STATES } from '../utils/indianStates'

export default function ProfessionalTax() {
  const [selectedState, setSelectedState] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleLookup(state) {
    setSelectedState(state)
    if (!state) return
    setLoading(true)
    try {
      const data = await getProfessionalTax(state)
      setResult(data)
    } catch {
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Professional Tax by State</h1>
        <p className="text-gray-600 mt-2">
          Check the professional tax rates applicable in your Indian state for payslip deductions.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select State / UT</label>
        <select
          value={selectedState}
          onChange={e => handleLookup(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
        >
          <option value="">— Select —</option>
          {INDIAN_STATES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      )}

      {result && !loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
            <h2 className="text-lg font-semibold text-primary-900">{result.state}</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600">Monthly Deduction</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {Number(result.monthly).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600">Annual Deduction</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {Number(result.annual).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
            {result.note && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800">
                <strong>Note:</strong> {result.note}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Tax in India — Overview</h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            Professional Tax is a state-level tax levied on salaried individuals and professionals
            in India. It is deducted from the employee's salary by the employer and deposited with
            the respective state government. The maximum professional tax allowed under Article
            276 of the Constitution is ₹2,500 per year.
          </p>
          <p className="mt-4">
            Not all states levy professional tax. States like Rajasthan, Haryana, Himachal Pradesh,
            Uttar Pradesh, and Uttarakhand do not impose professional tax. The rates vary by state
            and are typically based on monthly salary slabs.
          </p>
        </div>
      </div>
    </div>
  )
}
