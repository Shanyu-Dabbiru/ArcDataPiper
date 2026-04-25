const DEFAULT_RECORDS = [
  {
    timestamp: '12:40:02',
    status: 'OK',
    payload: { orderId: 'ORD-4829', amount: 19.95, currency: 'USD', region: 'us-east' },
  },
  {
    timestamp: '12:40:08',
    status: 'MISMATCH',
    payload: { orderId: 'ORD-4830', amount: '19.95', currencyCode: 'USD', region: 'eu-west' },
  },
];

function WaterfallLog({ records = DEFAULT_RECORDS, maxHeight = 340 }) {
  return (
    <section className="panel-waterfall" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ 
        margin: '0 0 16px', 
        fontSize: '0.9rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em', 
        color: 'var(--text-muted)' 
      }}>
        Waterfall Log
      </h2>
      <div
        style={{
          flex: 1,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '16px',
          maxHeight,
          overflowY: 'auto',
          background: '#04070e',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          lineHeight: 1.5,
        }}
      >
        {records.map((record, index) => {
          const isMatch = String(record.status).toUpperCase() === 'OK';
          return (
            <article
              key={`${record.timestamp}-${index}`}
              style={{
                padding: '10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                color: '#e2e8f0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ opacity: 0.5, fontSize: '0.75rem' }}>{record.timestamp}</span>
                <span
                  style={{
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    padding: '1px 6px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    background: isMatch ? 'rgba(16, 185, 129, 0.15)' : 'rgba(225, 29, 72, 0.2)',
                    color: isMatch ? '#10b981' : '#f43f5e',
                    border: `1px solid ${isMatch ? 'rgba(16, 185, 129, 0.3)' : 'rgba(225, 29, 72, 0.3)'}`
                  }}
                >
                  {isMatch ? 'OK' : 'MISMATCH'}
                </span>
              </div>
              <div style={{ wordBreak: 'break-all', opacity: 0.9 }}>{JSON.stringify(record.payload)}</div>
            </article>
          );
        })}
        {records.length === 0 && (
          <div style={{ color: 'var(--text-muted)', opacity: 0.4, fontStyle: 'italic' }}>
            Listening for upstream data...
          </div>
        )}
      </div>
    </section>
  );
}

export default WaterfallLog;
