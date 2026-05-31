import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Sun, Moon, UserCircle, Menu, X } from 'lucide-react';
import { AppProvider, useAppContext } from './AppContext';
import LearnerDashboard from './pages/LearnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CourseCatalog from './pages/CourseCatalog';
import EditCourse from './pages/EditCourse';
import LessonViewer from './pages/LessonViewer';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Forbidden from './pages/Forbidden';
import { InstallPrompt } from './components/pwa/InstallPrompt';
import { UpdateBanner } from './components/pwa/UpdateBanner';

const Navigation = () => {
  const { darkMode, toggleDarkMode, currentUser, setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="text-indigo-600 mr-2">SALTEDHASH</span> MindCourse
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 flex flex-col md:flex-row items-start md:items-center gap-4 transition-all z-40 ${menuOpen ? 'block' : 'hidden md:flex'}`}>
          {currentUser && (
            <>
              <Link to="/" className="hover:text-indigo-600">Dashboard</Link>
              <Link to="/courses" className="hover:text-indigo-600">Courses</Link>
              <Link to="/profile" className="hover:text-indigo-600">Profile</Link>
              <Link to="/settings" className="hover:text-indigo-600">Settings</Link>

              {currentUser.role === 'admin' && (
                <Link to="/admin" className="hover:text-indigo-600">Admin</Link>
              )}

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <UserCircle size={20} />
                <span className="text-sm font-medium">{currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            </>
          )}

          {!currentUser && (
             <Link to="/login" className="hover:text-indigo-600">Login</Link>
          )}

          <button 
            onClick={toggleDarkMode} 
            className={`mt-4 md:mt-0 p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-800'}`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-yellow-500 text-white text-center py-2 px-4 text-sm font-medium">
      You are offline — progress saves locally and will sync when reconnected.
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    return <Navigate to="/403" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { darkMode } = useAppContext();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <UpdateBanner />
      <OfflineBanner />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/403" element={<Forbidden />} />

          <Route path="/" element={
            <ProtectedRoute>
              <LearnerDashboard />
            </ProtectedRoute>
          } />

          <Route path="/courses" element={
            <ProtectedRoute>
              <CourseCatalog />
            </ProtectedRoute>
          } />

          <Route path="/lesson/:courseId/:lessonId" element={
            <ProtectedRoute>
              <LessonViewer />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin/course/:id" element={
            <ProtectedRoute requireAdmin>
              <EditCourse />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <InstallPrompt />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
