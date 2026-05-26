import { useState, useEffect } from 'react';
import { getCompanies, createCompany, deleteCompany } from '../api/companyApi';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [name, setName]           = useState('');
  const [industry, setIndustry]   = useState('');
  const [website, setWebsite]     = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setCompanies(await getCompanies()); }
    catch { setError('Could not load companies.'); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createCompany({ name, industry, website });
      setName(''); setIndustry(''); setWebsite('');
      load();
    } catch { setError('Could not create.'); }
  };

  const handleDelete = async (id) => {
    try { await deleteCompany(id); load(); }
    catch { setError('Could not delete.'); }
  };

  if (loading) return <LoadingState />;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>

      <div style={{ marginBottom: 28 }}>
        <h1 className="page-title">🏢 Companies</h1>
        <p className="page-sub">Manage the companies you are tracking</p>
      </div>

      {/* Add form */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 12 }}>
          ADD COMPANY
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input className="input" style={{ flex: 2, minWidth: 140 }}
            placeholder="Company name *" value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()} />
          <input className="input" style={{ flex: 2, minWidth: 120 }}
            placeholder="Industry" value={industry}
            onChange={e => setIndustry(e.target.value)} />
          <input className="input" style={{ flex: 2, minWidth: 120 }}
            placeholder="Website" value={website}
            onChange={e => setWebsite(e.target.value)} />
          <button className="btn btn-primary" onClick={handleCreate}>
            + Add
          </button>
        </div>
        {error && <p style={{ color: 'var(--danger)', fontSize: 12, marginTop: 8 }}>{error}</p>}
      </div>

      {/* List */}
      {companies.length === 0
        ? <div className="empty-state">No companies yet. Add your first one above.</div>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {companies.map((c, i) => (
              <div key={c.id} className="card animate-in"
                style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
                  animationDelay: `${i * 40}ms` }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: `hsl(${(c.id * 47) % 360} 70% 92%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700,
                  color: `hsl(${(c.id * 47) % 360} 60% 35%)`,
                }}>
                  {c.name?.[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{c.name}</p>
                  <p style={{ color: 'var(--text2)', fontSize: 12, marginTop: 2 }}>
                    {c.industry && <span>{c.industry}</span>}
                    {c.industry && c.website && <span style={{ margin: '0 6px', color: 'var(--text3)' }}>·</span>}
                    {c.website && (
                      <a href={c.website.startsWith('http') ? c.website : `https://${c.website}`}
                        target="_blank" rel="noreferrer"
                        style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                        {c.website}
                      </a>
                    )}
                  </p>
                </div>
                <button className="btn btn-danger" style={{ padding: '5px 10px', fontSize: 12 }}
                  onClick={() => handleDelete(c.id)}>
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
          animation: 'pulse 1.5s ease infinite',
        }} />
      ))}
    </div>
  );
}
