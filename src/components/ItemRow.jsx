export default function ItemRow({ item, value, onChange }) {

  function handleToggle(e) {
    onChange({ on: e.target.checked })
  }

  function handleSqft(e) {
    onChange({ sqft: Math.max(1, parseInt(e.target.value) || 1) })
  }

  function handleQty(delta) {
    onChange({ qty: Math.max(1, (value.qty || 1) + delta) })
  }

  function handleSel(e) {
    onChange({ sel: e.target.value })
  }

  function handleFinish(e) {
    onChange({ finish: e.target.value })
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 16px',
      borderBottom: '1px solid #f0f0f0',
      gap: 12,
      opacity: value.on ? 1 : 0.6
    }}>

      {/* Label + checkbox */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
        <input
          type="checkbox"
          checked={value.on}
          onChange={handleToggle}
          style={{ width: 16, height: 16, cursor: 'pointer' }}
        />
        <span style={{ fontSize: 14, color: '#111' }}>{item.label}</span>
      </div>

      {/* Controls on the right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

        {/* Sqft input — shows for sqft, sqft-finish, sqft-select */}
        {(item.type === 'sqft' || item.type === 'sqft-finish' || item.type === 'sqft-select') && (
          <>
            <input
              type="number"
              value={value.sqft}
              min={1}
              onChange={handleSqft}
              style={{
                width: 70,
                padding: '4px 6px',
                border: '1px solid #ddd',
                borderRadius: 6,
                fontSize: 13,
                textAlign: 'right'
              }}
            />
            <span style={{ fontSize: 11, color: '#999', whiteSpace: 'nowrap' }}>
              {item.unit}
            </span>
          </>
        )}

        {/* Finish selector — shows for sqft-finish */}
        {item.type === 'sqft-finish' && (
          <select
            value={value.finish}
            onChange={handleFinish}
            style={{
              padding: '4px 6px',
              border: '1px solid #ddd',
              borderRadius: 6,
              fontSize: 12
            }}
          >
            <option value="budget">Budget</option>
            <option value="mid">Mid</option>
            <option value="high">High-end</option>
          </select>
        )}

        {/* Material selector — shows for sqft-select */}
        {item.type === 'sqft-select' && (
          <select
            value={value.sel}
            onChange={handleSel}
            style={{
              padding: '4px 6px',
              border: '1px solid #ddd',
              borderRadius: 6,
              fontSize: 12,
              maxWidth: 130
            }}
          >
            {item.options.map(opt => (
              <option key={opt[0]} value={opt[0]}>{opt[1]}</option>
            ))}
          </select>
        )}

        {/* Quantity stepper — shows for qty */}
        {item.type === 'qty' && (
          <>
            <button
              onClick={() => handleQty(-1)}
              style={{
                width: 26,
                height: 26,
                border: '1px solid #ddd',
                borderRadius: 6,
                background: '#fff',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >-</button>
            <span style={{ fontSize: 14, fontWeight: 500, minWidth: 20, textAlign: 'center' }}>
              {value.qty}
            </span>
            <button
              onClick={() => handleQty(1)}
              style={{
                width: 26,
                height: 26,
                border: '1px solid #ddd',
                borderRadius: 6,
                background: '#fff',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >+</button>
            <span style={{ fontSize: 11, color: '#999', whiteSpace: 'nowrap' }}>
              {item.unit}
            </span>
          </>
        )}

      </div>
    </div>
  )
}