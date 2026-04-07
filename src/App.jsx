import { useState } from 'react'
import { SECTIONS } from './data/sections'
import EstimatorSection from './components/EstimatorSection'
import SummaryView from './components/SummaryView'
import HistoryView from './components/HistoryView'

function initSelections() {
  const selections = {}
  SECTIONS.forEach(section => {
    section.items.forEach(item => {
      selections[item.id] = {
        on: false,
        sqft: item.defaultSqft || 100,
        qty: item.defaultQty || 1,
        sel: item.options ? item.options[0][0] : null,
        finish: 'mid'
      }
    })
  })
  return selections
}

export default function App() {
  const [view, setView] = useState('estimator')
  const [selections, setSelections] = useState(initSelections)
  const [clientInfo, setClientInfo] = useState({
    name: '',
    address: '',
    notes: ''
  })
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('estimates')) || []
    } catch {
      return []
    }
  })

  function handleChange(itemId, newValue) {
    setSelections(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], ...newValue }
    }))
  }

function handleSave() {
  if (lines.length <= 1) return

  const entry = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    clientName: clientInfo.name || 'Unnamed client',
    address: clientInfo.address || 'No address',
    notes: clientInfo.notes,
    totalLo,
    totalHi,
    lines,
    selections
  }

  const updated = [entry, ...history]
  setHistory(updated)
  localStorage.setItem('estimates', JSON.stringify(updated))

  // Reset for next job
  setSelections(initSelections())
  setClientInfo({ name: '', address: '', notes: '' })
  setView('estimator')

  alert('Estimate saved!')
}

  function handleReopen(entry) {
    setSelections(entry.selections)
    setClientInfo({
      name: entry.clientName,
      address: entry.address,
      notes: entry.notes || ''
    })
    setView('estimator')
  }

  function handleDelete(id) {
    const updated = history.filter(e => e.id !== id)
    setHistory(updated)
    localStorage.setItem('estimates', JSON.stringify(updated))
  }

  function handleExportPDF() {
    if (lines.length <= 1) return

    import('./utils/pdf.js').then(({ generatePDF }) => {
      generatePDF(clientInfo, lines, totalLo, totalHi)
    })
  }

  function calculateCost() {
    let totalLo = 0
    let totalHi = 0
    const lines = []

    SECTIONS.forEach(section => {
      section.items.forEach(item => {
        const s = selections[item.id]
        if (!s?.on) return

        let lo, hi

        if (item.type === 'checkbox') {
          lo = item.rates[0]
          hi = item.rates[1]
        } else if (item.type === 'sqft') {
          lo = s.sqft * item.rates[0]
          hi = s.sqft * item.rates[1]
        } else if (item.type === 'sqft-finish') {
          const r = item.rates[s.finish || 'mid']
          lo = s.sqft * r[0]
          hi = s.sqft * r[1]
        } else if (item.type === 'sqft-select') {
          const opt = item.options.find(o => o[0] === s.sel) || item.options[0]
          lo = s.sqft * opt[2][0]
          hi = s.sqft * opt[2][1]
        } else if (item.type === 'qty') {
          lo = s.qty * item.ratePerUnit[0]
          hi = s.qty * item.ratePerUnit[1]
        }

        lines.push({
          name: item.label,
          lo: Math.round(lo),
          hi: Math.round(hi)
        })

        totalLo += lo
        totalHi += hi
      })
    })

    const permitLo = Math.round(totalLo * 0.04)
    const permitHi = Math.round(totalHi * 0.04)

    lines.push({
      name: 'Permits (est. ~4%)',
      lo: permitLo,
      hi: permitHi
    })

    return {
      lines,
      totalLo: Math.round(totalLo + permitLo),
      totalHi: Math.round(totalHi + permitHi)
    }
  }

  const { lines, totalLo, totalHi } = calculateCost()

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '1rem' }}>
    <div style={{
      borderLeft: '4px solid #2D5A27',
      paddingLeft: 12,
      marginBottom: 20
    }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#2D5A27', marginBottom: 2 }}>
        Dad's Construction
      </h1>
      <p style={{ fontSize: 13, color: '#888' }}>
        Project Estimator · Greater Seattle Area
      </p>
    </div>

      {/* Nav */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['estimator', 'summary', 'history'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: '1px solid #ddd',
              background: view === v ? '#2D5A27' : '#fff',
              color: view === v ? '#fff' : '#333',
              fontWeight: 500,
              fontSize: 14
            }}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Views — we'll build these next */}
      {view === 'estimator' && (
        <div>

          {/* Section cards */}
          {SECTIONS.map(section => (
            <EstimatorSection
              key={section.id}
              section={section}
              selections={selections}
              onChange={handleChange}
            />
          ))}

          {/* Total bar at the bottom */}
          {lines.length > 1 && (
            <div style={{
              background: '#2D5A27',
              borderRadius: 12,
              padding: '16px 20px',
              marginTop: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                  Estimated total
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>
                  ${totalLo.toLocaleString()} – ${totalHi.toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => setView('summary')}
                style={{
                  background: '#fff',
                  color: '#2D5A27',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontWeight: 600,
                  fontSize: 14
                }}
              >
                Review →
              </button>
            </div>
          )}

        </div>
      )}

      {view === 'summary' && (
        <SummaryView
          lines={lines}
          totalLo={totalLo}
          totalHi={totalHi}
          clientInfo={clientInfo}
          onClientChange={(val) => setClientInfo(prev => ({ ...prev, ...val }))}
          onSave={handleSave}
          onExportPDF={handleExportPDF}
        />
      )}

      {view === 'history' && (
        <HistoryView
          history={history}
          onReopen={handleReopen}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}