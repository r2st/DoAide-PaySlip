import { Link } from 'react-router-dom'
import useSEO from '../../utils/useSEO'

const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Salary Structure Breakdown in India: Understanding CTC, Gross, and Net Pay",
    "description": "Complete guide to Indian salary structure. Understand CTC vs gross vs net salary, Basic Pay, HRA, DA, PF, ESI, and how each component is calculated.",
    "author": { "@type": "Organization", "name": "DoAide", "url": "https://doaide.com" },
    "publisher": { "@type": "Organization", "name": "DoAide", "url": "https://doaide.com" },
    "datePublished": "2025-05-10",
    "dateModified": "2026-10-10",
    "mainEntityOfPage": "https://payslip.doaide.com/blog/salary-structure-breakdown",
    "url": "https://payslip.doaide.com/blog/salary-structure-breakdown",
    "image": "https://payslip.doaide.com/og-salary-structure.png",
    "keywords": ["salary structure india", "ctc breakdown", "gross salary vs net salary", "salary components india"]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is CTC and how is it different from take-home salary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CTC (Cost to Company) is the total amount a company spends on an employee annually, including salary, PF employer contribution, gratuity, insurance, and other benefits. Take-home salary (net pay) is the amount credited to your bank after all deductions. Typically, take-home is 60-75% of CTC depending on the salary structure and tax regime."
        }
      },
      {
        "@type": "Question",
        "name": "What percentage of CTC is Basic Salary in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic Salary in India is typically 40-50% of CTC. Some companies set it lower (35%) to reduce PF liability, while government and PSU organizations often set it higher. A higher Basic increases PF/gratuity contributions but also increases taxable income since Basic is fully taxable."
        }
      },
      {
        "@type": "Question",
        "name": "How is HRA calculated from Basic Salary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "HRA is typically calculated as 50% of Basic Salary for employees in metro cities (Delhi, Mumbai, Chennai, Kolkata) and 40% of Basic for non-metro cities. The tax exemption on HRA is the minimum of: actual HRA received, rent paid minus 10% of Basic, or 50%/40% of Basic for metro/non-metro."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between gross salary and CTC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gross salary is the sum of all direct salary components (Basic + HRA + DA + allowances + bonuses) before tax deductions. CTC includes gross salary plus employer-side costs like employer PF contribution (12% of Basic), gratuity (4.81% of Basic), group insurance premiums, and other benefits the employee doesn't receive as cash."
        }
      },
      {
        "@type": "Question",
        "name": "How can I calculate my take-home salary from CTC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate take-home from CTC: 1) Subtract employer PF (12% of Basic), gratuity (4.81% of Basic), and insurance premiums from CTC to get gross salary. 2) From gross, subtract employee PF (12% of Basic), Professional Tax (state-wise), and estimated monthly TDS. The result is your approximate take-home salary. Use DoAide's CTC Breakdown Calculator at payslip.doaide.com/ctc-breakdown for instant results."
        }
      }
    ]
  }
]

