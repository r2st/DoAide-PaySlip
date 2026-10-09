# DoAide-PaySlip (PaySlipMaker)

Free Salary Slip / Payslip Generator for Indian Employees & Small Businesses.

## Architecture
- Frontend: React + Vite + Tailwind (port 3082)
- Backend: FastAPI + ReportLab (port 3081)
- Subdomain: payslip.doaide.com

## Conventions
- DO NOT run ruff format
- DO NOT run prettier --write
- DO NOT start dev servers
- Tests: frontend uses vitest, backend uses pytest
- API keys ONLY in backend (.env)

## Free Tools (no auth required)
- Salary Slip Generator (/generator)
- CTC Breakdown Calculator (/ctc-breakdown)
- Batch Generation (/batch)
- Templates: Standard, Corporate, Modern
