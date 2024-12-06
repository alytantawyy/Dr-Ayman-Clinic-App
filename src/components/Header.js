// src/components/Header.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'; // Optional

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error logging out');
    } else {
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  const handleTitleClick = () => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      toast.info('Please log in to access the Home Page.');
      navigate('/login');
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.titleContainer}>
        <h1 
          style={styles.title} 
          onClick={handleTitleClick}
        >
          Dr. Ayman's Clinic
        </h1>
      </div>
      <nav style={styles.nav}>
        {isAuthenticated ? (
          <>
            <Link to="/patients" style={styles.link}>Patients</Link>
            <Link to="/staff" style={styles.link}>Staff</Link>
            <Link to="/appointments" style={styles.link}>Appointments</Link>
            <Link to="/invoices" style={styles.link}>Invoices</Link>
            <Link to="/medications" style={styles.link}>Medications</Link>
            <Link to="/prescriptions" style={styles.link}>Prescriptions</Link>
            <span onClick={handleLogout} style={styles.link}>Logout</span>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#C2B280',
    color: 'white',
  },
  titleContainer: {
    cursor: 'pointer',
  },
  title: {
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer', // Ensures a pointer cursor
  },
};

export default Header;
