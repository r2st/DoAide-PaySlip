from .models import CTCInput, CTCBreakdown


BASIC_RATIO = 0.40
HRA_RATIO = 0.20
DA_RATIO = 0.05
CONVEYANCE_MONTHLY = 1600
MEDICAL_MONTHLY = 1250
PF_RATE = 0.12
PF_WAGE_CEILING = 15000
ESI_EMPLOYEE_RATE = 0.0075
ESI_EMPLOYER_RATE = 0.0325
ESI_WAGE_CEILING = 21000
PROFESSIONAL_TAX_MONTHLY = 200


def calculate_ctc_breakdown(inp: CTCInput) -> CTCBreakdown:
    annual_ctc = inp.annual_ctc

    basic_annual = round(annual_ctc * BASIC_RATIO)
    basic_monthly = round(basic_annual / 12)

    hra_annual = round(annual_ctc * HRA_RATIO)
    hra_monthly = round(hra_annual / 12)

    da_annual = round(annual_ctc * DA_RATIO)
    da_monthly = round(da_annual / 12)

    conveyance_annual = CONVEYANCE_MONTHLY * 12
    conveyance_monthly = CONVEYANCE_MONTHLY

    medical_annual = MEDICAL_MONTHLY * 12
    medical_monthly = MEDICAL_MONTHLY

    pf_wage = min(basic_monthly, PF_WAGE_CEILING)
    employer_pf_monthly = round(pf_wage * PF_RATE)
    employer_pf_annual = employer_pf_monthly * 12
    employee_pf_monthly = employer_pf_monthly
    employee_pf_annual = employee_pf_monthly * 12

    gross_monthly = basic_monthly + hra_monthly + da_monthly + conveyance_monthly + medical_monthly
    employer_cost = gross_monthly + employer_pf_monthly

    if inp.include_esi and gross_monthly <= ESI_WAGE_CEILING:
        employer_esi_monthly = round(gross_monthly * ESI_EMPLOYER_RATE)
        employee_esi_monthly = round(gross_monthly * ESI_EMPLOYEE_RATE)
    else:
        employer_esi_monthly = 0
        employee_esi_monthly = 0

    employer_esi_annual = employer_esi_monthly * 12
    employee_esi_annual = employee_esi_monthly * 12

    total_employer_cost_monthly = employer_cost + employer_esi_monthly
    remaining = round(annual_ctc / 12) - total_employer_cost_monthly
    special_monthly = max(0, remaining)
    special_annual = special_monthly * 12

    gross_monthly = gross_monthly + special_monthly
    gross_annual = gross_monthly * 12

    professional_tax_monthly = PROFESSIONAL_TAX_MONTHLY
    professional_tax_annual = professional_tax_monthly * 12

    total_deductions_monthly = employee_pf_monthly + employee_esi_monthly + professional_tax_monthly
    net_monthly = gross_monthly - total_deductions_monthly
    net_annual = net_monthly * 12

    return CTCBreakdown(
        annual_ctc=annual_ctc,
        basic_salary_annual=basic_annual,
        basic_salary_monthly=basic_monthly,
        hra_annual=hra_annual,
        hra_monthly=hra_monthly,
        da_annual=da_annual,
        da_monthly=da_monthly,
        conveyance_annual=conveyance_annual,
        conveyance_monthly=conveyance_monthly,
        medical_annual=medical_annual,
        medical_monthly=medical_monthly,
        special_allowance_annual=special_annual,
        special_allowance_monthly=special_monthly,
        employer_pf_annual=employer_pf_annual,
        employer_pf_monthly=employer_pf_monthly,
        employer_esi_annual=employer_esi_annual,
        employer_esi_monthly=employer_esi_monthly,
        gross_salary_annual=gross_annual,
        gross_salary_monthly=gross_monthly,
        employee_pf_annual=employee_pf_annual,
        employee_pf_monthly=employee_pf_monthly,
        employee_esi_annual=employee_esi_annual,
        employee_esi_monthly=employee_esi_monthly,
        professional_tax_annual=professional_tax_annual,
        professional_tax_monthly=professional_tax_monthly,
        net_salary_annual=net_annual,
        net_salary_monthly=net_monthly,
    )
