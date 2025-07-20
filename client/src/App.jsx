// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SkillInputForm from './pages/SkillInputForm';
import StartupMatches from './pages/StartupMatches';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SkillForm from './pages/SkillForm';
import Matcher from './pages/Matcher';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import PublicRoute from "./PublicRoute"; // adjust path if you move it later
import ChatRoom from "./pages/ChatRoom";
import ProjectBoard from "./pages/ProjectBoard";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/skills" element={<ProtectedRoute> <SkillInputForm /> </ProtectedRoute>} />
        <Route path="/matches" element={<ProtectedRoute> <StartupMatches /> </ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/match" element={<ProtectedRoute> <Matcher /> </ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute> <AdminPanel /> </ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
        <Route path="/project/:projectId" element={<ProjectBoard />} />
      </Routes>
    </>
  );
}

export default App;
