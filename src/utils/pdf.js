import jsPDF from 'jspdf'

export function generatePDF(clientInfo, lines, totalLo, totalHi) {
  const doc = new jsPDF()
  const pageW = doc.internal.pageSize.getWidth()
  let y = 24

  // Header
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(45, 90, 39)
  doc.text("Dad's Construction", 20, y)
  y += 8

  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(45, 90, 39)
  doc.text('Project Estimate', 20, y)
  y += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 120, 120)
  doc.text('Greater Seattle Area  •  Excl. WA sales tax', 20, y)
  y += 6

  doc.setDrawColor(220, 220, 220)
  doc.line(20, y, pageW - 20, y)
  y += 10

  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(50, 50, 50)
  doc.text('Client:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text(clientInfo.name || 'N/A', 50, y)
  y += 7

  doc.setFont('helvetica', 'bold')
  doc.text('Address:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text(clientInfo.address || 'N/A', 50, y)
  y += 7

  if (clientInfo.notes) {
    doc.setFont('helvetica', 'bold')
    doc.text('Notes:', 20, y)
    doc.setFont('helvetica', 'normal')
    const splitNotes = doc.splitTextToSize(clientInfo.notes, pageW - 70)
    doc.text(splitNotes, 50, y)
    y += splitNotes.length * 6
  }

  doc.text('Date: ' + new Date().toLocaleDateString(), 20, y)
  y += 10

  doc.setDrawColor(220, 220, 220)
  doc.line(20, y, pageW - 20, y)
  y += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 100, 100)
  doc.text('ITEM', 20, y)
  doc.text('ESTIMATED COST', pageW - 20, y, { align: 'right' })
  y += 6

  doc.setDrawColor(220, 220, 220)
  doc.line(20, y, pageW - 20, y)
  y += 8

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(50, 50, 50)

  lines.forEach((line, i) => {
    if (y > 260) { doc.addPage(); y = 24 }

    const isPermit = line.name.includes('Permit')
    const isLast = i === lines.length - 1

    if (isPermit) {
      doc.setTextColor(120, 120, 120)
      doc.setFont('helvetica', 'italic')
    } else {
      doc.setTextColor(50, 50, 50)
      doc.setFont('helvetica', 'normal')
    }

    const cost = '$' + line.lo.toLocaleString() + ' – $' + line.hi.toLocaleString()
    doc.text(line.name, 20, y)
    doc.text(cost, pageW - 20, y, { align: 'right' })
    y += 7

    if (isLast) {
      doc.setDrawColor(220, 220, 220)
      doc.line(20, y, pageW - 20, y)
      y += 2
    }
  })

  y += 6

  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(45, 90, 39)
  doc.text(
    'Estimated Total: $' + totalLo.toLocaleString() + ' – $' + totalHi.toLocaleString(),
    pageW - 20, y, { align: 'right' }
  )
  y += 16

  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(160, 160, 160)
  const disclaimer = 'This estimate is for planning purposes only. Actual costs vary based on site conditions, material selections, and contractor availability. Always obtain multiple bids.'
  const splitDisclaimer = doc.splitTextToSize(disclaimer, pageW - 40)
  doc.text(splitDisclaimer, 20, y)

  const filename = 'estimate-' + (clientInfo.name || 'client').replace(/\s+/g, '-').toLowerCase() + '.pdf'
  doc.save(filename)
}