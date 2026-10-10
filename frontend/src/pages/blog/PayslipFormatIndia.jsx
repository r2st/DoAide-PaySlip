import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Payslip Format in India: Complete Guide to Salary Slip Components (2025-26)",
    "description": "Understand the standard payslip format used in India. Learn about mandatory fields, earnings, deductions, and how to read your salary slip correctly.",
    "author": { "@type": "Organization", "name": "DoAide", "url": "https://doaide.com" },
    "publisher": { "@type": "Organization", "name": "DoAide", "url": "https://doaide.com" },
    "datePublished": "2025-04-15",
    "dateModified": "2026-10-10",
    "mainEntityOfPage": "https://payslip.doaide.com/blog/payslip-format-india",
    "url": "https://payslip.doaide.com/blog/payslip-format-india",
    "image": "https://payslip.doaide.com/og-payslip-format.png",
    "keywords": ["payslip format india", "salary slip format", "payslip components", "salary slip india"]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the standard payslip format in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The standard payslip format in India includes employee details (name, employee ID, designation, PAN, UAN), company information, pay period, earnings (Basic Salary, HRA, DA, Special Allowance, Conveyance), deductions (PF, ESI, Professional Tax, TDS), and net pay. It must comply with the Payment of Wages Act and state-specific rules."
        }
      },
      {
        "@type": "Question",
        "name": "Is it mandatory for employers to provide payslips in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, under the Payment of Wages Act 1936 and the Code on Wages 2019, employers are legally required to provide wage slips to employees before or on the wage payment date. The slip must detail all earnings and deductions."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between gross salary and net salary on a payslip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gross salary is the total of all earnings before deductions, including Basic Pay, HRA, DA, and allowances. Net salary (take-home pay) is what you receive after subtracting all deductions like PF, ESI, Professional Tax, and TDS from the gross salary."
        }
      },
      {
        "@type": "Question",
        "name": "How can I generate a payslip online for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can use PaySlipMaker at payslip.doaide.com to generate professional payslips for free. Enter company and employee details, select a template (Standard, Corporate, or Modern), and download the payslip as a PDF instantly — no login or payment required."
        }
      },
      {
        "@type": "Question",
        "name": "What components are mandatory on an Indian payslip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mandatory components include: Employee name and ID, employer name and address, pay period, Basic Salary, any applicable allowances (HRA, DA), EPF contribution (employee and employer), ESI (if applicable), Professional Tax, TDS/Income Tax deduction, gross earnings, total deductions, and net pay."
        }
      }
    ]
  }
]

