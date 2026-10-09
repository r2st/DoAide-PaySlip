import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Generator from '../pages/Generator'

function renderGenerator() {
  return render(
    <BrowserRouter>
      <Generator />
    </BrowserRouter>
  )
}

describe('Generator', () => {
  it('renders the generator heading', () => {
    renderGenerator()
    expect(screen.getByText('Salary Slip Generator')).toBeInTheDocument()
  })

  it('renders company name field', () => {
    renderGenerator()
    expect(screen.getByText('Company Name')).toBeInTheDocument()
  })

  it('renders earnings section', () => {
    renderGenerator()
    expect(screen.getByText('Earnings (Monthly)')).toBeInTheDocument()
  })

  it('renders deductions section', () => {
    renderGenerator()
    expect(screen.getByText('Deductions (Monthly)')).toBeInTheDocument()
  })

  it('renders template selector', () => {
    renderGenerator()
    expect(screen.getByText('Standard')).toBeInTheDocument()
    expect(screen.getByText('Corporate')).toBeInTheDocument()
    expect(screen.getByText('Modern')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    renderGenerator()
    expect(screen.getByText('Generate Payslip PDF')).toBeInTheDocument()
  })
})
