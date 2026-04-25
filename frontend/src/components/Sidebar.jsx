function Sidebar({
  upstreamSchema = '{ "type": "record", "fields": ["id", "amount", "currency"] }',
  userSchema = '{ "id": "string", "amount": "number", "currency": "string" }',
  onChangeSchema,
  onFixDrift,
}) {
  return (
    <aside
      style={{
        display: 'grid',
        gap: '20px',
        alignContent: 'start',
      }}
    >
      <section>
        <h2 style={{ margin: '0 0 10px', fontWeight: 800 }}>Upstream vendor schema</h2>
        <pre
          style={{
            margin: '0 0 12px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid var(--slate-200)',
            background: 'rgba(255, 255, 255, 0.65)',
            color: 'var(--text-body)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.45,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {upstreamSchema}
        </pre>
        <button
          type="button"
          onClick={onChangeSchema}
          style={{
            border: '1px solid var(--slate-400)',
            borderRadius: '10px',
            background: '#ffffff',
            color: 'var(--text-title)',
            padding: '10px 14px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Change Schema
        </button>
      </section>

      <section>
        <h2 style={{ margin: '0 0 10px', fontWeight: 800 }}>User Schema</h2>
        <pre
          style={{
            margin: '0 0 12px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid var(--slate-200)',
            background: 'rgba(255, 255, 255, 0.65)',
            color: 'var(--text-body)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.45,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {userSchema}
        </pre>
        <button
          type="button"
          onClick={onFixDrift}
          style={{
            border: 'none',
            borderRadius: '10px',
            background: 'var(--royal-blue-600)',
            color: '#ffffff',
            padding: '10px 14px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Fix Drift
        </button>
      </section>
    </aside>
  );
}

export default Sidebar;
