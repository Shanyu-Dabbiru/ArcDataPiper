import { useEffect, useRef, useState } from 'react';
import { Workflow } from 'lucide-react';

import './App.css';
import Sidebar from './components/Sidebar';
import WaterfallLog from './components/WaterfallLog';
import AgentPanel from './components/AgentPanel';
import EconomyPanel from './components/EconomyPanel';

const MAX_LEDGER_ENTRIES = 30;
const MAX_WATERFALL_RECORDS = 40;

const V1_SCHEMA = { id: 'string', total_price: 'number' };
const V2_SCHEMA = { id: 'string', price: { amount: 'number', currency: 'string' } };

const toTimeString = (isoString) => {
  if (!isoString) return new Date().toLocaleTimeString();
  const parsed = new Date(isoString);
  if (Number.isNaN(parsed.getTime())) return String(isoString);
  return parsed.toLocaleTimeString();
};

function App() {
  const [systemState, setSystemState] = useState('HEALTHY');
  const [agents, setAgents] = useState({ discovery: 'IDLE', fixer: 'IDLE', verifier: 'IDLE' });
  const [waterfallRecords, setWaterfallRecords] = useState([]);
  const [economyFeed, setEconomyFeed] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [vendorSchema, setVendorSchema] = useState(V1_SCHEMA);
  const [countdown, setCountdown] = useState(null);
  const fixTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const userSchema = V1_SCHEMA; // Buyer always expects v1

  const clearFixTimeout = () => {
    if (fixTimeoutRef.current) {
      clearTimeout(fixTimeoutRef.current);
      fixTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdown(null);
  };

  const startFixCountdown = () => {
    if (fixTimeoutRef.current) return; // Already counting

    setAlertVisible(true);
    setCountdown(5);
    setAlertText('Stopped proof of health payment — trying fix in 5s');

    let remaining = 5;
    countdownIntervalRef.current = setInterval(() => {
      remaining--;
      if (remaining > 0) {
        setCountdown(remaining);
        setAlertText(`Stopped proof of health payment — trying fix in ${remaining}s`);
      } else {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
        setAlertText('Initiating autonomous repair...');
        setCountdown(0);
      }
    }, 1000);

    fixTimeoutRef.current = setTimeout(async () => {
      try {
        await fetch('/api/internal/authorize-fix', { method: 'POST' });
      } catch (error) {
        console.error('Failed to auto-authorize recovery team', error);
      } finally {
        fixTimeoutRef.current = null;
      }
    }, 5000);
  };

  // Button handlers
  const triggerSchemaDrift = async () => {
    try {
      await fetch('http://localhost:3003/api/producer/chaos', { method: 'POST' });
    } catch (error) {
      console.error('Failed to trigger chaos event', error);
    }
  };

  const triggerFixDrift = async () => {
    try {
      await fetch('/api/internal/authorize-fix', { method: 'POST' });
    } catch (error) {
      console.error('Failed to authorize fix', error);
    }
  };

  const resetDemo = async () => {
    try {
      await fetch('/api/internal/reset-demo', { method: 'POST' });
      setVendorSchema(V1_SCHEMA);
      setAlertVisible(false);
      clearFixTimeout();
    } catch (error) {
      console.error('Failed to reset demo', error);
    }
  };

  useEffect(() => {
    const es = new EventSource('/api/stream');

    es.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        switch (payload.type) {
          case 'ledger_entry':
            setEconomyFeed((prev) => [payload, ...prev].slice(0, MAX_LEDGER_ENTRIES));
            if (payload.cost) {
              setTotalRevenue((prev) => prev + Number(payload.cost));
            }
            break;

          case 'heartbeat':
            setWaterfallRecords((prev) => {
              const nextEntry = {
                timestamp: toTimeString(payload.timestamp),
                status: 'OK',
                payload: payload.record,
              };
              return [nextEntry, ...prev].slice(0, MAX_WATERFALL_RECORDS);
            });
            break;

          case 'drift_detected':
            setWaterfallRecords((prev) => {
              const nextEntry = {
                timestamp: toTimeString(payload.timestamp),
                status: 'MISMATCH',
                payload: payload.record,
              };
              return [nextEntry, ...prev].slice(0, MAX_WATERFALL_RECORDS);
            });
            // Show the drifted schema
            if (payload.record) {
              const keys = Object.keys(payload.record);
              const schemaShape = {};
              keys.forEach((k) => {
                const val = payload.record[k];
                schemaShape[k] = typeof val === 'object' && val !== null
                  ? Object.fromEntries(Object.entries(val).map(([sk, sv]) => [sk, typeof sv]))
                  : typeof val;
              });
              setVendorSchema(schemaShape);
            }
            break;

          case 'system_state':
            setSystemState(payload.state);
            if (payload.state === 'BROKEN') {
              startFixCountdown();
            }
            if (payload.state === 'HEALTHY') {
              clearFixTimeout();
              setAlertVisible(false);
              setVendorSchema(V1_SCHEMA);
            }
            break;

          case 'agent_status':
            setAgents((prev) => ({ ...prev, [payload.agent]: payload.status }));
            break;

          default:
            break;
        }
      } catch (err) {
        console.error('Failed to parse SSE message', err);
      }
    };

    return () => {
      clearFixTimeout();
      es.close();
    };
  }, []);

  // Determine if schemas match
  const schemasMatch = JSON.stringify(vendorSchema) === JSON.stringify(userSchema);

  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <header style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '12px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              background: 'linear-gradient(135deg, var(--royal-blue-600) 0%, #06b6d4 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 24px -6px rgba(37, 99, 235, 0.4)',
              color: '#ffffff'
            }}>
              <Workflow size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h1 style={{ 
                fontSize: '2.8rem', 
                fontWeight: 900, 
                letterSpacing: '-0.05em', 
                margin: 0,
                color: 'var(--text-title)',
                lineHeight: 1
              }}>
                Arc Data Piper
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  background: 'var(--slate-800)', 
                  color: 'var(--slate-200)',
                  padding: '3px 10px',
                  borderRadius: '99px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}>
                  v2.4.0-Agentic
                </span>
                <span style={{ 
                  color: 'var(--emerald-500)', 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ 
                    width: '6px', 
                    height: '6px', 
                    background: 'var(--emerald-500)', 
                    borderRadius: '50%',
                    display: 'inline-block',
                    boxShadow: '0 0 8px var(--emerald-500)'
                  }} /> 
                  Live Stream Active
                </span>
              </div>
            </div>
          </div>
          <p style={{ 
            opacity: 0.6, 
            fontSize: '1.1rem', 
            fontWeight: 500,
            color: 'var(--text-body)',
            marginTop: '24px',
            borderLeft: '3px solid var(--royal-blue-500)',
            paddingLeft: '16px',
            lineHeight: 1.4
          }}>
            Self-healing autonomous data pipelines.<br/>
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Real-time schema drift recovery & nanopayment settlement.</span>
          </p>
        </header>

        <Sidebar

          vendorSchema={vendorSchema}
          userSchema={userSchema}
          schemasMatch={schemasMatch}
          systemState={systemState}
          onChangeSchema={triggerSchemaDrift}
          onFixDrift={triggerFixDrift}
          onReset={resetDemo}
        />
      </aside>
      <main className="app-main">
        <div className="app-main-top">
          <WaterfallLog records={waterfallRecords} />
        </div>
        <div className="app-main-bottom">
          <AgentPanel statuses={agents} />
          <EconomyPanel
            total={totalRevenue}
            transactions={economyFeed}
            showAlert={alertVisible}
            alertText={alertText}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
