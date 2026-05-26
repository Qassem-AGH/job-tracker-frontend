import { useState, useEffect } from 'react';
import { getJobs, createJob, deleteJob } from '../api/jobApi';
import { getCompanies } from '../api/companyApi';

export default function JobsPage() {
  const [jobs, setJobs]           = useState([]);
  const [companies, setCompanies] = useState([]);
  const [error, setError]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [title, setTitle]         = useState('');
  const [desc, setDesc]           = useState('');
  const [companyId, setCompanyId] = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const [j, c] = await Promise.all([getJobs(), getCompanies()]);
      setJobs(j); setCompanies(c);
    } catch { setError('Could not load data.'); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!title.trim() || !companyId) return;
    try {
      await createJob({ title, description: desc, companyId: Number(companyId) });
      setTitle(''); setDesc(''); setCompanyId('');
      load();
    } catch { setError('Could not create job.'); }
  };

  if (loading) return <LoadingState />;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>

      <div style={{ marginBottom: 28 }}>
        <h1 className="page-title">💼 Jobs</h1>
        <p className="page-sub">Track job positions across companies</p>
      </div>

      {/* Add form */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 12 }}>
          ADD JOB
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input className="input" style={{ flex: 2, minWidth: 140 }}
            placeholder="Job title *" value={title}
            onChange={e => setTitle(e.target.value)} />
          <input className="input" style={{ flex: 2, minWidth: 140 }}
            placeholder="Description" value={desc}
            onChange={e => setDesc(e.target.value)} />
          <select className="input" style={{ flex: 1, minWidth: 140 }}
            value={companyId} onChange={e => setCompanyId(e.target.value)}>
            <option value="">Select company *</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleCreate}>+ Add</button>
        </div>
        {error && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 8 }}>{error}</p>}
      </div>

      {/* List */}
      {jobs.length === 0
        ? <div className="empty-state">No jobs yet. Add your first one above.</div>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {jobs.map((j, i) => (
              <div key={j.id} className="card animate-in"
                style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
                  animationDelay: `${i * 40}ms` }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>💼</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{j.title}</p>
                  <p style={{ color: 'var(--text2)', fontSize: 12, marginTop: 2 }}>
                    {j.companyName && (
                      <span style={{
                        background: 'var(--bg3)', border: '1px solid var(--border)',
                        borderRadius: 6, padding: '1px 7px', fontSize: 11,
                      }}>🏢 {j.companyName}</span>
                    )}
                    {j.description && (
                      <span style={{ marginLeft: 8, color: 'var(--text3)' }}>{j.description}</span>
                    )}
                  </p>
                </div>
                <button className="btn btn-danger" style={{ padding: '5px 10px', fontSize: 12 }}
                  onClick={() => deleteJob(j.id).then(load)}>
                  Delete
                </button>
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
