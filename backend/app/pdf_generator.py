import io
import calendar
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from .models import PayslipInput


def _fmt(amount: float) -> str:
    if amount == int(amount):
        return f"₹{int(amount):,}"
    return f"₹{amount:,.2f}"


def _month_year(month: int, year: int) -> str:
    return f"{calendar.month_name[month]} {year}"


def _total_earnings(inp: PayslipInput) -> float:
    e = inp.earnings
    return (e.basic_salary + e.hra + e.dearness_allowance +
            e.conveyance_allowance + e.medical_allowance +
            e.special_allowance + e.other_allowance)


def _total_deductions(inp: PayslipInput) -> float:
    d = inp.deductions
    return (d.provident_fund + d.esi + d.professional_tax +
            d.tds + d.other_deductions)


def _net_pay(inp: PayslipInput) -> float:
    return _total_earnings(inp) - _total_deductions(inp)


def _number_to_words(num: int) -> str:
    if num == 0:
        return "Zero"
    ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
            "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
            "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]
    tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty",
            "Sixty", "Seventy", "Eighty", "Ninety"]

    def _convert(n):
        if n < 20:
            return ones[n]
        if n < 100:
            return tens[n // 10] + (" " + ones[n % 10] if n % 10 else "")
        if n < 1000:
            return ones[n // 100] + " Hundred" + (" and " + _convert(n % 100) if n % 100 else "")
        if n < 100000:
            return _convert(n // 1000) + " Thousand" + (" " + _convert(n % 1000) if n % 1000 else "")
        if n < 10000000:
            return _convert(n // 100000) + " Lakh" + (" " + _convert(n % 100000) if n % 100000 else "")
        return _convert(n // 10000000) + " Crore" + (" " + _convert(n % 10000000) if n % 10000000 else "")

    return _convert(num) + " Rupees Only"


def generate_standard_payslip(inp: PayslipInput) -> bytes:
    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4, topMargin=15*mm, bottomMargin=15*mm,
                            leftMargin=15*mm, rightMargin=15*mm)
    styles = getSampleStyleSheet()
    elements = []

    title_style = ParagraphStyle("Title", parent=styles["Title"], fontSize=16,
                                  textColor=colors.HexColor("#1a365d"), spaceAfter=2*mm)
    subtitle_style = ParagraphStyle("Subtitle", parent=styles["Normal"], fontSize=10,
                                     alignment=TA_CENTER, textColor=colors.grey)
    header_style = ParagraphStyle("Header", parent=styles["Normal"], fontSize=9,
                                   textColor=colors.HexColor("#2d3748"))
    cell_style = ParagraphStyle("Cell", parent=styles["Normal"], fontSize=9)
    bold_style = ParagraphStyle("Bold", parent=styles["Normal"], fontSize=9,
                                 fontName="Helvetica-Bold")
    small_style = ParagraphStyle("Small", parent=styles["Normal"], fontSize=8,
                                  textColor=colors.grey, alignment=TA_CENTER)

    elements.append(Paragraph(inp.company_name.upper(), title_style))
    if inp.company_address:
        elements.append(Paragraph(inp.company_address, subtitle_style))
    elements.append(Spacer(1, 3*mm))
    elements.append(Paragraph(f"<b>PAYSLIP FOR THE MONTH OF {_month_year(inp.month, inp.year).upper()}</b>",
                              ParagraphStyle("PS", parent=styles["Normal"], fontSize=11,
                                             alignment=TA_CENTER, textColor=colors.HexColor("#2b6cb0"))))
    elements.append(Spacer(1, 5*mm))

    info_data = []
    row1 = [Paragraph(f"<b>Employee Name:</b> {inp.employee_name}", header_style),
            Paragraph(f"<b>Employee ID:</b> {inp.employee_id or 'N/A'}", header_style)]
    row2 = [Paragraph(f"<b>Designation:</b> {inp.designation}", header_style),
            Paragraph(f"<b>Department:</b> {inp.department or 'N/A'}", header_style)]
    row3 = [Paragraph(f"<b>PAN:</b> {inp.pan or 'N/A'}", header_style),
            Paragraph(f"<b>Bank A/C:</b> {inp.bank_account or 'N/A'}", header_style)]
    info_data = [row1, row2, row3]

    info_table = Table(info_data, colWidths=[90*mm, 90*mm])
    info_table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")),
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f7fafc")),
        ("TOPPADDING", (0, 0), (-1, -1), 3*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 3*mm),
    ]))
    elements.append(info_table)
    elements.append(Spacer(1, 5*mm))

    earnings_items = [
        ("Basic Salary", inp.earnings.basic_salary),
        ("House Rent Allowance", inp.earnings.hra),
        ("Dearness Allowance", inp.earnings.dearness_allowance),
        ("Conveyance Allowance", inp.earnings.conveyance_allowance),
        ("Medical Allowance", inp.earnings.medical_allowance),
        ("Special Allowance", inp.earnings.special_allowance),
        ("Other Allowance", inp.earnings.other_allowance),
    ]
    deductions_items = [
        ("Provident Fund", inp.deductions.provident_fund),
        ("ESI", inp.deductions.esi),
        ("Professional Tax", inp.deductions.professional_tax),
        ("TDS", inp.deductions.tds),
        ("Other Deductions", inp.deductions.other_deductions),
    ]

    earnings_rows = [(Paragraph(name, cell_style), Paragraph(_fmt(val), cell_style))
                     for name, val in earnings_items if val > 0]
    deductions_rows = [(Paragraph(name, cell_style), Paragraph(_fmt(val), cell_style))
                       for name, val in deductions_items if val > 0]

    max_rows = max(len(earnings_rows), len(deductions_rows))
    while len(earnings_rows) < max_rows:
        earnings_rows.append(("", ""))
    while len(deductions_rows) < max_rows:
        deductions_rows.append(("", ""))

    header_row = [
        Paragraph("<b>Earnings</b>", bold_style),
        Paragraph("<b>Amount (₹)</b>", bold_style),
        Paragraph("<b>Deductions</b>", bold_style),
        Paragraph("<b>Amount (₹)</b>", bold_style),
    ]

    table_data = [header_row]
    for i in range(max_rows):
        row = list(earnings_rows[i]) + list(deductions_rows[i])
        table_data.append(row)

    total_row = [
        Paragraph("<b>Total Earnings</b>", bold_style),
        Paragraph(f"<b>{_fmt(_total_earnings(inp))}</b>", bold_style),
        Paragraph("<b>Total Deductions</b>", bold_style),
        Paragraph(f"<b>{_fmt(_total_deductions(inp))}</b>", bold_style),
    ]
    table_data.append(total_row)

    salary_table = Table(table_data, colWidths=[55*mm, 35*mm, 55*mm, 35*mm])
    salary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2b6cb0")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")),
        ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#ebf8ff")),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 3*mm),
        ("LINEBELOW", (0, 0), (-1, 0), 1, colors.HexColor("#2b6cb0")),
    ]))
    elements.append(salary_table)
    elements.append(Spacer(1, 5*mm))

    net = _net_pay(inp)
    net_data = [[
        Paragraph(f"<b>NET PAY: {_fmt(net)}</b>",
                  ParagraphStyle("Net", parent=styles["Normal"], fontSize=12,
                                 fontName="Helvetica-Bold", textColor=colors.HexColor("#1a365d")))
    ]]
    net_table = Table(net_data, colWidths=[180*mm])
    net_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#ebf8ff")),
        ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#2b6cb0")),
        ("TOPPADDING", (0, 0), (-1, -1), 4*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 5*mm),
    ]))
    elements.append(net_table)
    elements.append(Spacer(1, 3*mm))

    words = _number_to_words(int(net))
    elements.append(Paragraph(f"<i>Amount in words: {words}</i>", small_style))
    elements.append(Spacer(1, 10*mm))
    elements.append(Paragraph("This is a computer-generated payslip and does not require a signature.",
                              small_style))

    doc.build(elements)
    return buf.getvalue()


