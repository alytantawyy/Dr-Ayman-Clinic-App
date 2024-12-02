import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function MedicationsList({ onSelectMedication, onEditMedication }) {
  const [medications, setMedications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      const { data, error } = await supabase.from('medications').select('*');
      if (error) console.error('Error fetching medications:', error);
      else setMedications(data);
      setLoading(false);
    };

    fetchMedications();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredMedications = medications.filter(
    (medication) =>
      medication.name.toLowerCase().includes(searchQuery) ||
      medication.description.toLowerCase().includes(searchQuery)
  );

  // Sort medications by name
  const sortedMedications = filteredMedications.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Medications</h1>
      <input
        type="text"
        placeholder="Search by name or description"
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      <ul>
        {sortedMedications.map((medication) => (
          <li key={medication.medicationid} style={styles.medicationItem}>
            <p>
              <strong>{medication.name}</strong> <br />
              {medication.description} <br />
              <strong>Stock:</strong> {medication.stock} <br />
              <strong>Price:</strong> ${medication.unitprice}
            </p>
            <div style={styles.buttonContainer}>
              <button onClick={() => onSelectMedication(medication)}>View</button>
              <button onClick={() => onEditMedication(medication)}>Edit</button>
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
  medicationItem: {
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

export default MedicationsList;
