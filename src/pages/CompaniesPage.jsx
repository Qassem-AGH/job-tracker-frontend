import { useState, useEffect } from 'react';
import { getCompanies, createCompany, deleteCompany }
  from '../api/companyApi';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [error, setError]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [name, setName]           = useState('');
  const [industry, setIndustry]   = useState('');
  const [website, setWebsite]     = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      setCompanies(await getCompanies());
    } catch {
      setError('Could not load companies.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!name) return;
    try {
      await createCompany({ name, industry, website });
      setName(''); setIndustry(''); setWebsite('');
      load();
    } catch { setError('Could not create company.'); }
  };

  const handleDelete = async (id) => {
    try { await deleteCompany(id); load(); }
    catch { setError('Could not delete.'); }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error)   return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <input className="border rounded px-3 py-1 flex-1 min-w-24"
          placeholder="Name" value={name}
          onChange={e => setName(e.target.value)} />
        <input className="border rounded px-3 py-1 flex-1 min-w-24"
          placeholder="Industry" value={industry}
          onChange={e => setIndustry(e.target.value)} />
        <input className="border rounded px-3 py-1 flex-1 min-w-24"
          placeholder="Website" value={website}
          onChange={e => setWebsite(e.target.value)} />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={handleCreate}>Add</button>
      </div>

      {companies.length === 0 && (
        <p className="text-gray-400">No companies yet. Add one above.</p>
      )}

      {companies.map(c => (
        <div key={c.id}
          className="flex justify-between items-center border rounded p-3 mb-2">
          <div>
            <p className="font-medium">{c.name}</p>
            <p className="text-sm text-gray-500">{c.industry} · {c.website}</p>
          </div>
          <button className="text-red-500 text-sm hover:underline"
            onClick={() => handleDelete(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}