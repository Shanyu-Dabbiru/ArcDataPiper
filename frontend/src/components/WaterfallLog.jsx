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

function WaterfallLog({ records = DEFAULT_RECORDS, maxHeight = 320 }) {
  return (
    <section className="panel-waterfall" style={{ padding: '16px', minHeight: '220px' }}>
      <h2 style={{ margin: '0 0 12px' }}>Waterfall Log</h2>
      <div
        style={{
          border: '1px solid #1f2a3d',
          borderRadius: '10px',
          padding: '10px',
          maxHeight,
          overflowY: 'auto',
          background: '#090f1b',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          lineHeight: 1.45,
        }}
      >
        {records.map((record, index) => {
          const isMatch = String(record.status).toUpperCase() === 'OK';
          return (
            <article
              key={`${record.timestamp}-${index}`}
              style={{
                padding: '8px 0',
                borderBottom: '1px solid #192538',
                color: '#dbe6f8',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ opacity: 0.72 }}>{record.timestamp}</span>
                <span
                  style={{
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    background: isMatch ? 'rgba(16, 185, 129, 0.22)' : 'rgba(239, 68, 68, 0.24)',
                    color: isMatch ? '#39d98a' : '#ff7f7f',
                  }}
                >
                  [{isMatch ? 'OK' : 'MISMATCH'}]
                </span>
              </div>
              <div>{JSON.stringify(record.payload)}</div>
            </article>
          );
        })}
        {records.length === 0 && <div style={{ color: 'var(--text-muted)' }}>No records yet.</div>}
      </div>
    </section>
  );
}

export default WaterfallLog;
