// FILE: src/components/USMap.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import geoData from 'us-atlas/states-10m.json';

// ─── Data ──────────────────────────────────────────────────────────────────────

const LICENSED_STATES = [
  'AL','AZ','CA','CO','DC','FL','GA','ID','IL','IA',
  'MD','MI','MN','NV','NC','OH','OR','PA','TN','TX',
  'UT','VA','WA','WI',
];

const LICENSE_NUMBERS = {
  AL: '#1708856', AZ: '#0951179', CA: 'DRE #02058287 / DFPI #60DBO99712', CO: '',
  DC: '#MLB1708856', FL: '#MLD2608', GA: '#71319', ID: '#MBL-2081708856',
  IL: '#MB.6850225', IA: '#2023-0138', MD: '#1708856', MI: '#FL0022770 / SR0024602',
  MN: '#MN-MO-1708856', NV: '#5570', NC: '#B-190746', OH: '#RM.804604.000',
  OR: '', PA: '#76238', TN: '', TX: '', UT: '#10993905',
  VA: '#MC-8002', WA: '#CL-1708856', WI: '',
};

// FIPS code → state abbreviation
const FIPS_TO_ABBR = {
  '01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT',
  '10':'DE','11':'DC','12':'FL','13':'GA','15':'HI','16':'ID','17':'IL',
  '18':'IN','19':'IA','20':'KS','21':'KY','22':'LA','23':'ME','24':'MD',
  '25':'MA','26':'MI','27':'MN','28':'MS','29':'MO','30':'MT','31':'NE',
  '32':'NV','33':'NH','34':'NJ','35':'NM','36':'NY','37':'NC','38':'ND',
  '39':'OH','40':'OK','41':'OR','42':'PA','44':'RI','45':'SC','46':'SD',
  '47':'TN','48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV',
  '55':'WI','56':'WY',
};

const STATE_NAMES = {
  AL:'Alabama', AK:'Alaska', AZ:'Arizona', AR:'Arkansas', CA:'California',
  CO:'Colorado', CT:'Connecticut', DE:'Delaware', DC:'Washington D.C.',
  FL:'Florida', GA:'Georgia', HI:'Hawaii', ID:'Idaho', IL:'Illinois',
  IN:'Indiana', IA:'Iowa', KS:'Kansas', KY:'Kentucky', LA:'Louisiana',
  ME:'Maine', MD:'Maryland', MA:'Massachusetts', MI:'Michigan', MN:'Minnesota',
  MS:'Mississippi', MO:'Missouri', MT:'Montana', NE:'Nebraska', NV:'Nevada',
  NH:'New Hampshire', NJ:'New Jersey', NM:'New Mexico', NY:'New York',
  NC:'North Carolina', ND:'North Dakota', OH:'Ohio', OK:'Oklahoma', OR:'Oregon',
  PA:'Pennsylvania', RI:'Rhode Island', SC:'South Carolina', SD:'South Dakota',
  TN:'Tennessee', TX:'Texas', UT:'Utah', VT:'Vermont', VA:'Virginia',
  WA:'Washington', WV:'West Virginia', WI:'Wisconsin', WY:'Wyoming',
};

