import React, { useState, useEffect } from 'react'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard'
import Calculators from './pages/Calculators'
import Flashcards from './pages/Flashcards'
import Scenarios from './pages/Scenarios'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Landing from './pages/Landing'
import UserGuide from './pages/UserGuide'
import AuditLogs from './pages/AuditLogs'
import ManageStaff from './pages/ManageStaff'
import Settings from './pages/Settings'
import { useTheme } from './context/ThemeContext.jsx'

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('nbu_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const savedUser = localStorage.getItem('nbu_user');
    return savedUser ? 'dashboard' : 'landing';
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('nbu_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nbu_user');
    localStorage.removeItem('token');
    setCurrentPage('landing');
  };

  const isAdmin = user?.role === 'Nursing In-Charge' || user?.role === 'Consultant Pediatrician';
  const isClinician = user?.role === 'Staff Nurse' || user?.role === 'Medical Officer';
  const isStudent = user?.role === 'Student';
  const isITSupport = user?.role === 'ICT / IT Support';

  // Force unauthorized pages back to dashboard
  let safePage = currentPage;
  if (user) {
    if (!isAdmin && !isITSupport && (currentPage === 'audit-logs' || currentPage === 'manage-staff')) safePage = 'dashboard';
    if (isStudent && (currentPage === 'calculators' || currentPage === 'favorites')) safePage = 'dashboard';
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {!user ? (
        <>
          {currentPage === 'login' && (
            <Login 
              onLogin={handleLogin} 
              onBack={() => setCurrentPage('landing')} 
              onRegister={() => setCurrentPage('register')}
            />
          )}
          {currentPage === 'register' && (
            <Register onBack={() => setCurrentPage('login')} />
          )}
          {currentPage === 'about' && (
            <About onBack={() => setCurrentPage('landing')} />
          )}
          {currentPage === 'user-guide' && (
            <UserGuide onBack={() => setCurrentPage('landing')} />
          )}
          {currentPage === 'landing' && (
            <Landing 
              onEnter={() => setCurrentPage('login')} 
              onRegister={() => setCurrentPage('register')}
              onViewGuide={() => setCurrentPage('user-guide')}
              onViewAbout={() => setCurrentPage('about')}
            />
          )}
        </>
      ) : (
        <MainLayout 
          currentPath={safePage} 
          onNavigate={setCurrentPage} 
          user={user}
          onLogout={handleLogout}
        >
          {safePage === 'dashboard' && <Dashboard user={user} onNavigate={setCurrentPage} />}
          {safePage === 'calculators' && <Calculators />}
          {safePage === 'flashcards' && <Flashcards user={user} />}
          {safePage === 'scenarios' && <Scenarios />}
          {safePage === 'audit-logs' && <AuditLogs />}
          {safePage === 'manage-staff' && <ManageStaff />}
          {safePage === 'settings' && <Settings user={user} onUpdateUser={handleLogin} />}
        </MainLayout>
      )}
    </div>
  );
}

export default App
