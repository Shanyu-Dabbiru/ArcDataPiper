function EconomyPanel({
  total = 0,
  transactions = [],
  showAlert = false,
  alertText = 'Manual intervention required',
}) {
  return (
    <section
      className="panel-economy"
      style={{
        position: 'relative',
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
        gap: '18px',
        alignItems: 'start',
      }}
    >
      {showAlert && (
        <div className="alert-overlay" aria-live="polite">
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#fecaca',
              border: '1px solid rgba(248, 113, 113, 0.9)',
              borderRadius: '8px',
              padding: '7px 10px',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            Alert: {alertText}
          </div>
        </div>
      )}

      <div>
        <h2 style={{ margin: '0 0 10px' }}>Totalizer</h2>
        <div className="live-totalizer">${Number(total).toFixed(2)}</div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 10px' }}>Transaction Feed</h3>
        <div style={{ display: 'grid', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
          {transactions.map((tx, index) => (
            <div
              key={`${tx.id || tx.description || 'tx'}-${index}`}
              style={{
                fontFamily: 'var(--font-mono)',
                borderBottom: '1px dashed #2f3f56',
                paddingBottom: '6px',
                color: 'var(--text-muted)',
              }}
            >
              [{tx.agent || 'SYSTEM'}] ${Number(tx.cost || 0).toFixed(4)} - {tx.description || 'No details'}
            </div>
          ))}
          {transactions.length === 0 && (
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              No transactions yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default EconomyPanel;
