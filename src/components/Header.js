import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.titleContainer}>
        <h1 
          style={styles.title} 
          onClick={() => navigate('/')}
        >
          Dr. Ayman's Clinic
        </h1>
      </div>
      <nav style={styles.nav}>
        <Link to="/patients" style={styles.link}>Patients</Link>
        <Link to="/staff" style={styles.link}>Staff</Link>
        <Link to="/appointments" style={styles.link}>Appointments</Link>
        <Link to="/invoices" style={styles.link}>Invoices</Link>
        <Link to="/medications" style={styles.link}>Medications</Link>
        <Link to="/prescriptions" style={styles.link}>Prescriptions</Link>
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
    gap: '20px', // Space between links
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default Header;