// Approximate geographic centers [lng, lat] — skip tiny NE states that won't fit a label
const STATE_CENTERS = {
  AL: [-86.79, 32.79],   AK: [-153.37, 64.2],   AZ: [-111.43, 34.05],
  AR: [-92.37, 34.97],   CA: [-119.42, 37.25],   CO: [-105.31, 39.02],
  CT: [-72.65, 41.60],   DE: [-75.51, 38.99],    DC: [-77.04, 38.91],
  FL: [-81.69, 27.77],   GA: [-83.44, 32.17],    HI: [-156.5, 20.3],
  ID: [-114.48, 44.24],  IL: [-88.99, 40.35],    IN: [-86.26, 39.85],
  IA: [-93.21, 42.01],   KS: [-98.27, 38.53],    KY: [-84.67, 37.67],
  LA: [-91.96, 31.17],   ME: [-69.38, 44.69],    MD: [-76.64, 39.06],
  MA: [-71.38, 42.23],   MI: [-84.54, 43.33],    MN: [-93.90, 45.69],
  MS: [-89.68, 32.74],   MO: [-92.30, 38.46],    MT: [-110.45, 46.92],
  NE: [-99.90, 41.49],   NV: [-116.42, 38.31],   NH: [-71.57, 43.45],
  NJ: [-74.52, 40.30],   NM: [-106.25, 34.84],   NY: [-75.50, 42.94],
  NC: [-79.81, 35.56],   ND: [-100.47, 47.53],   OH: [-82.76, 40.39],
  OK: [-97.09, 35.57],   OR: [-120.55, 43.94],   PA: [-77.19, 40.59],
  RI: [-71.48, 41.68],   SC: [-80.95, 33.86],    SD: [-99.44, 44.30],
  TN: [-86.58, 35.75],   TX: [-98.52, 31.05],    UT: [-111.09, 39.32],
  VT: [-72.71, 44.05],   VA: [-78.17, 37.77],    WA: [-120.74, 47.40],
  WV: [-80.95, 38.47],   WI: [-89.62, 44.27],    WY: [-107.55, 43.08],
};

// States too small to label cleanly on the map
const SKIP_LABEL = new Set(['CT','DE','DC','MA','NH','NJ','RI','VT','MD']);

// ─── Component ─────────────────────────────────────────────────────────────────

