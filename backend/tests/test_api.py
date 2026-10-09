import pytest
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def _sample_payslip_data(template="standard"):
    return {
        "company_name": "Test Corp",
        "company_address": "Mumbai, India",
        "employee_name": "Raj Kumar",
        "employee_id": "EMP001",
        "designation": "Software Engineer",
        "department": "Engineering",
        "pan": "ABCDE1234F",
        "bank_account": "1234567890",
        "month": 3,
        "year": 2025,
        "earnings": {
            "basic_salary": 40000,
            "hra": 20000,
            "dearness_allowance": 5000,
            "conveyance_allowance": 1600,
            "medical_allowance": 1250,
            "special_allowance": 10000,
            "other_allowance": 0,
        },
        "deductions": {
            "provident_fund": 4800,
            "esi": 0,
            "professional_tax": 200,
            "tds": 5000,
            "other_deductions": 0,
        },
        "template": template,
    }


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_health_v1():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_generate_standard_payslip():
    response = client.post("/api/generate-payslip", json=_sample_payslip_data("standard"))
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
    assert len(response.content) > 100


def test_generate_corporate_payslip():
    response = client.post("/api/generate-payslip", json=_sample_payslip_data("corporate"))
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"


def test_generate_modern_payslip():
    response = client.post("/api/generate-payslip", json=_sample_payslip_data("modern"))
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"


def test_batch_generation():
    data = {
        "company_name": "Test Corp",
        "employee_name": "Raj Kumar",
        "designation": "Engineer",
        "months": [{"month": 1, "year": 2025}, {"month": 2, "year": 2025}],
        "earnings": {"basic_salary": 40000, "hra": 20000},
        "deductions": {"provident_fund": 4800},
        "template": "standard",
    }
    response = client.post("/api/generate-batch", json=data)
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/zip"


def test_ctc_breakdown():
    response = client.post("/api/ctc-breakdown", json={"annual_ctc": 1200000})
    assert response.status_code == 200
    data = response.json()
    assert data["annual_ctc"] == 1200000
    assert data["basic_salary_monthly"] == 40000


def test_list_templates():
    response = client.get("/api/templates")
    assert response.status_code == 200
    data = response.json()
    assert len(data["templates"]) == 3


def test_professional_tax_maharashtra():
    response = client.get("/api/professional-tax/maharashtra")
    assert response.status_code == 200
    data = response.json()
    assert data["monthly"] == 200


def test_professional_tax_unknown_state():
    response = client.get("/api/professional-tax/unknown")
    assert response.status_code == 200
    data = response.json()
    assert data["monthly"] == 0


def test_invalid_payslip_no_company():
    data = _sample_payslip_data()
    data["company_name"] = ""
    response = client.post("/api/generate-payslip", json=data)
    assert response.status_code == 422


def test_invalid_payslip_negative_salary():
    data = _sample_payslip_data()
    data["earnings"]["basic_salary"] = -100
    response = client.post("/api/generate-payslip", json=data)
    assert response.status_code == 422