def generate_corporate_payslip(inp: PayslipInput) -> bytes:
    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4, topMargin=15*mm, bottomMargin=15*mm,
                            leftMargin=15*mm, rightMargin=15*mm)
    styles = getSampleStyleSheet()
    elements = []

    dark = colors.HexColor("#1a202c")
    accent = colors.HexColor("#2d3748")
    gold = colors.HexColor("#d69e2e")
    light_bg = colors.HexColor("#fafafa")

    title_style = ParagraphStyle("Title", parent=styles["Title"], fontSize=18,
                                  textColor=dark, fontName="Helvetica-Bold")
    cell_style = ParagraphStyle("Cell", parent=styles["Normal"], fontSize=9)
    bold_style = ParagraphStyle("Bold", parent=styles["Normal"], fontSize=9,
                                 fontName="Helvetica-Bold")
    small_style = ParagraphStyle("Small", parent=styles["Normal"], fontSize=8,
                                  textColor=colors.grey, alignment=TA_CENTER)

    header_bar = Table([[Paragraph(inp.company_name.upper(), title_style)]], colWidths=[180*mm])
    header_bar.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), light_bg),
        ("LINEBELOW", (0, 0), (-1, -1), 2, gold),
        ("TOPPADDING", (0, 0), (-1, -1), 5*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 5*mm),
    ]))
    elements.append(header_bar)

    if inp.company_address:
        elements.append(Paragraph(inp.company_address,
                                  ParagraphStyle("Addr", parent=styles["Normal"], fontSize=9,
                                                 textColor=colors.grey, alignment=TA_CENTER)))
    elements.append(Spacer(1, 3*mm))
    elements.append(Paragraph(f"Salary Statement — {_month_year(inp.month, inp.year)}",
                              ParagraphStyle("SS", parent=styles["Normal"], fontSize=11,
                                             alignment=TA_CENTER, fontName="Helvetica-Bold",
                                             textColor=accent)))
    elements.append(Spacer(1, 5*mm))

    info_pairs = [
        ("Employee Name", inp.employee_name),
        ("Employee ID", inp.employee_id or "N/A"),
        ("Designation", inp.designation),
        ("Department", inp.department or "N/A"),
        ("PAN", inp.pan or "N/A"),
        ("Bank Account", inp.bank_account or "N/A"),
    ]
    info_data = []
    for i in range(0, len(info_pairs), 2):
        row = [
            Paragraph(f"<b>{info_pairs[i][0]}:</b>", bold_style),
            Paragraph(info_pairs[i][1], cell_style),
            Paragraph(f"<b>{info_pairs[i+1][0]}:</b>", bold_style),
            Paragraph(info_pairs[i+1][1], cell_style),
        ]
        info_data.append(row)

    info_table = Table(info_data, colWidths=[35*mm, 55*mm, 35*mm, 55*mm])
    info_table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#cbd5e0")),
        ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f7fafc")),
        ("BACKGROUND", (2, 0), (2, -1), colors.HexColor("#f7fafc")),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 3*mm),
    ]))
    elements.append(info_table)
    elements.append(Spacer(1, 6*mm))

    earnings_items = [
        ("Basic Salary", inp.earnings.basic_salary),
        ("HRA", inp.earnings.hra),
        ("Dearness Allowance", inp.earnings.dearness_allowance),
        ("Conveyance", inp.earnings.conveyance_allowance),
        ("Medical", inp.earnings.medical_allowance),
        ("Special Allowance", inp.earnings.special_allowance),
        ("Other", inp.earnings.other_allowance),
    ]
    deductions_items = [
        ("Provident Fund", inp.deductions.provident_fund),
        ("ESI", inp.deductions.esi),
        ("Professional Tax", inp.deductions.professional_tax),
        ("TDS", inp.deductions.tds),
        ("Other", inp.deductions.other_deductions),
    ]

    e_rows = [(Paragraph(n, cell_style), Paragraph(_fmt(v), cell_style))
              for n, v in earnings_items if v > 0]
    d_rows = [(Paragraph(n, cell_style), Paragraph(_fmt(v), cell_style))
              for n, v in deductions_items if v > 0]

    max_rows = max(len(e_rows), len(d_rows))
    while len(e_rows) < max_rows:
        e_rows.append(("", ""))
    while len(d_rows) < max_rows:
        d_rows.append(("", ""))

    table_data = [[
        Paragraph("<b>EARNINGS</b>", bold_style),
        Paragraph("<b>AMOUNT</b>", bold_style),
        Paragraph("<b>DEDUCTIONS</b>", bold_style),
        Paragraph("<b>AMOUNT</b>", bold_style),
    ]]
    for i in range(max_rows):
        table_data.append(list(e_rows[i]) + list(d_rows[i]))

    table_data.append([
        Paragraph("<b>GROSS EARNINGS</b>", bold_style),
        Paragraph(f"<b>{_fmt(_total_earnings(inp))}</b>", bold_style),
        Paragraph("<b>TOTAL DEDUCTIONS</b>", bold_style),
        Paragraph(f"<b>{_fmt(_total_deductions(inp))}</b>", bold_style),
    ])

    salary_table = Table(table_data, colWidths=[55*mm, 35*mm, 55*mm, 35*mm])
    salary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), accent),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#cbd5e0")),
        ("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#edf2f7")),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 3*mm),
        ("LINEABOVE", (0, -1), (-1, -1), 1, accent),
    ]))
    elements.append(salary_table)
    elements.append(Spacer(1, 5*mm))

    net = _net_pay(inp)
    net_table = Table([[
        Paragraph(f"<b>NET PAYABLE: {_fmt(net)}</b>",
                  ParagraphStyle("Net", parent=styles["Normal"], fontSize=13,
                                 fontName="Helvetica-Bold", textColor=dark, alignment=TA_CENTER))
    ]], colWidths=[180*mm])
    net_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fefcbf")),
        ("BOX", (0, 0), (-1, -1), 1, gold),
        ("TOPPADDING", (0, 0), (-1, -1), 4*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4*mm),
    ]))
    elements.append(net_table)
    elements.append(Spacer(1, 3*mm))

    words = _number_to_words(int(net))
    elements.append(Paragraph(f"<i>In words: {words}</i>", small_style))
    elements.append(Spacer(1, 10*mm))
    elements.append(Paragraph("This is a system-generated document. No signature required.", small_style))

    doc.build(elements)
    return buf.getvalue()


