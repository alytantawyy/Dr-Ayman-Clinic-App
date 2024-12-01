import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function PatientsList({ onSelectPatient, onEditPatient }) {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) console.error('Error fetching patients:', error);
      else setPatients(data);
      setLoading(false);
    };

    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstname.toLowerCase().includes(searchQuery) ||
      patient.lastname.toLowerCase().includes(searchQuery) ||
      patient.email.toLowerCase().includes(searchQuery)
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Patients</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      <ul>
        {filteredPatients.map((patient) => (
          <li key={patient.patientid} style={styles.patientItem}>
            <p>
              {patient.firstname} {patient.lastname} - {patient.email}
            </p>
            <div style={styles.buttonContainer}>
              <button onClick={() => onSelectPatient(patient)}>View</button>
              <button onClick={() => onEditPatient(patient)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center', // Center the heading
  },
  searchInput: {
    padding: '10px',
    width: '100%',
    marginBottom: '20px',
    fontSize: '16px',
  },
  patientItem: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C2B280',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
};

export default PatientsList;