export default function SalaryStructureBreakdown() {
  useSEO({ jsonLd: STRUCTURED_DATA })

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-primary-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Salary Structure Breakdown</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Salary Structure Breakdown in India: Understanding CTC, Gross, and Net Pay
        </h1>
        <p className="text-lg text-gray-600">
          A comprehensive breakdown of how Indian salaries are structured — from CTC to take-home pay,
          covering every component that HR and payroll teams work with daily.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <span>Published: May 10, 2025</span>
          <span>Updated: October 10, 2026</span>
          <span>14 min read</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding the Indian Salary Structure</h2>
        <p className="text-gray-700 mb-4">
          If you have ever looked at your offer letter and wondered why your CTC is significantly higher than
          the amount that actually hits your bank account every month, you are not alone. The Indian salary
          structure is a layered system of earnings, employer contributions, and deductions that transforms a
          headline CTC number into a much smaller take-home figure. Understanding each layer is essential for
          salary negotiation, tax planning, and financial decision-making.
        </p>
        <p className="text-gray-700 mb-4">
          Indian companies structure compensation into three tiers: CTC (Cost to Company), Gross Salary, and
          Net Salary. Each tier peels away a different category of cost, and the relationship between them
          determines how much money actually reaches you every month.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">CTC (Cost to Company)</h2>
        <p className="text-gray-700 mb-4">
          CTC is the total annual expenditure a company incurs on an employee. It includes everything — your
          direct salary, employer-side statutory contributions, insurance premiums, and sometimes even perks
          like meal coupons or company-provided equipment. The CTC is the number mentioned in your offer letter
          and is used as the benchmark for compensation comparison.
        </p>
        <p className="text-gray-700 mb-4">
          A typical CTC breakdown for an Indian employee looks like this:
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-600">Basic Salary</span><span className="text-gray-900 font-medium">40-50% of CTC</span>
            <span className="text-gray-600">HRA</span><span className="text-gray-900 font-medium">40-50% of Basic</span>
            <span className="text-gray-600">Special Allowance</span><span className="text-gray-900 font-medium">Remaining balance</span>
            <span className="text-gray-600">Employer PF</span><span className="text-gray-900 font-medium">12% of Basic</span>
            <span className="text-gray-600">Gratuity</span><span className="text-gray-900 font-medium">4.81% of Basic</span>
            <span className="text-gray-600">Insurance</span><span className="text-gray-900 font-medium">Company-dependent</span>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          The employer PF contribution and gratuity are costs the company bears but the employee does not
          receive as monthly cash. Gratuity, for instance, is only paid out after 5 years of continuous service.
          This is why CTC is always higher than what you take home.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Gross Salary</h2>
        <p className="text-gray-700 mb-4">
          Gross Salary = CTC minus employer-side contributions (employer PF, employer ESI, gratuity provision,
          insurance premiums). It represents the total of all salary components that are directly attributable
          to the employee's monthly pay, before tax deductions.
        </p>
        <p className="text-gray-700 mb-4">
          Gross salary is the sum you see on the earnings side of your payslip. It includes Basic Salary, HRA,
          Dearness Allowance, Conveyance Allowance, Special Allowance, Medical Allowance, LTA, and any other
          fixed or variable pay components. For an employee with a CTC of Rs 12,00,000, the gross salary might
          be around Rs 10,20,000 after removing employer PF (Rs 1,15,200 at 12% of a Rs 4,80,000 Basic) and
          gratuity (Rs 23,100).
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Salary Components Explained</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Basic Salary</h3>
        <p className="text-gray-700 mb-4">
          Basic Salary is the foundation of the entire salary structure. It is the fixed component from which
          most other figures are derived. PF contributions (both employee and employer) are calculated as a
          percentage of Basic. HRA is set as a percentage of Basic. Gratuity is calculated from Basic. Even
          leave encashment uses Basic as the base.
        </p>
        <p className="text-gray-700 mb-4">
          Most private companies in India set Basic at 40% of CTC to balance between PF contributions and
          take-home pay. Under the new wage code (Code on Wages, 2019), when it is fully implemented, Basic
          must be at least 50% of gross salary. This change will increase PF contributions and gratuity
          payouts but may reduce take-home pay for many employees.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">House Rent Allowance (HRA)</h3>
        <p className="text-gray-700 mb-4">
          HRA is one of the most tax-efficient components of the Indian salary structure. Employees who live
          in rented accommodation can claim HRA exemption under Section 10(13A) of the Income Tax Act. The
          exempt amount is the minimum of three values: actual HRA received, rent paid minus 10% of Basic
          Salary, or 50% of Basic (metro) / 40% of Basic (non-metro).
        </p>
        <p className="text-gray-700 mb-4">
          For example, if an employee with a Basic of Rs 40,000/month receives HRA of Rs 20,000/month and
          pays rent of Rs 18,000/month in Bengaluru (non-metro for HRA purposes), the exempt amount is:
          minimum of Rs 20,000, Rs 14,000 (18,000 - 4,000), or Rs 16,000 (40% of 40,000) = Rs 14,000.
          The remaining Rs 6,000 is taxable.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Dearness Allowance (DA)</h3>
        <p className="text-gray-700 mb-4">
          DA is primarily seen in government, semi-government, and public sector undertaking (PSU) payslips.
          It is a cost-of-living adjustment linked to the Consumer Price Index (CPI) and is revised
          periodically — typically twice a year for central government employees. DA is fully taxable and
          is added to Basic for PF calculation purposes. Private sector employees rarely see DA as a separate
          component; the inflation adjustment is usually absorbed into the Special Allowance or annual increments.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Special Allowance</h3>
        <p className="text-gray-700 mb-4">
          Special Allowance is the balancing figure in the salary structure. After Basic, HRA, DA, and other
          named allowances are allocated, the remaining amount is clubbed under Special Allowance. It is fully
          taxable and typically does not attract PF contributions (unless the company opts for PF on total
          salary). Because it has no special tax treatment, companies sometimes try to minimize it in favor of
          tax-efficient components, but it remains a significant chunk of most private-sector pay structures.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Statutory Deductions</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Employee Provident Fund (EPF)</h3>
        <p className="text-gray-700 mb-4">
          EPF is a mandatory retirement savings scheme managed by the EPFO. Both the employee and employer
          contribute 12% of (Basic + DA) each month. For employees earning Basic + DA above Rs 15,000/month,
          the contribution is optional but most companies apply it regardless. Of the employer's 12%, 8.33%
          goes to the Employee Pension Scheme (EPS) and 3.67% to the EPF account. The employee's entire 12%
          goes to the EPF account. Interest is credited annually at a rate declared by the government (8.25%
          for FY 2024-25).
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Employee State Insurance (ESI)</h3>
        <p className="text-gray-700 mb-4">
          ESI applies to employees with gross salary up to Rs 21,000/month (Rs 25,000 for employees with
          disability). The employee contributes 0.75% and the employer contributes 3.25% of gross salary. ESI
          provides medical, sickness, maternity, and disability benefits. Once an employee's salary crosses the
          threshold, they exit the ESI scheme and the deduction stops. Many startup and IT employees never
          encounter ESI because their starting salaries exceed the threshold.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Professional Tax</h3>
        <p className="text-gray-700 mb-4">
          Professional Tax is levied by state governments and varies across states. It is capped at Rs 2,500
          per year. Not all states levy it — Gujarat, Rajasthan, and some others do not charge PT. States like
          Maharashtra, Karnataka, Andhra Pradesh, Telangana, and West Bengal have active PT regimes with
          monthly slab-based deductions. PT is deductible under Section 16 of the Income Tax Act when computing
          taxable income. Use our <Link to="/professional-tax" className="text-primary-600 hover:text-primary-800 font-medium">Professional Tax Calculator</Link> to
          check rates for your state.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">TDS (Tax Deducted at Source)</h3>
        <p className="text-gray-700 mb-4">
          TDS is the estimated income tax deducted monthly by the employer. At the beginning of the financial
          year, the employer computes the employee's estimated annual tax liability based on their salary,
          declared investments (Section 80C, 80D, HRA exemption, etc.), and chosen tax regime (old or new).
          This annual liability is divided by the remaining months to arrive at the monthly TDS. Employees
          submit investment proofs in January-February, and the TDS for the last few months is adjusted to
          reconcile actual vs projected investments.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Net Salary (Take-Home Pay)</h2>
        <p className="text-gray-700 mb-4">
          Net Salary = Gross Salary - Employee PF - Employee ESI - Professional Tax - TDS. This is the actual
          amount credited to your bank account every month. For a typical salaried employee in India, take-home
          pay ranges from 60% to 75% of CTC depending on the salary level, tax regime, and investment
          declarations.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Example: CTC to Take-Home Calculation</h2>
        <div className="bg-primary-50 rounded-lg p-6 mb-6">
          <p className="font-semibold text-gray-900 mb-4">CTC: Rs 10,00,000 per annum</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Basic (40% of CTC)</span><span>Rs 4,00,000</span></div>
            <div className="flex justify-between"><span>HRA (50% of Basic)</span><span>Rs 2,00,000</span></div>
            <div className="flex justify-between"><span>Special Allowance</span><span>Rs 2,12,800</span></div>
            <div className="flex justify-between border-t pt-2 font-medium"><span>Gross Salary</span><span>Rs 8,12,800</span></div>
            <div className="flex justify-between text-gray-500"><span>Employer PF (12% of Basic)</span><span>Rs 48,000</span></div>
            <div className="flex justify-between text-gray-500"><span>Gratuity (4.81% of Basic)</span><span>Rs 19,240</span></div>
            <div className="flex justify-between text-gray-500"><span>Insurance</span><span>Rs 10,000</span></div>
            <div className="mt-4 flex justify-between text-red-600"><span>Employee PF</span><span>- Rs 48,000</span></div>
            <div className="flex justify-between text-red-600"><span>Professional Tax</span><span>- Rs 2,400</span></div>
            <div className="flex justify-between text-red-600"><span>TDS (estimated, new regime)</span><span>- Rs 36,400</span></div>
            <div className="flex justify-between border-t pt-2 font-bold text-gray-900"><span>Annual Take-Home</span><span>Rs 7,26,000</span></div>
            <div className="flex justify-between font-bold text-primary-700"><span>Monthly Take-Home</span><span>Rs 60,500</span></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Calculate Your Salary Breakdown Instantly</h2>
        <p className="text-gray-700 mb-4">
          Instead of doing these calculations manually, use our free <Link to="/ctc-breakdown" className="text-primary-600 hover:text-primary-800 font-medium">CTC Breakdown Calculator</Link>.
          Enter your annual CTC, and the tool automatically calculates Basic, HRA, DA, Special Allowance, PF,
          ESI, Professional Tax, and estimated take-home pay using standard Indian payroll ratios. You can then
          generate a professional payslip from the calculated components using the <Link to="/generator" className="text-primary-600 hover:text-primary-800 font-medium">Salary Slip Generator</Link>.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">What is CTC and how is it different from take-home salary?</h3>
            <p className="text-gray-700">
              CTC (Cost to Company) is the total amount a company spends on an employee annually, including salary,
              PF employer contribution, gratuity, insurance, and other benefits. Take-home salary is the amount
              credited to your bank after all deductions. Typically, take-home is 60-75% of CTC depending on the
              salary structure and tax regime.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">What percentage of CTC is Basic Salary in India?</h3>
            <p className="text-gray-700">
              Basic Salary is typically 40-50% of CTC. Some companies set it lower (35%) to reduce PF liability,
              while government and PSU organizations often set it higher. A higher Basic increases PF and gratuity
              contributions but also increases taxable income.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">How is HRA calculated from Basic Salary?</h3>
            <p className="text-gray-700">
              HRA is typically 50% of Basic Salary for metro cities (Delhi, Mumbai, Chennai, Kolkata) and 40% for
              non-metro cities. The tax exemption is the minimum of: actual HRA received, rent paid minus 10% of Basic,
              or 50%/40% of Basic for metro/non-metro.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">What is the difference between gross salary and CTC?</h3>
            <p className="text-gray-700">
              Gross salary is the sum of all direct salary components before tax deductions. CTC includes gross salary
              plus employer-side costs like employer PF (12% of Basic), gratuity (4.81% of Basic), group insurance, and
              other benefits the employee doesn't receive as cash.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">How can I calculate my take-home salary from CTC?</h3>
            <p className="text-gray-700">
              Subtract employer PF, gratuity, and insurance from CTC to get gross salary. From gross, subtract employee PF,
              Professional Tax, and estimated monthly TDS. The result is your approximate take-home. Use
              our <Link to="/ctc-breakdown" className="text-primary-600 hover:text-primary-800 font-medium">CTC Breakdown Calculator</Link> for
              instant results.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
