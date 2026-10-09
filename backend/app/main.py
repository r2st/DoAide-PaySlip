import io
import zipfile
import calendar
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from .models import PayslipInput, BatchPayslipInput, CTCInput
from .pdf_generator import generate_payslip
from .ctc_calculator import calculate_ctc_breakdown

app = FastAPI(
    title="PaySlipMaker API",
    description="Free Salary Slip Generator for Indian Employees",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_simple():
    return {"status": "ok", "service": "payslipmaker-api"}


@app.get("/api/v1/health")
async def health():
    return {"status": "healthy", "service": "payslipmaker-api"}


@app.post("/api/generate-payslip")
async def generate_payslip_endpoint(inp: PayslipInput):
    pdf_bytes = generate_payslip(inp)
    month_name = calendar.month_abbr[inp.month]
    filename = f"payslip_{inp.employee_name.replace(' ', '_')}_{month_name}_{inp.year}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@app.post("/api/generate-batch")
async def generate_batch_endpoint(inp: BatchPayslipInput):
    zip_buf = io.BytesIO()
    with zipfile.ZipFile(zip_buf, "w", zipfile.ZIP_DEFLATED) as zf:
        for period in inp.months:
            month = period["month"]
            year = period["year"]
            single = PayslipInput(
                company_name=inp.company_name,
                company_address=inp.company_address,
                employee_name=inp.employee_name,
                employee_id=inp.employee_id,
                designation=inp.designation,
                department=inp.department,
                pan=inp.pan,
                bank_account=inp.bank_account,
                month=month,
                year=year,
                earnings=inp.earnings,
                deductions=inp.deductions,
                template=inp.template,
            )
            pdf_bytes = generate_payslip(single)
            month_name = calendar.month_abbr[month]
            filename = f"payslip_{inp.employee_name.replace(' ', '_')}_{month_name}_{year}.pdf"
            zf.writestr(filename, pdf_bytes)

    return Response(
        content=zip_buf.getvalue(),
        media_type="application/zip",
        headers={"Content-Disposition": f'attachment; filename="payslips_{inp.employee_name.replace(" ", "_")}.zip"'},
    )


@app.post("/api/ctc-breakdown")
async def ctc_breakdown_endpoint(inp: CTCInput):
    return calculate_ctc_breakdown(inp)


@app.get("/api/templates")
async def list_templates():
    return {
        "templates": [
            {
                "id": "standard",
                "name": "Standard",
                "description": "Clean and professional payslip with blue accents",
            },
            {
                "id": "corporate",
                "name": "Corporate",
                "description": "Formal corporate design with dark header and gold accents",
            },
            {
                "id": "modern",
                "name": "Modern",
                "description": "Contemporary design with indigo gradient and modern typography",
            },
        ]
    }


@app.get("/api/professional-tax/{state}")
async def get_professional_tax(state: str):
    pt_rates = {
        "maharashtra": {"monthly": 200, "annual": 2400, "note": "₹200/month for salary > ₹10,000. Feb: ₹300"},
        "karnataka": {"monthly": 200, "annual": 2400, "note": "₹200/month for salary > ₹15,000"},
        "west_bengal": {"monthly": 200, "annual": 2400, "note": "₹200/month for salary > ₹10,000"},
        "tamil_nadu": {"monthly": 208, "annual": 2496, "note": "Half-yearly basis. Max ₹2,500/year"},
        "andhra_pradesh": {"monthly": 200, "annual": 2400, "note": "₹200/month for salary > ₹20,000"},
        "telangana": {"monthly": 200, "annual": 2400, "note": "₹200/month for salary > ₹15,000"},
        "gujarat": {"monthly": 200, "annual": 2400, "note": "₹200/month for salary > ₹12,000"},
        "madhya_pradesh": {"monthly": 208, "annual": 2496, "note": "Based on monthly salary slabs"},
        "kerala": {"monthly": 208, "annual": 2496, "note": "Half-yearly payment. Max ₹2,500/year"},
        "odisha": {"monthly": 200, "annual": 2400, "note": "₹200/month for salary > ₹13,000"},
        "assam": {"monthly": 208, "annual": 2496, "note": "Based on salary slabs, max ₹2,500/year"},
        "bihar": {"monthly": 208, "annual": 2496, "note": "Based on salary slabs"},
        "jharkhand": {"monthly": 208, "annual": 2496, "note": "Based on salary slabs"},
        "meghalaya": {"monthly": 208, "annual": 2496, "note": "Based on salary slabs"},
        "tripura": {"monthly": 208, "annual": 2496, "note": "Based on salary slabs"},
        "manipur": {"monthly": 208, "annual": 2496, "note": "Based on salary slabs"},
        "mizoram": {"monthly": 208, "annual": 2496, "note": "Based on salary slabs"},
        "sikkim": {"monthly": 175, "annual": 2100, "note": "Based on salary slabs"},
        "nagaland": {"monthly": 200, "annual": 2400, "note": "Based on salary slabs"},
    }

    state_key = state.lower().replace(" ", "_").replace("-", "_")
    if state_key in pt_rates:
        return {"state": state, **pt_rates[state_key]}
    return {"state": state, "monthly": 0, "annual": 0,
            "note": "Professional tax not applicable or not levied in this state/UT"}
