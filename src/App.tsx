import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Sun, Moon, UserCircle } from 'lucide-react';
import { AppProvider, useAppContext } from './AppContext';
import LearnerDashboard from './pages/LearnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CourseCatalog from './pages/CourseCatalog';
import EditCourse from './pages/EditCourse';
import LessonViewer from './pages/LessonViewer';

const Navigation = () => {
  const { darkMode, toggleDarkMode, currentUser, users, setCurrentUser } = useAppContext();

  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Mindfulness Micro Courses</Link>

        <div className="flex items-center gap-4">
          {currentUser && (
            <div className="flex items-center gap-2">
              <UserCircle size={20} />
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const user = users.find(u => u.id === e.target.value);
                  if (user) setCurrentUser(user);
                }}
                className={`p-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </div>
          )}

          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-800'}`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

const AppRoutes = () => {
  const { darkMode, currentUser } = useAppContext();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            currentUser?.role === 'admin'
              ? <Navigate to="/admin" />
              : <LearnerDashboard />
          } />
          <Route path="/admin" element={
             currentUser?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
          } />
          <Route path="/admin/course/:id" element={
            currentUser?.role === 'admin' ? <EditCourse /> : <Navigate to="/" />
          } />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/lesson/:courseId/:lessonId" element={<LessonViewer />} />
        </Routes>
      </main>
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
