const config = {
  Applied:   { bg: 'color-mix(in srgb, #3b82f6 15%, transparent)', color: '#3b82f6' },
  Interview: { bg: 'color-mix(in srgb, #f59e0b 15%, transparent)', color: '#d97706' },
  Offer:     { bg: 'color-mix(in srgb, #22c55e 15%, transparent)', color: '#16a34a' },
  Rejected:  { bg: 'color-mix(in srgb, #ef4444 15%, transparent)', color: '#dc2626' },
};

export default function StatusBadge({ status }) {
  const c = config[status] ?? { bg: 'var(--bg3)', color: 'var(--text2)' };
  return (
    <span style={{
      display: 'inline-block',
      background: c.bg,
      color: c.color,
      border: `1px solid ${c.color}`,
      borderRadius: 20,
      padding: '2px 10px',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.02em',
    }}>
      {status}
    </span>
  );
}