def generate_modern_payslip(inp: PayslipInput) -> bytes:
    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4, topMargin=15*mm, bottomMargin=15*mm,
                            leftMargin=15*mm, rightMargin=15*mm)
    styles = getSampleStyleSheet()
    elements = []

    primary = colors.HexColor("#6366f1")
    primary_dark = colors.HexColor("#4338ca")
    primary_light = colors.HexColor("#eef2ff")
    text_dark = colors.HexColor("#1e1b4b")

    title_style = ParagraphStyle("Title", parent=styles["Title"], fontSize=20,
                                  textColor=colors.white, fontName="Helvetica-Bold",
                                  alignment=TA_LEFT)
    cell_style = ParagraphStyle("Cell", parent=styles["Normal"], fontSize=9)
    bold_style = ParagraphStyle("Bold", parent=styles["Normal"], fontSize=9,
                                 fontName="Helvetica-Bold")
    small_style = ParagraphStyle("Small", parent=styles["Normal"], fontSize=8,
                                  textColor=colors.grey, alignment=TA_CENTER)

    header_data = [[
        Paragraph(inp.company_name, title_style),
        Paragraph(f"<font color='white' size='10'>{_month_year(inp.month, inp.year)}</font>",
                  ParagraphStyle("Date", parent=styles["Normal"], alignment=TA_RIGHT)),
    ]]
    header_table = Table(header_data, colWidths=[120*mm, 60*mm])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), primary),
        ("TOPPADDING", (0, 0), (-1, -1), 6*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 5*mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5*mm),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    elements.append(header_table)

    if inp.company_address:
        addr_table = Table([[Paragraph(inp.company_address,
                             ParagraphStyle("Addr", parent=styles["Normal"], fontSize=8,
                                            textColor=colors.HexColor("#a5b4fc")))]], colWidths=[180*mm])
        addr_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), primary_dark),
            ("TOPPADDING", (0, 0), (-1, -1), 1*mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2*mm),
            ("LEFTPADDING", (0, 0), (-1, -1), 5*mm),
        ]))
        elements.append(addr_table)

    elements.append(Spacer(1, 5*mm))

    label_style = ParagraphStyle("Label", parent=styles["Normal"], fontSize=8,
                                  textColor=colors.grey)
    value_style = ParagraphStyle("Value", parent=styles["Normal"], fontSize=10,
                                  fontName="Helvetica-Bold", textColor=text_dark)

    info_data = [
        [Paragraph("Employee Name", label_style), Paragraph("Employee ID", label_style),
         Paragraph("Designation", label_style)],
        [Paragraph(inp.employee_name, value_style), Paragraph(inp.employee_id or "—", value_style),
         Paragraph(inp.designation, value_style)],
        [Paragraph("Department", label_style), Paragraph("PAN", label_style),
         Paragraph("Bank Account", label_style)],
        [Paragraph(inp.department or "—", value_style), Paragraph(inp.pan or "—", value_style),
         Paragraph(inp.bank_account or "—", value_style)],
    ]
    info_table = Table(info_data, colWidths=[60*mm, 60*mm, 60*mm])
    info_table.setStyle(TableStyle([
        ("TOPPADDING", (0, 0), (-1, -1), 1*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 3*mm),
        ("LINEBELOW", (0, 1), (-1, 1), 0.5, colors.HexColor("#e2e8f0")),
        ("LINEBELOW", (0, 3), (-1, 3), 0.5, colors.HexColor("#e2e8f0")),
    ]))
    elements.append(info_table)
    elements.append(Spacer(1, 6*mm))

    earnings_items = [
        ("Basic Salary", inp.earnings.basic_salary),
        ("HRA", inp.earnings.hra),
        ("DA", inp.earnings.dearness_allowance),
        ("Conveyance", inp.earnings.conveyance_allowance),
        ("Medical", inp.earnings.medical_allowance),
        ("Special Allowance", inp.earnings.special_allowance),
        ("Other", inp.earnings.other_allowance),
    ]
    deductions_items = [
        ("PF", inp.deductions.provident_fund),
        ("ESI", inp.deductions.esi),
        ("Prof. Tax", inp.deductions.professional_tax),
        ("TDS", inp.deductions.tds),
        ("Other", inp.deductions.other_deductions),
    ]

    e_rows = [(n, v) for n, v in earnings_items if v > 0]
    d_rows = [(n, v) for n, v in deductions_items if v > 0]
    max_rows = max(len(e_rows), len(d_rows))
    while len(e_rows) < max_rows:
        e_rows.append(("", 0))
    while len(d_rows) < max_rows:
        d_rows.append(("", 0))

    table_data = [[
        Paragraph("<b>EARNINGS</b>", ParagraphStyle("EH", fontSize=9, fontName="Helvetica-Bold",
                                                     textColor=colors.white)),
        Paragraph("<b>₹</b>", ParagraphStyle("EH2", fontSize=9, fontName="Helvetica-Bold",
                                              textColor=colors.white, alignment=TA_RIGHT)),
        Paragraph("<b>DEDUCTIONS</b>", ParagraphStyle("DH", fontSize=9, fontName="Helvetica-Bold",
                                                       textColor=colors.white)),
        Paragraph("<b>₹</b>", ParagraphStyle("DH2", fontSize=9, fontName="Helvetica-Bold",
                                              textColor=colors.white, alignment=TA_RIGHT)),
    ]]

    for i in range(max_rows):
        en, ev = e_rows[i]
        dn, dv = d_rows[i]
        table_data.append([
            Paragraph(en, cell_style),
            Paragraph(_fmt(ev) if ev else "", ParagraphStyle("R", parent=cell_style, alignment=TA_RIGHT)),
            Paragraph(dn, cell_style),
            Paragraph(_fmt(dv) if dv else "", ParagraphStyle("R2", parent=cell_style, alignment=TA_RIGHT)),
        ])

    total_e = _total_earnings(inp)
    total_d = _total_deductions(inp)
    table_data.append([
        Paragraph("<b>Total</b>", bold_style),
        Paragraph(f"<b>{_fmt(total_e)}</b>", ParagraphStyle("TR", parent=bold_style, alignment=TA_RIGHT)),
        Paragraph("<b>Total</b>", bold_style),
        Paragraph(f"<b>{_fmt(total_d)}</b>", ParagraphStyle("TR2", parent=bold_style, alignment=TA_RIGHT)),
    ])

    salary_table = Table(table_data, colWidths=[50*mm, 40*mm, 50*mm, 40*mm])
    t_style = [
        ("BACKGROUND", (0, 0), (-1, 0), primary),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#e2e8f0")),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 3*mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3*mm),
        ("BACKGROUND", (0, -1), (-1, -1), primary_light),
        ("LINEABOVE", (0, -1), (-1, -1), 1, primary),
    ]
    for i in range(2, len(table_data) - 1, 2):
        t_style.append(("BACKGROUND", (0, i), (-1, i), colors.HexColor("#f8fafc")))
    salary_table.setStyle(TableStyle(t_style))
    elements.append(salary_table)
    elements.append(Spacer(1, 5*mm))

    net = _net_pay(inp)
    net_table = Table([[
        Paragraph(f"NET PAY",
                  ParagraphStyle("NL", fontSize=10, textColor=colors.white)),
        Paragraph(f"<b>{_fmt(net)}</b>",
                  ParagraphStyle("NV", fontSize=16, fontName="Helvetica-Bold",
                                 textColor=colors.white, alignment=TA_RIGHT)),
    ]], colWidths=[90*mm, 90*mm])
    net_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), primary),
        ("TOPPADDING", (0, 0), (-1, -1), 5*mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5*mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 5*mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5*mm),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    elements.append(net_table)
    elements.append(Spacer(1, 3*mm))

    words = _number_to_words(int(net))
    elements.append(Paragraph(f"<i>{words}</i>", small_style))
    elements.append(Spacer(1, 10*mm))
    elements.append(Paragraph("Auto-generated payslip · No signature required", small_style))

    doc.build(elements)
    return buf.getvalue()


TEMPLATE_GENERATORS = {
    "standard": generate_standard_payslip,
    "corporate": generate_corporate_payslip,
    "modern": generate_modern_payslip,
}


def generate_payslip(inp: PayslipInput) -> bytes:
    generator = TEMPLATE_GENERATORS.get(inp.template.value, generate_standard_payslip)
    return generator(inp)
