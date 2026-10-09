from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class TemplateType(str, Enum):
    STANDARD = "standard"
    CORPORATE = "corporate"
    MODERN = "modern"


class EarningsInput(BaseModel):
    basic_salary: float = Field(gt=0, description="Basic salary per month")
    hra: float = Field(default=0, ge=0, description="House Rent Allowance")
    dearness_allowance: float = Field(default=0, ge=0, description="Dearness Allowance")
    conveyance_allowance: float = Field(default=0, ge=0, description="Conveyance Allowance")
    medical_allowance: float = Field(default=0, ge=0, description="Medical Allowance")
    special_allowance: float = Field(default=0, ge=0, description="Special Allowance")
    other_allowance: float = Field(default=0, ge=0, description="Other Allowances")


class DeductionsInput(BaseModel):
    provident_fund: float = Field(default=0, ge=0, description="Provident Fund (PF)")
    esi: float = Field(default=0, ge=0, description="Employee State Insurance")
    professional_tax: float = Field(default=0, ge=0, description="Professional Tax")
    tds: float = Field(default=0, ge=0, description="Tax Deducted at Source")
    other_deductions: float = Field(default=0, ge=0, description="Other Deductions")


class PayslipInput(BaseModel):
    company_name: str = Field(min_length=1, max_length=200)
    company_address: Optional[str] = Field(default="", max_length=500)
    employee_name: str = Field(min_length=1, max_length=200)
    employee_id: Optional[str] = Field(default="", max_length=50)
    designation: str = Field(min_length=1, max_length=200)
    department: Optional[str] = Field(default="", max_length=200)
    pan: Optional[str] = Field(default="", max_length=10)
    bank_account: Optional[str] = Field(default="", max_length=30)
    month: int = Field(ge=1, le=12)
    year: int = Field(ge=2000, le=2100)
    earnings: EarningsInput
    deductions: DeductionsInput
    template: TemplateType = TemplateType.STANDARD


class BatchPayslipInput(BaseModel):
    company_name: str = Field(min_length=1, max_length=200)
    company_address: Optional[str] = Field(default="", max_length=500)
    employee_name: str = Field(min_length=1, max_length=200)
    employee_id: Optional[str] = Field(default="", max_length=50)
    designation: str = Field(min_length=1, max_length=200)
    department: Optional[str] = Field(default="", max_length=200)
    pan: Optional[str] = Field(default="", max_length=10)
    bank_account: Optional[str] = Field(default="", max_length=30)
    months: list[dict] = Field(description="List of {month, year} dicts")
    earnings: EarningsInput
    deductions: DeductionsInput
    template: TemplateType = TemplateType.STANDARD


class CTCInput(BaseModel):
    annual_ctc: float = Field(gt=0, description="Annual CTC in INR")
    include_esi: bool = Field(default=False, description="Include ESI (for CTC <= 21000/month)")


class CTCBreakdown(BaseModel):
    annual_ctc: float
    basic_salary_annual: float
    basic_salary_monthly: float
    hra_annual: float
    hra_monthly: float
    da_annual: float
    da_monthly: float
    conveyance_annual: float
    conveyance_monthly: float
    medical_annual: float
    medical_monthly: float
    special_allowance_annual: float
    special_allowance_monthly: float
    employer_pf_annual: float
    employer_pf_monthly: float
    employer_esi_annual: float
    employer_esi_monthly: float
    gross_salary_annual: float
    gross_salary_monthly: float
    employee_pf_annual: float
    employee_pf_monthly: float
    employee_esi_annual: float
    employee_esi_monthly: float
    professional_tax_annual: float
    professional_tax_monthly: float
    net_salary_annual: float
    net_salary_monthly: float
