import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Patients from './components/Patients';
import Staff from './components/Staff';
import Appointments from './components/Appointments';
import Invoices from './components/Invoices';
import Prescriptions from './components/Prescriptions';
import Medications from './components/Medications';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/medications" element={<Medications />} />
      </Routes>
    </Router>
  );
}

export default App;
