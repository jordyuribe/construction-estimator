export const SECTIONS = [
  {
    id: 'interior',
    name: 'Interior Remodel',
    items: [
      {
        id: 'bath',
        label: 'Bathroom remodel',
        type: 'sqft-finish',
        rates: { budget: [120, 175], mid: [175, 250], high: [280, 400] },
        defaultSqft: 80,
        unit: 'sq ft'
      },
      {
        id: 'bath-shower',
        label: 'Walk-in shower (tile)',
        type: 'checkbox',
        rates: [4500, 9000]
      },
      {
        id: 'bath-vanity',
        label: 'Vanity + fixtures',
        type: 'checkbox',
        rates: [1800, 4500]
      },
      {
        id: 'kitchen',
        label: 'Kitchen remodel',
        type: 'sqft-finish',
        rates: { budget: [150, 220], mid: [250, 380], high: [420, 600] },
        defaultSqft: 150,
        unit: 'sq ft'
      },
      {
        id: 'kit-appliances',
        label: 'New appliances',
        type: 'checkbox',
        rates: [4000, 10000]
      },
      {
        id: 'floor',
        label: 'Flooring',
        type: 'sqft-select',
        options: [
          ['lvp', 'LVP / vinyl plank', [8, 13]],
          ['hardwood', 'Hardwood', [18, 28]],
          ['tile', 'Tile', [16, 26]],
          ['carpet', 'Carpet', [6, 11]]
        ],
        defaultSqft: 400,
        unit: 'sq ft'
      },
      {
        id: 'paint-int',
        label: 'Interior painting',
        type: 'qty',
        unit: 'rooms',
        ratePerUnit: [900, 1500],
        defaultQty: 3
      },
      {
        id: 'drywall',
        label: 'Drywall repair / replacement',
        type: 'sqft',
        rates: [4, 8],
        defaultSqft: 200,
        unit: 'sq ft'
      },
      {
        id: 'elec',
        label: 'Electrical panel upgrade',
        type: 'checkbox',
        rates: [3500, 7000]
      },
      {
        id: 'plumb',
        label: 'Plumbing rough-in / reroute',
        type: 'checkbox',
        rates: [2500, 6000]
      },
      {
        id: 'basement',
        label: 'Basement finishing',
        type: 'sqft',
        rates: [80, 150],
        defaultSqft: 600,
        unit: 'sq ft'
      }
    ]
  },
  {
    id: 'exterior',
    name: 'Exterior Construction',
    items: [
      {
        id: 'deck',
        label: 'Deck build / replace',
        type: 'sqft-select',
        options: [
          ['pressure', 'Pressure-treated wood', [55, 80]],
          ['composite', 'Composite (Trex)', [90, 130]],
          ['cedar', 'Cedar', [70, 100]]
        ],
        defaultSqft: 200,
        unit: 'sq ft'
      },
      {
        id: 'fence',
        label: 'Fence installation',
        type: 'sqft-select',
        options: [
          ['wood', 'Wood', [28, 45]],
          ['vinyl', 'Vinyl', [35, 55]],
          ['chain', 'Chain link', [18, 32]]
        ],
        defaultSqft: 150,
        unit: 'linear ft'
      },
      {
        id: 'roof',
        label: 'Roof replacement',
        type: 'sqft',
        rates: [9, 16],
        defaultSqft: 1800,
        unit: 'sq ft'
      },
      {
        id: 'siding',
        label: 'Siding replacement',
        type: 'sqft-select',
        options: [
          ['hardie', 'Hardie board', [10, 18]],
          ['vinyl', 'Vinyl', [7, 13]],
          ['wood', 'Wood', [14, 22]]
        ],
        defaultSqft: 1500,
        unit: 'sq ft'
      },
      {
        id: 'windows',
        label: 'Window replacement',
        type: 'qty',
        unit: 'windows',
        ratePerUnit: [700, 1400],
        defaultQty: 5
      },
      {
        id: 'door-ext',
        label: 'Exterior door replacement',
        type: 'qty',
        unit: 'doors',
        ratePerUnit: [1200, 2800],
        defaultQty: 1
      },
      {
        id: 'garage',
        label: 'Garage door replacement',
        type: 'qty',
        unit: 'doors',
        ratePerUnit: [1500, 3500],
        defaultQty: 1
      },
      {
        id: 'driveway',
        label: 'Driveway (concrete)',
        type: 'sqft',
        rates: [10, 18],
        defaultSqft: 600,
        unit: 'sq ft'
      },
      {
        id: 'patio',
        label: 'Patio (concrete / pavers)',
        type: 'sqft',
        rates: [15, 30],
        defaultSqft: 300,
        unit: 'sq ft'
      },
      {
        id: 'gutter',
        label: 'Gutter replacement',
        type: 'sqft',
        rates: [8, 14],
        defaultSqft: 180,
        unit: 'linear ft'
      }
    ]
  },
  {
    id: 'paint-ext',
    name: 'Exterior Painting',
    items: [
      {
        id: 'paint-house',
        label: 'Exterior house painting',
        type: 'sqft',
        rates: [3, 7],
        defaultSqft: 2000,
        unit: 'sq ft'
      },
      {
        id: 'paint-deck',
        label: 'Deck stain / seal',
        type: 'sqft',
        rates: [2, 4],
        defaultSqft: 200,
        unit: 'sq ft'
      },
      {
        id: 'paint-fence',
        label: 'Fence stain / paint',
        type: 'sqft',
        rates: [1.5, 3],
        defaultSqft: 200,
        unit: 'linear ft'
      },
      {
        id: 'epoxy',
        label: 'Garage floor epoxy coat',
        type: 'sqft',
        rates: [4, 8],
        defaultSqft: 400,
        unit: 'sq ft'
      },
      {
        id: 'power-wash',
        label: 'Pressure washing',
        type: 'checkbox',
        rates: [350, 700]
      }
    ]
  },
  {
    id: 'maintenance',
    name: 'Maintenance & Repairs',
    items: [
      {
        id: 'doorknobs',
        label: 'Door knob / handle replacement',
        type: 'qty',
        unit: 'doors',
        ratePerUnit: [80, 180],
        defaultQty: 4
      },
      {
        id: 'deadbolts',
        label: 'Deadbolt installation',
        type: 'qty',
        unit: 'locks',
        ratePerUnit: [120, 250],
        defaultQty: 2
      },
      {
        id: 'outlets',
        label: 'Outlet / switch replacement',
        type: 'qty',
        unit: 'outlets',
        ratePerUnit: [80, 150],
        defaultQty: 6
      },
      {
        id: 'light-fix',
        label: 'Light fixture replacement',
        type: 'qty',
        unit: 'fixtures',
        ratePerUnit: [150, 350],
        defaultQty: 4
      },
      {
        id: 'faucets',
        label: 'Faucet replacement',
        type: 'qty',
        unit: 'faucets',
        ratePerUnit: [200, 450],
        defaultQty: 2
      },
      {
        id: 'toilet',
        label: 'Toilet replacement',
        type: 'qty',
        unit: 'toilets',
        ratePerUnit: [350, 750],
        defaultQty: 1
      },
      {
        id: 'water-heater',
        label: 'Water heater replacement',
        type: 'checkbox',
        rates: [1400, 3200]
      },
      {
        id: 'insulation',
        label: 'Attic insulation',
        type: 'sqft',
        rates: [2, 5],
        defaultSqft: 1000,
        unit: 'sq ft'
      },
      {
        id: 'hvac-tune',
        label: 'HVAC tune-up / service',
        type: 'checkbox',
        rates: [180, 350]
      },
      {
        id: 'hvac-replace',
        label: 'HVAC system replacement',
        type: 'checkbox',
        rates: [8000, 18000]
      },
      {
        id: 'crawlspace',
        label: 'Crawlspace encapsulation',
        type: 'checkbox',
        rates: [4000, 9000]
      },
      {
        id: 'smoke',
        label: 'Smoke / CO detector install',
        type: 'qty',
        unit: 'units',
        ratePerUnit: [80, 150],
        defaultQty: 4
      }
    ]
  }
]