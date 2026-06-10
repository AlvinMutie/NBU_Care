import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Neonates from './pages/Neonates';
import NeonateProfile from './pages/NeonateProfile';
import Calculators from './pages/Calculators';
import Handovers from './pages/Handovers';
import Academy from './pages/Academy';
import Settings from './pages/Settings';
import AuditLogs from './pages/AuditLogs';
import ManageStaff from './pages/ManageStaff';
import VerificationQueue from './pages/VerificationQueue';
import DutyRota from './pages/DutyRota';
import AcademyAnalytics from './pages/AcademyAnalytics';
import Layout from './components/Layout';
import { ThemeProvider } from './services/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/neonates" element={<Neonates />} />
            <Route path="/neonates/:id" element={<NeonateProfile />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/handovers" element={<Handovers />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/academy-analytics" element={<AcademyAnalytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/staff" element={<ManageStaff />} />
            <Route path="/verify" element={<VerificationQueue />} />
            <Route path="/rota" element={<DutyRota />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
