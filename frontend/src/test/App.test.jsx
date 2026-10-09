import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from '../App'

function renderApp() {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

describe('App', () => {
  it('renders the header with PaySlipMaker', () => {
    renderApp()
    expect(screen.getAllByText('Maker').length).toBeGreaterThanOrEqual(1)
  })

  it('renders navigation links', () => {
    renderApp()
    expect(screen.getAllByText('Generator').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('CTC Breakdown').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Batch').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Professional Tax').length).toBeGreaterThanOrEqual(1)
  })

  it('renders the home page by default', () => {
    renderApp()
    expect(screen.getByText('Free Salary Slip Generator')).toBeInTheDocument()
  })

  it('renders footer', () => {
    renderApp()
    expect(screen.getByText(/DoAide. All rights reserved/)).toBeInTheDocument()
  })
})
