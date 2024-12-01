import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1>Welcome to Dr. Ayman's Clinic</h1>
        <p>Manage your clinic's Patients, Staff, Appointments, and more.</p>
        <div style={styles.grid}>
          {tables.map((table) => (
            <Link to={table.link} key={table.name} style={styles.link}>
              <div style={styles.square}>
                {table.image && <img src={table.image} alt={table.name} style={styles.image} />}
                <h2>{table.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const tables = [
  { name: 'Patients', link: '/patients', image: 'https://www.researchgate.net/publication/336684015/figure/fig3/AS:816252763242496@1571621232880/A-live-oud-therapy-session-taking-place-at-the-Aswan-Heart-Centre.png' },
  { name: 'Staff', link: '/staff', image: 'https://med.aswu.edu.eg/en/wp-content/uploads/2024/02/10.jpg' },
  { name: 'Appointments', link: '/appointments', image: 'https://www.egypttoday.com/siteimages/Larg/71830.jpg' },
  { name: 'Medications', link: '/medications', image: 'https://www.myf-egypt.org/img/aswan-heart/card-img-2.jpg' },
  { name: 'Invoices', link: '/invoices', image: 'https://www.egypttoday.com/siteimages/Larg/20210805030513513.jpg' },
  { name: 'Prescriptions', link: '/prescriptions', image: 'https://www.allianceforsmiles.org/wp-content/uploads/2019/11/7000-child-family-580x400.jpg' },
];

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    backgroundImage: 'url("https://worldkings.org/Userfiles/Upload/images/Aswan%202.jpg")', // Replace with your desired background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black overlay with 60% opacity
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginTop: '50px',
    padding: '0 20px',
  },
  square: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    backgroundColor: 'white',
    color: 'black',
  },
  image: {
    width: '290px',
    height: '160px',
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

export default HomePage;
