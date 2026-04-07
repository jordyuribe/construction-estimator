import { useState } from 'react'
import ItemRow from './ItemRow'

export default function EstimatorSection({ section, selections, onChange, lang, T }) {
  const [open, setOpen] = useState(false)

  const selectedCount = section.items.filter(item => selections[item.id]?.on).length

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e5e5',
      borderRadius: 12,
      marginBottom: 10,
      overflow: 'hidden'
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>
            {section.name}
          </div>
          {selectedCount > 0 && (
            <div style={{ fontSize: 12, color: '#2D5A27', marginTop: 2 }}>
              {selectedCount} {selectedCount > 1 ? T[lang].itemsSelected : T[lang].itemSelected}
            </div>
          )}
        </div>
        <span style={{ fontSize: 18, color: '#999' }}>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
          {section.items.map(item => (
            <ItemRow
              key={item.id}
              item={item}
              value={selections[item.id]}
              onChange={(newValue) => onChange(item.id, newValue)}
            />
          ))}
        </div>
      )}
    </div>
  )
}