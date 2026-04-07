export default function SummaryView({ lines, totalLo, totalHi, clientInfo, onClientChange, onSave, onExportPDF, lang, T }) {
  return (
    <div>
      <div style={{
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: 12,
        padding: '16px',
        marginBottom: 12
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 12 }}>
          {T[lang].clientInfo}
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>
            {T[lang].clientName}
          </label>
          <input
            type="text"
            value={clientInfo.name}
            onChange={e => onClientChange({ name: e.target.value })}
            placeholder={T[lang].namePlaceholder}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>
            {T[lang].address}
          </label>
          <input
            type="text"
            value={clientInfo.address}
            onChange={e => onClientChange({ address: e.target.value })}
            placeholder={T[lang].addressPlaceholder}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 4 }}>
            {T[lang].notes}
          </label>
          <textarea
            value={clientInfo.notes}
            onChange={e => onClientChange({ notes: e.target.value })}
            placeholder={T[lang].notesPlaceholder}
            rows={3}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
          />
        </div>
      </div>

      <div style={{
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#555', padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
          {T[lang].breakdown}
        </div>

        {lines.length <= 1 ? (
          <div style={{ padding: 20, fontSize: 14, color: '#999', textAlign: 'center' }}>
            {T[lang].noItems}
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
                background: line.name.includes('Permit') || line.name.includes('Permiso') ? '#f9f9f9' : '#fff'
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

      {lines.length > 1 && (
        <div style={{
          background: '#2D5A27',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 12
        }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{T[lang].estimatedTotal}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>
            ${totalLo.toLocaleString()} – ${totalHi.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
            {T[lang].exclTax}
          </div>
        </div>
      )}

      {lines.length > 1 && (
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onSave}
            style={{
              flex: 1, padding: '12px', borderRadius: 10,
              border: '1px solid #2D5A27', background: '#fff',
              color: '#2D5A27', fontWeight: 600, fontSize: 14
            }}
          >
            {T[lang].saveHistory}
          </button>
          <button
            onClick={onExportPDF}
            style={{
              flex: 1, padding: '12px', borderRadius: 10,
              border: 'none', background: '#2D5A27',
              color: '#fff', fontWeight: 600, fontSize: 14
            }}
          >
            {T[lang].exportPDF}
          </button>
        </div>
      )}

      <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
        {T[lang].disclaimer}
      </p>
    </div>
  )
}