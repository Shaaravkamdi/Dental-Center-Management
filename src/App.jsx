import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Dashboard from './pages/admin/Dashboard';
import PatientList from './pages/admin/PatientList';
import AddPatient from './pages/admin/AddPatient';
import Files from './pages/admin/Files';
import Appointment from './pages/admin/Appointment';
import InvoiceView from './pages/admin/InvoiceView';
import AddAppointment from './pages/admin/AddAppointment';
import Setting from './pages/admin/Setting';
import EditPatient from './pages/admin/EditPatient';

import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointment from './pages/patient/PatientAppointment';
import PatientTreatment from './pages/patient/PatientTreatment';
import PatientFiles from './pages/patient/PatientFiles';
import PatientSetting from './pages/patient/PatientSetting';
import EditAppointment from './pages/admin/EditAppointment';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRole="Admin" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patient" element={<PatientList />} />
            <Route path="/patient/add" element={<AddPatient />} />
            <Route path="/patient/edit/:id" element={<EditPatient />} />
            <Route path="/patient/delete/:id" element={<EditPatient />} />
            <Route path="/file" element={<Files />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/invoice/view/:id" element={<InvoiceView />} />
            <Route path="/appointment/add" element={<AddAppointment />} />
            <Route path="/appointment/edit/:id" element={<EditAppointment />} />
            <Route path="/setting" element={<Setting />} />
          </Route>

          {/* Patient Routes */}
          <Route element={<ProtectedRoute allowedRole="Patient" />}>
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/appointments" element={<PatientAppointment />} />
            <Route path="/patient/treatments" element={<PatientTreatment />} />
            <Route path="/patient/file" element={<PatientFiles />} />
            <Route path="/patient/setting" element={<PatientSetting />} />

          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
