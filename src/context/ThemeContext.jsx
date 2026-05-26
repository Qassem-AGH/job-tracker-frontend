import { createContext, useContext, useState, useEffect } from 'react';

export const themes = {
  light: {
    name: 'Light',
    icon: '☀️',
    vars: {
      '--bg':      '#f8fafc',
      '--bg2':     '#ffffff',
      '--bg3':     '#f1f5f9',
      '--border':  '#e2e8f0',
      '--text':    '#0f172a',
      '--text2':   '#64748b',
      '--text3':   '#94a3b8',
      '--accent':  '#3b82f6',
      '--accent2': '#2563eb',
      '--danger':  '#ef4444',
      '--success': '#22c55e',
      '--warning': '#f59e0b',
      '--shadow':  '0 1px 3px rgba(0,0,0,.1)',
      '--shadow2': '0 4px 12px rgba(0,0,0,.08)',
      '--radius':  '10px',
      '--nav-bg':  '#ffffff',
    }
  },
  dark: {
    name: 'Dark',
    icon: '🌙',
    vars: {
      '--bg':      '#0f172a',
      '--bg2':     '#1e293b',
      '--bg3':     '#334155',
      '--border':  '#334155',
      '--text':    '#f1f5f9',
      '--text2':   '#94a3b8',
      '--text3':   '#64748b',
      '--accent':  '#60a5fa',
      '--accent2': '#3b82f6',
      '--danger':  '#f87171',
      '--success': '#4ade80',
      '--warning': '#fbbf24',
      '--shadow':  '0 1px 3px rgba(0,0,0,.4)',
      '--shadow2': '0 4px 12px rgba(0,0,0,.35)',
      '--radius':  '10px',
      '--nav-bg':  '#1e293b',
    }
  },
  ocean: {
    name: 'Ocean',
    icon: '🌊',
    vars: {
      '--bg':      '#0c1a2e',
      '--bg2':     '#112240',
      '--bg3':     '#1d3461',
      '--border':  '#1d3461',
      '--text':    '#ccd6f6',
      '--text2':   '#8892b0',
      '--text3':   '#495670',
      '--accent':  '#64ffda',
      '--accent2': '#00b4d8',
      '--danger':  '#ff6b6b',
      '--success': '#64ffda',
      '--warning': '#ffd166',
      '--shadow':  '0 1px 3px rgba(0,0,0,.5)',
      '--shadow2': '0 4px 20px rgba(100,255,218,.05)',
      '--radius':  '8px',
      '--nav-bg':  '#112240',
    }
  },
  sunset: {
    name: 'Sunset',
    icon: '🌅',
    vars: {
      '--bg':      '#fdf4f0',
      '--bg2':     '#ffffff',
      '--bg3':     '#fde8df',
      '--border':  '#f5cfc4',
      '--text':    '#2d1b0e',
      '--text2':   '#7c4a2d',
      '--text3':   '#b07050',
      '--accent':  '#e85d04',
      '--accent2': '#dc2f02',
      '--danger':  '#d00000',
      '--success': '#2d6a4f',
      '--warning': '#e9c46a',
      '--shadow':  '0 1px 3px rgba(232,93,4,.15)',
      '--shadow2': '0 4px 12px rgba(232,93,4,.1)',
      '--radius':  '12px',
      '--nav-bg':  '#ffffff',
    }
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('jt-theme') || 'light'
  );

  useEffect(() => {
    const vars = themes[theme]?.vars || themes.light.vars;
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    localStorage.setItem('jt-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
