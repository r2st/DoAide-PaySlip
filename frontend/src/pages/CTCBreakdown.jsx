import { useState } from 'react'
import { calculateCTCBreakdown } from '../utils/api'

export default function CTCBreakdown() {
  const [ctc, setCTC] = useState('')
  const [includeESI, setIncludeESI] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCalculate(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await calculateCTCBreakdown({
        annual_ctc: Number(ctc),
        include_esi: includeESI,
      })
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function fmt(val) {
    return Number(val).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">CTC Breakdown Calculator</h1>
        <p className="text-gray-600 mt-2">
          Enter your annual CTC to see the salary component breakdown using standard Indian ratios.
        </p>
      </div>

      <form onSubmit={handleCalculate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual CTC (INR) <span className="text-red-500">*</span></label>
            <input
              type="number"
              value={ctc}
              onChange={e => setCTC(e.target.value)}
              required
              min={1}
              placeholder="1200000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeESI}
                onChange={e => setIncludeESI(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              Include ESI
            </label>
            <button
              type="submit"
              disabled={loading || !ctc}
              className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center">
              <div className="text-sm text-green-700">Gross Salary (Monthly)</div>
              <div className="text-2xl font-bold text-green-800">{fmt(result.gross_salary_monthly)}</div>
            </div>
            <div className="bg-red-50 rounded-xl p-5 border border-red-200 text-center">
              <div className="text-sm text-red-700">Total Deductions</div>
              <div className="text-2xl font-bold text-red-800">
                {fmt(result.employee_pf_monthly + result.employee_esi_monthly + result.professional_tax_monthly)}
              </div>
            </div>
            <div className="bg-primary-50 rounded-xl p-5 border border-primary-200 text-center">
              <div className="text-sm text-primary-700">Net In-Hand (Monthly)</div>
              <div className="text-2xl font-bold text-primary-800">{fmt(result.net_salary_monthly)}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Component</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-700">Monthly</th>
                  <th className="text-right px-6 py-3 font-semibold text-gray-700">Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-green-50">
                  <td className="px-6 py-2 font-medium text-green-800" colSpan={3}>Earnings</td>
                </tr>
                {[
                  ['Basic Salary', result.basic_salary_monthly, result.basic_salary_annual],
                  ['HRA', result.hra_monthly, result.hra_annual],
                  ['DA', result.da_monthly, result.da_annual],
                  ['Conveyance', result.conveyance_monthly, result.conveyance_annual],
                  ['Medical', result.medical_monthly, result.medical_annual],
                  ['Special Allowance', result.special_allowance_monthly, result.special_allowance_annual],
                ].map(([name, m, a]) => (
                  <tr key={name}>
                    <td className="px-6 py-2 text-gray-700">{name}</td>
                    <td className="px-6 py-2 text-right text-gray-900">{fmt(m)}</td>
                    <td className="px-6 py-2 text-right text-gray-900">{fmt(a)}</td>
                  </tr>
                ))}
                <tr className="bg-green-50 font-semibold">
                  <td className="px-6 py-2 text-green-800">Gross Salary</td>
                  <td className="px-6 py-2 text-right text-green-800">{fmt(result.gross_salary_monthly)}</td>
                  <td className="px-6 py-2 text-right text-green-800">{fmt(result.gross_salary_annual)}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-2 font-medium text-red-800" colSpan={3}>Deductions</td>
                </tr>
                {[
                  ['Employee PF', result.employee_pf_monthly, result.employee_pf_annual],
                  ['Employee ESI', result.employee_esi_monthly, result.employee_esi_annual],
                  ['Professional Tax', result.professional_tax_monthly, result.professional_tax_annual],
                ].map(([name, m, a]) => (
                  <tr key={name}>
                    <td className="px-6 py-2 text-gray-700">{name}</td>
                    <td className="px-6 py-2 text-right text-gray-900">{fmt(m)}</td>
                    <td className="px-6 py-2 text-right text-gray-900">{fmt(a)}</td>
                  </tr>
                ))}
                <tr className="bg-primary-50 font-bold">
                  <td className="px-6 py-3 text-primary-800">Net Salary</td>
                  <td className="px-6 py-3 text-right text-primary-800">{fmt(result.net_salary_monthly)}</td>
                  <td className="px-6 py-3 text-right text-primary-800">{fmt(result.net_salary_annual)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Employer Cost</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Employer PF:</span>
                <span className="ml-2 font-medium">{fmt(result.employer_pf_monthly)}/mo</span>
              </div>
              <div>
                <span className="text-gray-600">Employer ESI:</span>
                <span className="ml-2 font-medium">{fmt(result.employer_esi_monthly)}/mo</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
