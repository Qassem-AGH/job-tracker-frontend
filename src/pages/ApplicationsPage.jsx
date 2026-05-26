import { useState, useEffect } from 'react';
import {
  getApplications, createApplication,
  updateApplication, deleteApplication
} from '../api/applicationApi';
import { getJobs } from '../api/jobApi';
import StatusBadge from '../components/StatusBadge';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

export default function ApplicationsPage() {
  const [apps, setApps]     = useState([]);
  const [jobs, setJobs]     = useState([]);
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobId, setJobId]   = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes]   = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const [a, j] = await Promise.all([getApplications(), getJobs()]);
      setApps(a); setJobs(j);
    } catch { setError('Could not load.'); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!jobId) return;
    try {
      await createApplication({ jobId: Number(jobId), status, notes });
      setJobId(''); setNotes(''); setStatus('Applied');
      load();
    } catch { setError('Could not create.'); }
  };

  const handleStatus = async (app, newStatus) => {
    try {
      await updateApplication(app.id, { id: app.id, status: newStatus, notes: app.notes });
      load();
    } catch { setError('Could not update status.'); }
  };

  const stats = STATUSES.map(s => ({
    label: s,
    count: apps.filter(a => a.status === s).length,
  }));

  if (loading) return <LoadingState />;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>

      <div style={{ marginBottom: 28 }}>
        <h1 className="page-title">📋 Applications</h1>
        <p className="page-sub">Track your job application progress</p>
      </div>

      {/* Stats row */}
      {apps.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
          {stats.map(s => (
            <div key={s.label} className="card" style={{ padding: '12px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{s.count}</p>
              <p style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 12 }}>
          ADD APPLICATION
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <select className="input" style={{ flex: 2, minWidth: 160 }}
            value={jobId} onChange={e => setJobId(e.target.value)}>
            <option value="">Select job *</option>
            {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
          <select className="input" style={{ flex: 1, minWidth: 130 }}
            value={status} onChange={e => setStatus(e.target.value)}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          <input className="input" style={{ flex: 2, minWidth: 140 }}
            placeholder="Notes" value={notes}
            onChange={e => setNotes(e.target.value)} />
          <button className="btn btn-primary" onClick={handleCreate}>+ Add</button>
        </div>
        {error && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 8 }}>{error}</p>}
      </div>

      {/* List */}
      {apps.length === 0
        ? <div className="empty-state">No applications yet. Add your first one above.</div>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {apps.map((a, i) => (
              <div key={a.id} className="card animate-in"
                style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
                  animationDelay: `${i * 40}ms` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{a.jobTitle}</p>
                    <StatusBadge status={a.status} />
                  </div>
                  <p style={{ color: 'var(--text2)', fontSize: 12 }}>
                    {a.notes && <span>{a.notes}</span>}
                    {a.appliedDate && (
                      <span style={{ color: 'var(--text3)', marginLeft: a.notes ? 8 : 0 }}>
                        {new Date(a.appliedDate).toLocaleDateString()}
                      </span>
                    )}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <select className="input" style={{ width: 'auto', fontSize: 12, padding: '5px 8px' }}
                    value={a.status}
                    onChange={e => handleStatus(a, e.target.value)}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <button className="btn btn-danger" style={{ padding: '5px 10px', fontSize: 12 }}
                    onClick={() => deleteApplication(a.id).then(load)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
      {[1,2,3].map(i => (
        <div key={i} style={{
          height: 68, borderRadius: 'var(--radius)',
          background: 'var(--bg3)', marginBottom: 10,
        }} />
      ))}
    </div>
  );
}
