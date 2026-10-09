import { useState } from 'react'
import FormField from '../components/FormField'
import TemplateSelector from '../components/TemplateSelector'
import { generatePayslip, downloadBlob } from '../utils/api'
import { MONTHS } from '../utils/indianStates'

const currentDate = new Date()
const CURRENT_MONTH = currentDate.getMonth() + 1
const CURRENT_YEAR = currentDate.getFullYear()

const INITIAL_STATE = {
  company_name: '',
  company_address: '',
  employee_name: '',
  employee_id: '',
  designation: '',
  department: '',
  pan: '',
  bank_account: '',
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
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
}

export default function Generator() {
  const [form, setForm] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function updateEarnings(field, value) {
    setForm(prev => ({
      ...prev,
      earnings: { ...prev.earnings, [field]: value },
    }))
  }

  function updateDeductions(field, value) {
    setForm(prev => ({
      ...prev,
      deductions: { ...prev.deductions, [field]: value },
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = {
        ...form,
        month: Number(form.month),
        year: Number(form.year),
        earnings: Object.fromEntries(
          Object.entries(form.earnings).map(([k, v]) => [k, Number(v) || 0])
        ),
        deductions: Object.fromEntries(
          Object.entries(form.deductions).map(([k, v]) => [k, Number(v) || 0])
        ),
      }
      const blob = await generatePayslip(payload)
      const monthName = MONTHS[payload.month - 1]
      downloadBlob(blob, `payslip_${form.employee_name.replace(/\s+/g, '_')}_${monthName}_${form.year}.pdf`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalEarnings = Object.values(form.earnings).reduce((sum, v) => sum + (Number(v) || 0), 0)
  const totalDeductions = Object.values(form.deductions).reduce((sum, v) => sum + (Number(v) || 0), 0)
  const netPay = totalEarnings - totalDeductions

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Salary Slip Generator</h1>
        <p className="text-gray-600 mt-2">Fill in the details below to generate a professional payslip PDF.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Company Name" value={form.company_name} onChange={e => updateField('company_name', e.target.value)} required placeholder="Acme Corp Pvt Ltd" />
            <FormField label="Company Address" value={form.company_address} onChange={e => updateField('company_address', e.target.value)} placeholder="Mumbai, Maharashtra" />
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Employee Name" value={form.employee_name} onChange={e => updateField('employee_name', e.target.value)} required placeholder="Raj Kumar" />
            <FormField label="Employee ID" value={form.employee_id} onChange={e => updateField('employee_id', e.target.value)} placeholder="EMP001" />
            <FormField label="Designation" value={form.designation} onChange={e => updateField('designation', e.target.value)} required placeholder="Software Engineer" />
            <FormField label="Department" value={form.department} onChange={e => updateField('department', e.target.value)} placeholder="Engineering" />
            <FormField label="PAN" value={form.pan} onChange={e => updateField('pan', e.target.value)} placeholder="ABCDE1234F" />
            <FormField label="Bank Account" value={form.bank_account} onChange={e => updateField('bank_account', e.target.value)} placeholder="1234567890" />
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pay Period</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Month <span className="text-red-500">*</span></label>
              <select
                value={form.month}
                onChange={e => updateField('month', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                {MONTHS.map((m, i) => (
                  <option key={i + 1} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>
            <FormField label="Year" type="number" value={form.year} onChange={e => updateField('year', e.target.value)} required min={2000} max={2100} />
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings (Monthly)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Basic Salary" type="number" value={form.earnings.basic_salary} onChange={e => updateEarnings('basic_salary', e.target.value)} required min={0} step="1" placeholder="40000" />
            <FormField label="HRA" type="number" value={form.earnings.hra} onChange={e => updateEarnings('hra', e.target.value)} min={0} placeholder="20000" />
            <FormField label="Dearness Allowance" type="number" value={form.earnings.dearness_allowance} onChange={e => updateEarnings('dearness_allowance', e.target.value)} min={0} placeholder="5000" />
            <FormField label="Conveyance Allowance" type="number" value={form.earnings.conveyance_allowance} onChange={e => updateEarnings('conveyance_allowance', e.target.value)} min={0} placeholder="1600" />
            <FormField label="Medical Allowance" type="number" value={form.earnings.medical_allowance} onChange={e => updateEarnings('medical_allowance', e.target.value)} min={0} placeholder="1250" />
            <FormField label="Special Allowance" type="number" value={form.earnings.special_allowance} onChange={e => updateEarnings('special_allowance', e.target.value)} min={0} placeholder="10000" />
            <FormField label="Other Allowance" type="number" value={form.earnings.other_allowance} onChange={e => updateEarnings('other_allowance', e.target.value)} min={0} placeholder="0" />
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Deductions (Monthly)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Provident Fund (PF)" type="number" value={form.deductions.provident_fund} onChange={e => updateDeductions('provident_fund', e.target.value)} min={0} placeholder="4800" />
            <FormField label="ESI" type="number" value={form.deductions.esi} onChange={e => updateDeductions('esi', e.target.value)} min={0} placeholder="0" />
            <FormField label="Professional Tax" type="number" value={form.deductions.professional_tax} onChange={e => updateDeductions('professional_tax', e.target.value)} min={0} placeholder="200" />
            <FormField label="TDS" type="number" value={form.deductions.tds} onChange={e => updateDeductions('tds', e.target.value)} min={0} placeholder="5000" />
            <FormField label="Other Deductions" type="number" value={form.deductions.other_deductions} onChange={e => updateDeductions('other_deductions', e.target.value)} min={0} placeholder="0" />
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Template</h2>
          <TemplateSelector selected={form.template} onSelect={t => updateField('template', t)} />
        </section>

        <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <div className="text-sm text-gray-600">Total Earnings</div>
              <div className="text-xl font-bold text-green-600">
                {totalEarnings.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Deductions</div>
              <div className="text-xl font-bold text-red-600">
                {totalDeductions.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Net Pay</div>
              <div className="text-xl font-bold text-primary-700">
                {netPay.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {loading ? 'Generating...' : 'Generate Payslip PDF'}
        </button>
      </form>
    </div>
  )
}
