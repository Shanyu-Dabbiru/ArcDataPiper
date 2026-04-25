function Sidebar({
  vendorSchema = {},
  userSchema = {},
  schemasMatch = true,
  systemState = 'HEALTHY',
  onChangeSchema,
  onFixDrift,
  onReset,
}) {
  const vendorStr = JSON.stringify(vendorSchema, null, 2);
  const userStr = JSON.stringify(userSchema, null, 2);

  const isBroken = systemState === 'BROKEN' || systemState === 'HEALING' || systemState === 'DEGRADED';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', height: '100%' }}>
      {/* Upstream Vendor Schema */}
      <section>
        <h2 style={{
          margin: '0 0 16px',
          fontWeight: 800,
          fontSize: '1.6rem', /* Increased from 1.1rem */
          color: 'var(--text-title, #0f172a)',
          letterSpacing: '-0.02em',
        }}>
          Upstream vendor schema:
        </h2>
        <pre
          style={{
            margin: '0 0 24px',
            padding: '24px',
            borderRadius: '12px',
            border: schemasMatch
              ? '1px solid var(--slate-200, #e2e8f0)'
              : '2px solid var(--red-alert, #ef4444)',
            background: schemasMatch
              ? 'rgba(255, 255, 255, 0.65)'
              : 'rgba(239, 68, 68, 0.06)',
            color: 'var(--text-body, #334155)',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem', /* Increased from 0.78rem */
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            transition: 'border-color 0.3s, background 0.3s',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          {vendorStr}
        </pre>
        <button
          type="button"
          onClick={onChangeSchema}
          style={{
            width: '100%',
            border: '2px solid var(--slate-400, #94a3b8)',
            borderRadius: '10px',
            background: '#ffffff',
            color: 'var(--text-title, #0f172a)',
            padding: '16px 24px',
            fontWeight: 800,
            fontSize: '1.1rem', /* Increased from 0.9rem */
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Change Schema
        </button>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '2px solid var(--slate-200, #e2e8f0)', margin: 0 }} />

      {/* User Schema */}
      <section>
        <h2 style={{
          margin: '0 0 16px',
          fontWeight: 800,
          fontSize: '1.6rem', /* Increased from 1.1rem */
          color: 'var(--text-title, #0f172a)',
          letterSpacing: '-0.02em',
        }}>
          User Schema
        </h2>
        <pre
          style={{
            margin: '0 0 24px',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--slate-200, #e2e8f0)',
            background: 'rgba(255, 255, 255, 0.65)',
            color: 'var(--text-body, #334155)',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem', /* Increased from 0.78rem */
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          {userStr}
        </pre>

        {!schemasMatch && (
          <div style={{
            padding: '16px 20px',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#b91c1c',
            fontSize: '1.1rem',
            fontWeight: 700,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.4rem' }}>⚠</span> Schema mismatch detected
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isBroken && (
            <button
              type="button"
              onClick={onFixDrift}
              style={{
                width: '100%',
                border: 'none',
                borderRadius: '10px',
                background: 'var(--royal-blue-600, #2563eb)',
                color: '#ffffff',
                padding: '16px 24px',
                fontWeight: 800,
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
              }}
            >
              Fix Drift
            </button>
          )}
          <button
            type="button"
            onClick={onReset}
            style={{
              width: '100%',
              border: '2px solid var(--slate-300, #cbd5e1)',
              borderRadius: '10px',
              background: 'transparent',
              color: 'var(--text-muted)',
              padding: '12px 24px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Reset Demo
          </button>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
