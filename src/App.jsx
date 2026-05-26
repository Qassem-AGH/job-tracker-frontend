import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import CompaniesPage from './pages/CompaniesPage';
import JobsPage from './pages/JobsPage';
import ApplicationsPage from './pages/ApplicationsPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
          <Navbar />
          <Routes>
            <Route path="/"             element={<CompaniesPage />} />
            <Route path="/jobs"         element={<JobsPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
