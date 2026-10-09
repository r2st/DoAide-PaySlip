const API_BASE = '/api'

export async function generatePayslip(data) {
  const response = await fetch(`${API_BASE}/generate-payslip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to generate payslip' }))
    throw new Error(error.detail || 'Failed to generate payslip')
  }
  return response.blob()
}

export async function generateBatch(data) {
  const response = await fetch(`${API_BASE}/generate-batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to generate batch' }))
    throw new Error(error.detail || 'Failed to generate batch')
  }
  return response.blob()
}

export async function calculateCTCBreakdown(data) {
  const response = await fetch(`${API_BASE}/ctc-breakdown`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to calculate CTC' }))
    throw new Error(error.detail || 'Failed to calculate CTC')
  }
  return response.json()
}

export async function getProfessionalTax(state) {
  const response = await fetch(`${API_BASE}/professional-tax/${encodeURIComponent(state)}`)
  if (!response.ok) throw new Error('Failed to fetch professional tax info')
  return response.json()
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
