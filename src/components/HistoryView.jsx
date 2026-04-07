export default function HistoryView({ history, onReopen, onDelete, lang, T }) {

  if (history.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{T[lang].noHistory}</div>
        <div style={{ fontSize: 14 }}>{T[lang].noHistorySub}</div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>
        {history.length} {history.length > 1 ? T[lang].itemsSelected : T[lang].itemSelected}
      </div>

      {history.map(entry => (
        <div
          key={entry.id}
          style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: 12,
            padding: '14px 16px',
            marginBottom: 10
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 6
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>
                {entry.clientName || T[lang].unnamedClient}
              </div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
                {entry.address || T[lang].noAddress}
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#aaa' }}>{entry.date}</div>
          </div>

          <div style={{ fontSize: 16, fontWeight: 700, color: '#2D5A27', marginBottom: 10 }}>
            ${entry.totalLo.toLocaleString()} – ${entry.totalHi.toLocaleString()}
          </div>

          {entry.notes ? (
            <div style={{
              fontSize: 13, color: '#666', fontStyle: 'italic',
              marginBottom: 10, paddingTop: 8, borderTop: '1px solid #f0f0f0'
            }}>
              {entry.notes}
            </div>
          ) : null}

          <div style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>
            {entry.lines.length - 1} {T[lang].itemsInEstimate}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onReopen(entry)}
              style={{
                flex: 1, padding: '8px', borderRadius: 8,
                border: '1px solid #2D5A27', background: '#fff',
                color: '#2D5A27', fontWeight: 600, fontSize: 13
              }}
            >
              {T[lang].reopen}
            </button>
            <button
              onClick={() => {
                if (window.confirm(T[lang].deleteConfirm)) onDelete(entry.id)
              }}
              style={{
                padding: '8px 14px', borderRadius: 8,
                border: '1px solid #ffcccc', background: '#fff',
                color: '#cc3333', fontWeight: 600, fontSize: 13
              }}
            >
              {T[lang].delete}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}