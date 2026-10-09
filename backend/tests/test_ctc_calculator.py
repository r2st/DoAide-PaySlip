import pytest
from app.ctc_calculator import calculate_ctc_breakdown
from app.models import CTCInput


def test_basic_ctc_breakdown():
    inp = CTCInput(annual_ctc=1200000)
    result = calculate_ctc_breakdown(inp)
    assert result.annual_ctc == 1200000
    assert result.basic_salary_annual == 480000
    assert result.basic_salary_monthly == 40000
    assert result.hra_annual == 240000
    assert result.hra_monthly == 20000
    assert result.net_salary_monthly > 0
    assert result.net_salary_monthly < result.gross_salary_monthly


def test_ctc_with_esi():
    inp = CTCInput(annual_ctc=240000, include_esi=True)
    result = calculate_ctc_breakdown(inp)
    assert result.employee_esi_monthly > 0
    assert result.employer_esi_monthly > 0


def test_ctc_without_esi():
    inp = CTCInput(annual_ctc=1200000, include_esi=False)
    result = calculate_ctc_breakdown(inp)
    assert result.employee_esi_monthly == 0
    assert result.employer_esi_monthly == 0


def test_pf_capped_at_ceiling():
    inp = CTCInput(annual_ctc=3000000)
    result = calculate_ctc_breakdown(inp)
    assert result.employee_pf_monthly == 1800


def test_net_less_than_gross():
    inp = CTCInput(annual_ctc=600000)
    result = calculate_ctc_breakdown(inp)
    assert result.net_salary_monthly < result.gross_salary_monthly
    assert result.net_salary_annual < result.gross_salary_annual


def test_all_components_positive():
    inp = CTCInput(annual_ctc=1000000)
    result = calculate_ctc_breakdown(inp)
    assert result.basic_salary_monthly > 0
    assert result.hra_monthly > 0
    assert result.da_monthly > 0
    assert result.conveyance_monthly > 0
    assert result.medical_monthly > 0
