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
  const [jobId, setJobId]   = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes]   = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const [a, j] = await Promise.all([
        getApplications(), getJobs()
      ]);
      setApps(a); setJobs(j);
    } catch { setError('Could not load.'); }
  };

  const handleCreate = async () => {
    if (!jobId) return;
    try {
      await createApplication({
        jobId: Number(jobId), status, notes
      });
      setJobId(''); setNotes(''); setStatus('Applied');
      load();
    } catch { setError('Could not create.'); }
  };

  const handleStatus = async (app, newStatus) => {
    try {
      await updateApplication(app.id, {
        id: app.id, status: newStatus, notes: app.notes
      });
      load();
    } catch { setError('Could not update status.'); }
  };

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <select className="border rounded px-3 py-1"
          value={jobId} onChange={e => setJobId(e.target.value)}>
          <option value="">Select job...</option>
          {jobs.map(j =>
            <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
        <select className="border rounded px-3 py-1"
          value={status} onChange={e => setStatus(e.target.value)}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <input className="border rounded px-3 py-1 flex-1"
          placeholder="Notes" value={notes}
          onChange={e => setNotes(e.target.value)} />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={handleCreate}>Add</button>
      </div>

      {apps.length === 0 && (
        <p className="text-gray-400">No applications yet.</p>
      )}

      {apps.map(a => (
        <div key={a.id}
          className="flex justify-between items-center border rounded p-3 mb-2">
          <div>
            <p className="font-medium">{a.jobTitle}</p>
            <p className="text-sm text-gray-500 mt-1">{a.notes}</p>
            <div className="mt-1">
              <StatusBadge status={a.status} />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <select className="text-sm border rounded px-2 py-1"
              value={a.status}
              onChange={e => handleStatus(a, e.target.value)}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="text-red-500 text-sm hover:underline"
              onClick={() => deleteApplication(a.id).then(load)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}