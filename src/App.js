import './App.css'; 
import { AuthProvider } from './AuthContext';
import Login from './Login';
import UserManagement from './UserManagement';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() { 
  return ( 
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
