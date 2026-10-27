import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, afterEach } from 'vitest'
import useSEO from '../utils/useSEO'
import routes, { BASE, OG_IMAGE } from '../utils/routeMeta'

function TestPage({ overrides }) {
  useSEO(overrides)
  return <div data-testid="page">SEO applied</div>
}

function renderAtPath(path, overrides) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="*" element={<TestPage overrides={overrides} />} />
      </Routes>
    </MemoryRouter>
  )
}

afterEach(() => {
  // Clean up dynamically added elements
  document.querySelectorAll('script[data-seo-hook]').forEach(s => s.remove())
  document.querySelectorAll('meta[property^="og:"]').forEach(m => {
    if (!m.getAttribute('data-original')) m.remove()
  })
  document.querySelectorAll('meta[name^="twitter:"]').forEach(m => m.remove())
})

describe('routeMeta', () => {
  it('has metadata for all main routes', () => {
    const expectedRoutes = ['/', '/generator', '/ctc-breakdown', '/batch', '/professional-tax', '/blog']
    expectedRoutes.forEach(route => {
      expect(routes[route]).toBeDefined()
      expect(routes[route].title).toBeTruthy()
      expect(routes[route].description).toBeTruthy()
    })
  })

  it('has unique titles for every route', () => {
    const titles = Object.values(routes).map(r => r.title)
    const unique = new Set(titles)
    expect(unique.size).toBe(titles.length)
  })

  it('has unique descriptions for every route', () => {
    const descriptions = Object.values(routes).map(r => r.description)
    const unique = new Set(descriptions)
    expect(unique.size).toBe(descriptions.length)
  })

  it('does not contain PaySlipMaker in any title', () => {
    Object.values(routes).forEach(r => {
      expect(r.title).not.toContain('PaySlipMaker')
    })
  })
})

describe('useSEO', () => {
  it('sets document title from routeMeta', () => {
    renderAtPath('/')
    expect(document.title).toBe(routes['/'].title)
  })

  it('sets meta description', () => {
    renderAtPath('/generator')
    const meta = document.querySelector('meta[name="description"]')
    expect(meta).toBeTruthy()
    expect(meta.getAttribute('content')).toBe(routes['/generator'].description)
  })

  it('sets canonical URL', () => {
    renderAtPath('/ctc-breakdown')
    const canonical = document.querySelector('link[rel="canonical"]')
    expect(canonical).toBeTruthy()
    expect(canonical.getAttribute('href')).toBe(`${BASE}/ctc-breakdown`)
  })

  it('sets og:title and og:image', () => {
    renderAtPath('/batch')
    const ogTitle = document.querySelector('meta[property="og:title"]')
    expect(ogTitle).toBeTruthy()
    expect(ogTitle.getAttribute('content')).toBe(routes['/batch'].title)

    const ogImage = document.querySelector('meta[property="og:image"]')
    expect(ogImage).toBeTruthy()
    expect(ogImage.getAttribute('content')).toBe(OG_IMAGE)
  })

  it('sets og:image dimensions', () => {
    renderAtPath('/')
    const width = document.querySelector('meta[property="og:image:width"]')
    const height = document.querySelector('meta[property="og:image:height"]')
    expect(width).toBeTruthy()
    expect(width.getAttribute('content')).toBe('1200')
    expect(height).toBeTruthy()
    expect(height.getAttribute('content')).toBe('630')
  })

  it('sets twitter card tags', () => {
    renderAtPath('/generator')
    const card = document.querySelector('meta[name="twitter:card"]')
    expect(card).toBeTruthy()
    expect(card.getAttribute('content')).toBe('summary_large_image')
  })

  it('injects JSON-LD for routes that have it', () => {
    renderAtPath('/')
    const scripts = document.querySelectorAll('script[data-seo-hook]')
    expect(scripts.length).toBe(1)
    const data = JSON.parse(scripts[0].textContent)
    expect(data['@type']).toBe('WebApplication')
  })

  it('accepts jsonLd overrides', () => {
    const customLd = [
      { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: 'Test' },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [] },
    ]
    renderAtPath('/blog/payslip-format-india', { jsonLd: customLd })
    const scripts = document.querySelectorAll('script[data-seo-hook]')
    expect(scripts.length).toBe(2)
  })
})
