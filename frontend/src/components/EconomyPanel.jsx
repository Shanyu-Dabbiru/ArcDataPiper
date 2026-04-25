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
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minHeight: '400px',
        overflow: 'hidden'
      }}
    >
      {showAlert && (
        <div className="alert-overlay" aria-live="polite">
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(225, 29, 72, 0.95)',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '24px 32px',
              fontWeight: 800,
              fontSize: '1.2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center',
              width: '80%',
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Alert</div>
            {alertText}
          </div>
        </div>
      )}

      {/* Totalizer Section */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '16px' }}>
        <h2 style={{ 
          margin: '0 0 12px', 
          fontSize: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          color: 'var(--text-muted)' 
        }}>
          Live Totalizer
        </h2>
        <div className={`live-totalizer ${total > 0 ? 'live-totalizer-pulse' : ''}`} key={total} style={{ fontSize: '4rem' }}>
          ${Number(total).toFixed(4)}
        </div>
      </div>

      {/* Transaction Feed Section */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <h3 style={{ 
          margin: '0 0 16px', 
          fontSize: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          color: 'var(--text-muted)' 
        }}>
          Transaction Feed
        </h3>
        <div style={{ 
          display: 'grid', 
          gap: '10px', 
          overflowY: 'auto',
          paddingRight: '6px'
        }}>
          {transactions.map((tx, index) => (
            <div
              key={`${tx.id || tx.description || 'tx'}-${index}`}
              style={{
                fontFamily: 'var(--font-mono)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                paddingBottom: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ color: 'var(--emerald-500)', fontWeight: 700, fontSize: '0.8rem' }}>{tx.agent || 'SYSTEM'}</span>
                <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>{new Date(tx.timestamp || Date.now()).toLocaleTimeString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>{tx.description || 'No details'}</span>
                <span style={{ color: 'var(--emerald-500)', fontWeight: 800 }}>+${Number(tx.cost || 0).toFixed(4)}</span>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', opacity: 0.4, fontSize: '0.8rem' }}>
              Waiting for stream activity...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default EconomyPanel;
