/**
 * Centralized SEO metadata for every public route.
 * Used by useSEO hook and by the prerender script.
 */

const BASE = 'https://payslip.doaide.com'
const SITE_NAME = 'DoAide PaySlip'
const OG_IMAGE = `${BASE}/og-payslip.png`
const OG_IMAGE_WIDTH = '1200'
const OG_IMAGE_HEIGHT = '630'

const routes = {
  '/': {
    title: `Free Salary Slip Generator for Indian Employees | ${SITE_NAME}`,
    description:
      'Generate professional salary slips for Indian employees and small businesses. Free payslip generator with multiple templates, CTC breakdown calculator, and batch generation. No login required.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'DoAide PaySlip',
      url: BASE,
      description:
        'Free online salary slip generator for Indian employees and small businesses',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },

  '/generator': {
    title: `Salary Slip Generator — Create & Download PDF Payslip Free | ${SITE_NAME}`,
    description:
      'Create professional salary slips with company details, earnings, and deductions. Choose from Standard, Corporate, or Modern templates. Download as PDF instantly — free, no login.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Salary Slip Generator',
      url: `${BASE}/generator`,
      description: 'Generate professional salary slips with multiple templates and download as PDF',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },

  '/ctc-breakdown': {
    title: `CTC Breakdown Calculator — Auto-Calculate Salary Components | ${SITE_NAME}`,
    description:
      'Auto-calculate salary components from your CTC using standard Indian ratios. Get Basic, HRA, DA, PF, ESI, Professional Tax, and take-home pay breakdown instantly.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'CTC Breakdown Calculator',
      url: `${BASE}/ctc-breakdown`,
      description: 'Auto-calculate salary components from CTC using standard Indian ratios',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },

  '/batch': {
    title: `Batch Payslip Generation — Generate Multiple Month Payslips | ${SITE_NAME}`,
    description:
      'Generate payslips for multiple months at once. Download all salary slips as a ZIP file with individual PDFs. Perfect for startups and small businesses.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Batch Payslip Generator',
      url: `${BASE}/batch`,
      description: 'Generate payslips for multiple months and download as a ZIP file',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },

  '/professional-tax': {
    title: `Professional Tax Rates by Indian State (FY 2025-26) | ${SITE_NAME}`,
    description:
      'Check professional tax rates applicable in every Indian state and UT. Updated slabs for FY 2025-26 — Maharashtra, Karnataka, Tamil Nadu, Telangana, and more.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Professional Tax Rates by Indian State',
      url: `${BASE}/professional-tax`,
      description: 'Professional tax rates for all Indian states — updated FY 2025-26',
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },

  '/blog': {
    title: `Payroll & Salary Guides for Indian Employees | ${SITE_NAME} Blog`,
    description:
      'Guides on payslip formats, salary structure, CTC breakdown, Form 16, professional tax, and payroll compliance for Indian employees and HR professionals.',
  },

  '/blog/payslip-format-india': {
    title: `Payslip Format in India: Complete Guide to Salary Slip Components (2025-26) | ${SITE_NAME}`,
    description:
      'Understand the standard payslip format used in India. Learn about mandatory fields, earnings, deductions, and how to read your salary slip correctly.',
  },

  '/blog/salary-structure-breakdown': {
    title: `Salary Structure Breakdown in India: CTC, Gross & Net Pay Guide | ${SITE_NAME}`,
    description:
      'Complete guide to Indian salary structure — understand CTC, gross salary, net pay, Basic, HRA, DA, PF, and all deductions with examples.',
  },

  '/blog/form-16-guide': {
    title: `Form 16 Guide for Salaried Employees in India | ${SITE_NAME}`,
    description:
      'Everything you need to know about Form 16 — what it is, how to read it, parts A and B, and how to use it for filing your income tax return.',
  },
}

export { routes, BASE, SITE_NAME, OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT }
export default routes
