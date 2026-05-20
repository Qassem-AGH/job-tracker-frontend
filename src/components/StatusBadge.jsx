const colors = {
  Applied:   'bg-blue-100 text-blue-800',
  Interview: 'bg-yellow-100 text-yellow-800',
  Offer:     'bg-green-100 text-green-800',
  Rejected:  'bg-red-100 text-red-800',
};

export default function StatusBadge({ status }) {
  const cls = colors[status] ?? 'bg-gray-100 text-gray-800';
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${cls}`}>
      {status}
    </span>
  );
}