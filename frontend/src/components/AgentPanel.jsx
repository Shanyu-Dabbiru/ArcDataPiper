const AGENT_DEFS = [
  { key: 'discovery', label: '🕵️ Discovery Agent' },
  { key: 'fixer', label: '🛠️ Fixer Agent' },
  { key: 'verifier', label: '🛡️ Verification Agent' },
];

const ACTIVE_STATUSES = new Set(['ANALYZING', 'PATCHING', 'AUDITING', 'DONE']);

function AgentPanel({ statuses = {} }) {
  return (
    <section className="panel-agents" style={{ padding: '16px' }}>
      <h2 style={{ margin: '0 0 14px', fontSize: '1rem' }}>Agent Panel</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        {AGENT_DEFS.map((agent) => {
          const rawStatus = String(statuses[agent.key] || 'IDLE').toUpperCase();
          const isActive = ACTIVE_STATUSES.has(rawStatus);

          return (
            <div
              key={agent.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: isActive ? '1px solid rgba(37, 99, 235, 0.5)' : '1px solid #233249',
                borderRadius: '9px',
                padding: '12px 14px',
                background: '#0b1423',
                boxShadow: isActive ? '0 0 16px rgba(37, 99, 235, 0.2)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{agent.label}</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.04em',
                  color: isActive ? '#39d98a' : 'var(--text-muted)',
                }}
              >
                {rawStatus}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AgentPanel;
