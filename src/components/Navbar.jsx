import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, setTheme, themes } = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/',             label: 'Companies', icon: '🏢' },
    { to: '/jobs',         label: 'Jobs',      icon: '💼' },
    { to: '/applications', label: 'Applications', icon: '📋' },
  ];

  return (
    <nav style={{
      background: 'var(--nav-bg)',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 900, margin: '0 auto',
        padding: '0 24px',
        display: 'flex', alignItems: 'center',
        height: 56, gap: 8,
      }}>
        {/* Logo */}
        <span style={{
          fontWeight: 700, fontSize: 17,
          color: 'var(--text)', marginRight: 24,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            background: 'var(--accent)',
            color: '#fff', borderRadius: 8,
            width: 28, height: 28,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 14,
          }}>🗂</span>
          Job Tracker
        </span>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 8,
              fontSize: 13, fontWeight: 500,
              textDecoration: 'none',
              color: pathname === l.to ? 'var(--accent)' : 'var(--text2)',
              background: pathname === l.to ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
              transition: 'all .15s',
            }}>
              <span>{l.icon}</span>{l.label}
            </Link>
          ))}
        </div>

        {/* Theme switcher */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--bg3)',
              color: 'var(--text2)',
              cursor: 'pointer', fontSize: 13, fontWeight: 500,
              fontFamily: 'inherit',
            }}>
            {themes[theme].icon} {themes[theme].name}
            <span style={{ fontSize: 10, opacity: .6 }}>▼</span>
          </button>

          {open && (
            <div style={{
              position: 'absolute', right: 0, top: '110%',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow2)',
              overflow: 'hidden', minWidth: 140, zIndex: 100,
            }}>
              {Object.entries(themes).map(([key, t]) => (
                <button key={key} onClick={() => { setTheme(key); setOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    width: '100%', padding: '9px 14px',
                    border: 'none', background: key === theme ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
                    color: key === theme ? 'var(--accent)' : 'var(--text)',
                    cursor: 'pointer', fontSize: 13, fontWeight: key === theme ? 600 : 400,
                    fontFamily: 'inherit', textAlign: 'left',
                  }}>
                  {t.icon} {t.name}
                  {key === theme && <span style={{ marginLeft: 'auto', fontSize: 11 }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