export default function USMap({ showHeader = true }) {
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const isLicensed = (abbr) => LICENSED_STATES.includes(abbr);

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');
        .badge-pill { transition: transform 0.2s, box-shadow 0.2s; }
        .badge-pill:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(198,167,111,0.3); }
      `}</style>

      <section style={{ background: '#1A3E61', padding: '80px 20px', fontFamily: 'Nunito, sans-serif', position: 'relative', overflow: 'hidden' }}>

        {/* Background grain */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

          {/* Headline */}
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', marginBottom: 48 }}
            >
              <h2 style={{ fontFamily: 'EB Garamond, serif', fontSize: 'clamp(28px,4vw,48px)', color: '#fff', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: 12 }}>
                Licensed Across America
              </h2>
              <p style={{ fontFamily: 'Nunito, sans-serif', color: '#C6A76F', fontSize: 20, fontWeight: 700, letterSpacing: '0.04em' }}>
                20+ States and Growing
              </p>
            </motion.div>
          )}

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: '#0F1C2E',
              borderRadius: 16,
              padding: '20px 10px',
              marginBottom: 48,
              boxShadow: '0 4px 32px rgba(15,28,46,0.5)',
              position: 'relative',
            }}
            onMouseMove={handleMouseMove}
          >
            <ComposableMap
              projection="geoAlbersUsa"
              projectionConfig={{ scale: 900 }}
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map((geo, idx) => {
                    const fips = geo.id?.toString().padStart(2, '0') || geo.properties?.STATE;
                    const abbr = FIPS_TO_ABBR[fips] || '';
                    const licensed = isLicensed(abbr);
                    const licIdx = LICENSED_STATES.indexOf(abbr);

                    return (
                      <motion.g key={geo.rsmKey || idx}>
                        <Geography
                          geography={geo}
                          fill={licensed ? '#C6A76F' : '#1A3E61'}
                          stroke={licensed ? 'rgba(198,167,111,0.6)' : 'rgba(198,167,111,0.15)'}
                          strokeWidth={licensed ? 1.5 : 0.7}
                          style={{
                            default: {
                              outline: 'none',
                              filter: licensed ? 'drop-shadow(0 0 5px rgba(198,167,111,0.5))' : 'none',
                              transition: 'fill 0.3s ease',
                            },
                            hover: {
                              outline: 'none',
                              fill: licensed ? '#d4b87a' : '#243e5c',
                              cursor: 'pointer',
                              filter: licensed ? 'drop-shadow(0 0 8px rgba(198,167,111,0.8))' : 'none',
                            },
                            pressed: { outline: 'none' },
                          }}
                          onMouseEnter={() => abbr && setTooltip(abbr)}
                          onMouseLeave={() => setTooltip(null)}
                        />
                      </motion.g>
                    );
                  })
                }
              </Geographies>

              {/* State abbreviation labels */}
              {Object.entries(STATE_CENTERS).map(([abbr, coords]) => {
                if (SKIP_LABEL.has(abbr)) return null;
                const licensed = isLicensed(abbr);
                return (
                  <Marker key={`label-${abbr}`} coordinates={coords}>
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: abbr === 'AK' || abbr === 'HI' ? '7px' : '9px',
                        fontWeight: 800,
                        fill: licensed ? '#0F1C2E' : 'rgba(198,167,111,0.45)',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {abbr}
                    </text>
                  </Marker>
                );
              })}
            </ComposableMap>

            {/* Tooltip */}
            {tooltip && (
              <div
                style={{
                  position: 'fixed',
                  left: tooltipPos.x + 14,
                  top: tooltipPos.y - 60,
                  background: '#0F1C2E',
                  border: '1.5px solid #C6A76F',
                  borderRadius: 8,
                  padding: '10px 14px',
                  pointerEvents: 'none',
                  zIndex: 9999,
                  minWidth: 160,
                  boxShadow: '0 8px 24px rgba(15,28,46,0.5)',
                }}
              >
                <p style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 16, fontWeight: 600, marginBottom: 3 }}>
                  {STATE_NAMES[tooltip] || tooltip}
                </p>
                {isLicensed(tooltip) ? (
                  <>
                    <p style={{ fontFamily: 'Nunito, sans-serif', color: '#C6A76F', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 2 }}>
                      Licensed ✓
                    </p>
                    {LICENSE_NUMBERS[tooltip] && (
                      <p style={{ fontFamily: 'Nunito, sans-serif', color: '#F0E6D2', fontSize: 12 }}>
                        {LICENSE_NUMBERS[tooltip]}
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(240,230,210,0.5)', fontSize: 12 }}>
                    Not currently licensed
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 20, height: 14, background: '#C6A76F', borderRadius: 3, boxShadow: '0 0 8px rgba(198,167,111,0.5)' }} />
              <span style={{ fontFamily: 'Nunito, sans-serif', color: '#F0E6D2', fontSize: 14, fontWeight: 600 }}>Licensed State</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 20, height: 14, background: '#1A3E61', border: '1px solid rgba(198,167,111,0.2)', borderRadius: 3 }} />
              <span style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(240,230,210,0.5)', fontSize: 14 }}>Not Licensed</span>
            </div>
          </div>

          {/* State Badges Grid */}
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}
            className="state-badge-grid"
          >
            {LICENSED_STATES.map((code, i) => {
              const license = LICENSE_NUMBERS[code];
              return (
                <motion.div
                  key={code}
                  className="badge-pill"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    border: '1.5px solid #C6A76F',
                    borderRadius: 40,
                    padding: '10px 14px',
                    textAlign: 'center',
                    background: 'rgba(198,167,111,0.05)',
                    cursor: 'default',
                  }}
                >
                  <p style={{ fontFamily: 'Nunito, sans-serif', color: '#C6A76F', fontWeight: 800, fontSize: 15, marginBottom: license ? 3 : 0, lineHeight: 1 }}>
                    {code}
                  </p>
                  {license && (
                    <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(240,230,210,0.6)', fontSize: 10, lineHeight: 1.3, wordBreak: 'break-all' }}>
                      {license}
                    </p>
                  )}
                  <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(240,230,210,0.4)', fontSize: 10, marginTop: 2, lineHeight: 1 }}>
                    {STATE_NAMES[code]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .state-badge-grid { grid-template-columns: repeat(4, 1fr) !important; } }
          @media (max-width: 600px) { .state-badge-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        `}</style>
      </section>
    </>
  );
}
