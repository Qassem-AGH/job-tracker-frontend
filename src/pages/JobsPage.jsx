import { useState, useEffect } from 'react';
import { getJobs, createJob, deleteJob } from '../api/jobApi';
import { getCompanies } from '../api/companyApi';

export default function JobsPage() {
  const [jobs, setJobs]           = useState([]);
  const [companies, setCompanies] = useState([]);
  const [error, setError]         = useState(null);
  const [title, setTitle]         = useState('');
  const [desc, setDesc]           = useState('');
  const [companyId, setCompanyId] = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const [j, c] = await Promise.all([getJobs(), getCompanies()]);
      setJobs(j); setCompanies(c);
    } catch { setError('Could not load.'); }
  };

  const handleCreate = async () => {
    if (!title || !companyId) return;
    try {
      await createJob({
        title, description: desc, companyId: Number(companyId)
      });
      setTitle(''); setDesc(''); setCompanyId('');
      load();
    } catch { setError('Could not create job.'); }
  };

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <input className="border rounded px-3 py-1 flex-1 min-w-24"
          placeholder="Title" value={title}
          onChange={e => setTitle(e.target.value)} />
        <input className="border rounded px-3 py-1 flex-1 min-w-24"
          placeholder="Description" value={desc}
          onChange={e => setDesc(e.target.value)} />
        <select className="border rounded px-3 py-1"
          value={companyId}
          onChange={e => setCompanyId(e.target.value)}>
          <option value="">Select company...</option>
          {companies.map(c =>
            <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={handleCreate}>Add</button>
      </div>

      {jobs.length === 0 && (
        <p className="text-gray-400">No jobs yet. Add one above.</p>
      )}

      {jobs.map(j => (
        <div key={j.id}
          className="flex justify-between items-center border rounded p-3 mb-2">
          <div>
            <p className="font-medium">{j.title}</p>
            <p className="text-sm text-gray-500">{j.companyName}</p>
          </div>
          <button className="text-red-500 text-sm hover:underline"
            onClick={() => deleteJob(j.id).then(load)}>Delete</button>
        </div>
      ))}
    </div>
  );
}