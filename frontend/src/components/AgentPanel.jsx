const AGENT_DEFS = [
  { key: 'discovery', label: 'Discovery Agent' },
  { key: 'fixer', label: 'Fixer Agent' },
  { key: 'verification', label: 'Verification Agent' },
];

function AgentPanel({ statuses = {} }) {
  return (
    <section className="panel-agents" style={{ padding: '16px' }}>
      <h2 style={{ margin: '0 0 12px' }}>Agent Panel</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        {AGENT_DEFS.map((agent) => {
          const rawState = String(statuses[agent.key] || 'IDLE').toUpperCase();
          const state = rawState === 'ACTIVE' ? 'ACTIVE' : 'IDLE';
          const isActive = state === 'ACTIVE';

          return (
            <div
              key={agent.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #233249',
                borderRadius: '9px',
                padding: '10px 12px',
                background: '#0b1423',
              }}
            >
              <span style={{ fontWeight: 600 }}>{agent.label}</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: isActive ? '#39d98a' : 'var(--text-muted)',
                }}
              >
                {state}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AgentPanel;
