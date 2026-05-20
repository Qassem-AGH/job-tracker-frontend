import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-6">
      <span className="font-bold text-lg mr-4">🗂 Job Tracker</span>
      <Link to="/" className="hover:text-gray-300">Companies</Link>
      <Link to="/jobs" className="hover:text-gray-300">Jobs</Link>
      <Link to="/applications" className="hover:text-gray-300">Applications</Link>
    </nav>
  );
}