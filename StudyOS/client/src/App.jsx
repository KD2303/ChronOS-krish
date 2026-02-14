import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/tasks" element={<div className="p-8 ml-64 mr-80"><Sidebar /><RightPanel /><h1>Tasks Content Coming Soon</h1></div>} />
            <Route path="/schedule" element={<div className="p-8 ml-64 mr-80"><Sidebar /><RightPanel /><h1>Schedule Content Coming Soon</h1></div>} />
            <Route path="/focus" element={<div className="p-8 ml-64 mr-80"><Sidebar /><RightPanel /><h1>Focus Mode Coming Soon</h1></div>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
