export default function SummaryView({ lines, totalLo, totalHi, clientInfo, onClientChange, onSave, onExportPDF }) {

  return (
    <div>

      {/* Client info */}
      <div style={{
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: 12,
        padding: '16px',
        marginBottom: 12
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 12 }}>
          CLIENT INFO
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>
            Client name
          </label>
          <input
            type="text"
            value={clientInfo.name}
            onChange={e => onClientChange({ name: e.target.value })}
            placeholder="e.g. John Smith"
            style={{
              width: '100%',
              padding: '8px 10px',
              border: '1px solid #ddd',
              borderRadius: 8,
              fontSize: 14
            }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>
            Job address
          </label>
          <input
            type="text"
            value={clientInfo.address}
            onChange={e => onClientChange({ address: e.target.value })}
            placeholder="e.g. 123 Main St, Bellevue WA"
            style={{
              width: '100%',
              padding: '8px 10px',
              border: '1px solid #ddd',
              borderRadius: 8,
              fontSize: 14
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>
            Notes
          </label>
          <textarea
            value={clientInfo.notes}
            onChange={e => onClientChange({ notes: e.target.value })}
            placeholder="Any extra details about the job..."
            rows={3}
            style={{
              width: '100%',
              padding: '8px 10px',
              border: '1px solid #ddd',
              borderRadius: 8,
              fontSize: 14,
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* Line items */}
      <div style={{
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#555',
          padding: '12px 16px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          ESTIMATE BREAKDOWN
        </div>

        {lines.length <= 1 ? (
          <div style={{ padding: 20, fontSize: 14, color: '#999', textAlign: 'center' }}>
            No items selected yet — go back to the estimator
          </div>
        ) : (
          lines.map((line, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 16px',
                borderBottom: i < lines.length - 1 ? '1px solid #f0f0f0' : 'none',
                background: line.name.includes('Permit') ? '#f9f9f9' : '#fff'
              }}
            >
              <span style={{ fontSize: 14, color: '#333' }}>{line.name}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#111', whiteSpace: 'nowrap' }}>
                ${line.lo.toLocaleString()} – ${line.hi.toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      {lines.length > 1 && (
        <div style={{
          background: '#2D5A27',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 12,
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
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
              Excl. WA sales tax
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {lines.length > 1 && (
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onSave}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 10,
              border: '1px solid #2D5A27',
              background: '#fff',
              color: '#2D5A27',
              fontWeight: 600,
              fontSize: 14
            }}
          >
            Save to history
          </button>
          <button
            onClick={onExportPDF}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 10,
              border: 'none',
              background: '#2D5A27',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14
            }}
          >
            Export PDF
          </button>
        </div>
      )}

      <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
        Estimates are for planning purposes only. Actual costs vary by site conditions and material choices.
      </p>

    </div>
  )
}