export default function PayslipFormatIndia() {
  useEffect(() => {
    document.title = 'Payslip Format in India: Complete Guide to Salary Slip Components (2025-26) | PaySlipMaker'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Understand the standard payslip format used in India. Learn about mandatory fields, earnings, deductions, and how to read your salary slip correctly.')

    const scripts = STRUCTURED_DATA.map(data => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })
    return () => scripts.forEach(s => s.remove())
  }, [])

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-primary-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Payslip Format India</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Payslip Format in India: Complete Guide to Salary Slip Components (2025-26)
        </h1>
        <p className="text-lg text-gray-600">
          Everything you need to know about the standard payslip format in India — mandatory fields,
          earnings breakdowns, statutory deductions, and how to read your salary slip like a pro.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <span>Published: April 15, 2025</span>
          <span>Updated: October 10, 2026</span>
          <span>12 min read</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Is a Payslip?</h2>
        <p className="text-gray-700 mb-4">
          A payslip, also called a salary slip or wage slip, is a document issued by an employer to an employee
          detailing the components of their salary for a given pay period. In India, it serves as an official
          record of income and deductions, and is required for various financial transactions including bank
          loans, credit card applications, visa processing, and income tax filing.
        </p>
        <p className="text-gray-700 mb-4">
          Under the Payment of Wages Act, 1936, and the more recent Code on Wages, 2019, employers in India
          are legally obligated to provide wage slips to their employees. The payslip must be issued before or
          on the date wages are paid and must clearly itemize all components of compensation and deductions.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Standard Payslip Format in India</h2>
        <p className="text-gray-700 mb-4">
          While there is no single government-mandated template, the standard payslip format used by most
          Indian companies contains these sections:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Company Information</h3>
        <p className="text-gray-700 mb-4">
          The header of the payslip includes the company name, registered address, logo, and CIN
          (Corporate Identification Number). This establishes the issuing entity and is essential
          for the document to be legally valid. Many payslips also include the company PAN and TAN
          numbers, which are relevant for TDS purposes.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Employee Details</h3>
        <p className="text-gray-700 mb-4">
          This section captures the employee's full name, employee ID or code, designation, department,
          date of joining, PAN (Permanent Account Number), and UAN (Universal Account Number) for EPF.
          The bank account number and IFSC code may also appear here if the salary is paid via bank transfer.
          These details help in identifying the employee uniquely and are critical for statutory compliance.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Pay Period and Working Days</h3>
        <p className="text-gray-700 mb-4">
          The payslip must clearly state the month or period it covers (e.g., "October 2026"), along with
          total working days in the period, paid days, leaves taken, and loss of pay days (LOP). If the
          employee joined or left mid-month, the pro-rated calculation is reflected here. This transparency
          helps employees verify that their attendance has been recorded correctly.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Earnings (Income Components)</h3>
        <p className="text-gray-700 mb-4">
          Earnings form the left column of the payslip and include all components that add to the employee's
          gross salary:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li><strong>Basic Salary:</strong> The core component, typically 40-50% of CTC. It forms the base for PF, gratuity, and other calculations. A higher basic means higher PF contribution but also higher tax liability.</li>
          <li><strong>House Rent Allowance (HRA):</strong> Provided to employees for rental accommodation. Usually 40-50% of Basic (50% in metro cities, 40% in non-metros). Partially exempt from income tax under Section 10(13A) if the employee pays rent.</li>
          <li><strong>Dearness Allowance (DA):</strong> Common in government and PSU payslips, DA compensates for inflation. It is usually a percentage of Basic and is fully taxable.</li>
          <li><strong>Conveyance Allowance:</strong> Provided for daily commuting expenses. Earlier exempt up to Rs 1,600/month, now subsumed under the standard deduction of Rs 50,000.</li>
          <li><strong>Special Allowance:</strong> A catch-all component that bridges the gap between Basic+HRA+DA and the gross salary. It is fully taxable and does not attract PF.</li>
          <li><strong>Medical Allowance:</strong> Some companies provide a fixed medical allowance. Fully taxable unless supported by medical bills.</li>
          <li><strong>LTA (Leave Travel Allowance):</strong> Provided for domestic travel expenses during leave. Tax-exempt for actual travel costs within India, twice in a block of four years.</li>
          <li><strong>Performance Bonus / Incentives:</strong> Variable pay linked to individual or company performance. Shown separately when paid out.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Deductions</h3>
        <p className="text-gray-700 mb-4">
          Deductions appear on the right column and include both statutory and voluntary deductions:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li><strong>Employee Provident Fund (EPF):</strong> Mandatory contribution of 12% of Basic + DA towards the EPF account. Both the employee and employer contribute equally. The employer's share is shown separately and is part of the CTC.</li>
          <li><strong>Employee State Insurance (ESI):</strong> Applicable when gross salary is up to Rs 21,000/month. Employee contributes 0.75% and employer contributes 3.25% of gross salary. Covers medical and disability benefits.</li>
          <li><strong>Professional Tax (PT):</strong> A state-level tax deducted at source. Varies by state — for example, Maharashtra charges Rs 200/month (Rs 300 in February), while Karnataka charges Rs 200/month for salaries above Rs 15,000. Maximum PT across India is Rs 2,500/year.</li>
          <li><strong>Tax Deducted at Source (TDS):</strong> Income tax deducted by the employer based on the employee's declared tax regime (old or new), investment declarations (Form 12BB), and projected annual income. Computed monthly based on average tax liability across the financial year.</li>
          <li><strong>Voluntary Deductions:</strong> These may include NPS contributions, group health insurance premiums, salary advance recovery, or loan EMI deductions agreed upon by the employee.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Summary Section</h3>
        <p className="text-gray-700 mb-4">
          The bottom of the payslip summarizes the key figures: Total Earnings (Gross Salary), Total Deductions,
          and Net Pay (Take-Home Salary). Some payslips also display the employer's contribution to PF and ESI
          separately, as well as the total CTC cost to the company. The net pay amount should match the bank
          credit the employee receives.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Is Your Payslip Important?</h2>
        <p className="text-gray-700 mb-4">
          Your payslip serves multiple critical purposes beyond just confirming your monthly salary credit:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li><strong>Income Proof:</strong> Required for home loans, personal loans, credit cards, and rental agreements. Banks typically ask for the last 3-6 months of payslips.</li>
          <li><strong>Tax Filing:</strong> Payslip details feed into Form 16 and are essential for accurate ITR filing. The TDS amounts shown should reconcile with Form 26AS.</li>
          <li><strong>Visa Applications:</strong> Embassies and consulates require payslips as proof of stable employment and income. Typically, the last 3 months are needed.</li>
          <li><strong>Dispute Resolution:</strong> If there is any discrepancy in salary payment, the payslip serves as documented evidence of the agreed components and amounts.</li>
          <li><strong>PF and Gratuity Verification:</strong> Employees can verify that PF contributions are being deposited correctly by cross-referencing payslip amounts with the EPFO passbook.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Read Your Payslip Correctly</h2>
        <p className="text-gray-700 mb-4">
          Many employees simply check the net pay and ignore the rest. Here is a step-by-step approach to
          reading your payslip accurately:
        </p>
        <ol className="list-decimal pl-6 text-gray-700 mb-4 space-y-2">
          <li>Verify your personal details — name, employee ID, PAN, and UAN should be correct.</li>
          <li>Check the pay period and working days — ensure LOP days (if any) are accurate.</li>
          <li>Confirm Basic Salary matches your offer letter or latest revision letter.</li>
          <li>Verify HRA matches the agreed percentage of Basic.</li>
          <li>Check PF deduction — it should be 12% of (Basic + DA).</li>
          <li>If your gross is below Rs 21,000/month, verify ESI deduction at 0.75%.</li>
          <li>Check Professional Tax matches your state's slab.</li>
          <li>Verify TDS — compare with the tax computation sheet from HR if available.</li>
          <li>Confirm Net Pay = Total Earnings - Total Deductions, and this matches your bank credit.</li>
        </ol>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Generate Your Payslip for Free</h2>
        <p className="text-gray-700 mb-4">
          If you are a small business owner, freelancer, or HR professional looking to create professional
          payslips without expensive payroll software, <Link to="/generator" className="text-primary-600 hover:text-primary-800 font-medium">PaySlipMaker</Link> lets
          you generate salary slips instantly. Choose from Standard, Corporate, or Modern templates, enter
          company and employee details, and download a polished PDF — completely free, with no login required.
        </p>
        <p className="text-gray-700 mb-4">
          You can also use the <Link to="/ctc-breakdown" className="text-primary-600 hover:text-primary-800 font-medium">CTC Breakdown Calculator</Link> to
          auto-calculate salary components from a gross CTC figure, and <Link to="/batch" className="text-primary-600 hover:text-primary-800 font-medium">Batch Generation</Link> to
          create payslips for multiple months at once.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">What is the standard payslip format in India?</h3>
            <p className="text-gray-700">
              The standard payslip format includes employee details (name, employee ID, designation, PAN, UAN),
              company information, pay period, earnings (Basic Salary, HRA, DA, Special Allowance, Conveyance),
              deductions (PF, ESI, Professional Tax, TDS), and net pay. It must comply with the Payment of Wages
              Act and state-specific rules.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Is it mandatory for employers to provide payslips in India?</h3>
            <p className="text-gray-700">
              Yes, under the Payment of Wages Act 1936 and the Code on Wages 2019, employers are legally required
              to provide wage slips to employees before or on the wage payment date. The slip must detail all
              earnings and deductions.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">What is the difference between gross salary and net salary on a payslip?</h3>
            <p className="text-gray-700">
              Gross salary is the total of all earnings before deductions, including Basic Pay, HRA, DA, and allowances.
              Net salary (take-home pay) is what you receive after subtracting all deductions like PF, ESI, Professional
              Tax, and TDS from the gross salary.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">How can I generate a payslip online for free?</h3>
            <p className="text-gray-700">
              You can use <Link to="/generator" className="text-primary-600 hover:text-primary-800 font-medium">PaySlipMaker</Link> at payslip.doaide.com
              to generate professional payslips for free. Enter company and employee details, select a template, and
              download the payslip as a PDF instantly — no login or payment required.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">What components are mandatory on an Indian payslip?</h3>
            <p className="text-gray-700">
              Mandatory components include employee name and ID, employer name and address, pay period, Basic Salary,
              applicable allowances, EPF contribution, ESI (if applicable), Professional Tax, TDS deduction, gross
              earnings, total deductions, and net pay.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
