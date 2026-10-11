import { useState } from 'react'
import FormField from '../components/FormField'
import TemplateSelector from '../components/TemplateSelector'
import { generateBatch, downloadBlob } from '../utils/api'
import { MONTHS } from '../utils/indianStates'

const currentDate = new Date()
const CURRENT_YEAR = currentDate.getFullYear()

export default function Batch() {
  const [form, setForm] = useState({
    company_name: '',
    company_address: '',
    employee_name: '',
    employee_id: '',
    designation: '',
    department: '',
    pan: '',
    bank_account: '',
    earnings: {
      basic_salary: '',
      hra: '',
      dearness_allowance: '',
      conveyance_allowance: '',
      medical_allowance: '',
      special_allowance: '',
      other_allowance: '',
    },
    deductions: {
      provident_fund: '',
      esi: '',
      professional_tax: '',
      tds: '',
      other_deductions: '',
    },
    template: 'standard',
  })
  const [selectedMonths, setSelectedMonths] = useState([])
  const [year, setYear] = useState(CURRENT_YEAR)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function updateEarnings(field, value) {
    setForm(prev => ({ ...prev, earnings: { ...prev.earnings, [field]: value } }))
  }

  function updateDeductions(field, value) {
    setForm(prev => ({ ...prev, deductions: { ...prev.deductions, [field]: value } }))
  }

  function toggleMonth(month) {
    setSelectedMonths(prev =>
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month].sort((a, b) => a - b)
    )
  }

  function selectAllMonths() {
    setSelectedMonths([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  }

  function selectFinancialYear() {
    setSelectedMonths([4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (selectedMonths.length === 0) {
      setError('Please select at least one month')
      return
    }
    setError('')
    setLoading(true)
    try {
      const payload = {
        ...form,
        months: selectedMonths.map(m => ({ month: m, year: Number(year) })),
        earnings: Object.fromEntries(
          Object.entries(form.earnings).map(([k, v]) => [k, Number(v) || 0])
        ),
        deductions: Object.fromEntries(
          Object.entries(form.deductions).map(([k, v]) => [k, Number(v) || 0])
        ),
      }
      const blob = await generateBatch(payload)
      downloadBlob(blob, `payslips_${form.employee_name.replace(/\s+/g, '_')}_${year}.zip`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Batch Payslip Generation</h1>
        <p className="text-gray-600 dark:text-slate-400 mt-2">Generate payslips for multiple months at once. Downloads as a ZIP file.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company & Employee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Company Name" value={form.company_name} onChange={e => updateField('company_name', e.target.value)} required placeholder="Acme Corp Pvt Ltd" />
            <FormField label="Company Address" value={form.company_address} onChange={e => updateField('company_address', e.target.value)} placeholder="Mumbai, India" />
            <FormField label="Employee Name" value={form.employee_name} onChange={e => updateField('employee_name', e.target.value)} required placeholder="Raj Kumar" />
            <FormField label="Employee ID" value={form.employee_id} onChange={e => updateField('employee_id', e.target.value)} placeholder="EMP001" />
            <FormField label="Designation" value={form.designation} onChange={e => updateField('designation', e.target.value)} required placeholder="Software Engineer" />
            <FormField label="Department" value={form.department} onChange={e => updateField('department', e.target.value)} placeholder="Engineering" />
            <FormField label="PAN" value={form.pan} onChange={e => updateField('pan', e.target.value)} placeholder="ABCDE1234F" />
            <FormField label="Bank Account" value={form.bank_account} onChange={e => updateField('bank_account', e.target.value)} placeholder="1234567890" />
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Months</h2>
          <div className="flex gap-2 mb-4">
            <FormField label="Year" type="number" value={year} onChange={e => setYear(e.target.value)} min={2000} max={2100} />
          </div>
          <div className="flex gap-2 mb-4">
            <button type="button" onClick={selectAllMonths} className="px-3 py-1 text-xs bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 border border-primary-200">
              All Months
            </button>
            <button type="button" onClick={selectFinancialYear} className="px-3 py-1 text-xs bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 border border-primary-200">
              Financial Year (Apr–Mar)
            </button>
            <button type="button" onClick={() => setSelectedMonths([])} className="px-3 py-1 text-xs bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 border border-gray-200">
              Clear
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {MONTHS.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleMonth(i + 1)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMonths.includes(i + 1)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {m.slice(0, 3)}
              </button>
            ))}
          </div>
          {selectedMonths.length > 0 && (
            <p className="text-sm text-gray-500 mt-3">
              {selectedMonths.length} month{selectedMonths.length > 1 ? 's' : ''} selected
            </p>
          )}
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Earnings (Monthly)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Basic Salary" type="number" value={form.earnings.basic_salary} onChange={e => updateEarnings('basic_salary', e.target.value)} required min={0} placeholder="40000" />
            <FormField label="HRA" type="number" value={form.earnings.hra} onChange={e => updateEarnings('hra', e.target.value)} min={0} placeholder="20000" />
            <FormField label="DA" type="number" value={form.earnings.dearness_allowance} onChange={e => updateEarnings('dearness_allowance', e.target.value)} min={0} placeholder="5000" />
            <FormField label="Conveyance" type="number" value={form.earnings.conveyance_allowance} onChange={e => updateEarnings('conveyance_allowance', e.target.value)} min={0} placeholder="1600" />
            <FormField label="Medical" type="number" value={form.earnings.medical_allowance} onChange={e => updateEarnings('medical_allowance', e.target.value)} min={0} placeholder="1250" />
            <FormField label="Special Allowance" type="number" value={form.earnings.special_allowance} onChange={e => updateEarnings('special_allowance', e.target.value)} min={0} placeholder="10000" />
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Deductions (Monthly)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="PF" type="number" value={form.deductions.provident_fund} onChange={e => updateDeductions('provident_fund', e.target.value)} min={0} placeholder="4800" />
            <FormField label="ESI" type="number" value={form.deductions.esi} onChange={e => updateDeductions('esi', e.target.value)} min={0} placeholder="0" />
            <FormField label="Professional Tax" type="number" value={form.deductions.professional_tax} onChange={e => updateDeductions('professional_tax', e.target.value)} min={0} placeholder="200" />
            <FormField label="TDS" type="number" value={form.deductions.tds} onChange={e => updateDeductions('tds', e.target.value)} min={0} placeholder="5000" />
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Template</h2>
          <TemplateSelector selected={form.template} onSelect={t => updateField('template', t)} />
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || selectedMonths.length === 0}
          className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {loading ? 'Generating...' : `Generate ${selectedMonths.length} Payslip${selectedMonths.length !== 1 ? 's' : ''}`}
        </button>
      </form>
    </div>
  )
}
