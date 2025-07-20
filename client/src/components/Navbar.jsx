import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">SkillMatcher</div>
      <ul className="flex gap-4 text-sm md:text-base">
        <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
        <li><Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link></li>
        <li><Link to="/profile" className="hover:text-blue-500">Profile</Link></li>
      </ul>
    </nav>

  );
};

export default Navbar;
