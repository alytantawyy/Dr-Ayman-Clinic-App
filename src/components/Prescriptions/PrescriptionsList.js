import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function PrescriptionsList({ onSelectPrescription, onEditPrescription }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          prescriptionid,
          dateprescribed,
          quantity,
          patients (firstname, lastname),
          medications (name)
        `);

      if (error) {
        console.error('Error fetching prescriptions:', error);
      } else {
        setPrescriptions(data || []);
      }
      setLoading(false);
    };

    fetchPrescriptions();
  }, []);

  const handleDelete = async (prescriptionId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this prescription?');
    if (confirmDelete) {
      const { error } = await supabase
        .from('prescriptions')
        .delete()
        .eq('prescriptionid', prescriptionId);

      if (error) {
        console.error('Error deleting prescription:', error);
        alert('Failed to delete prescription.');
      } else {
        alert('Prescription deleted successfully!');
        setPrescriptions((prev) => prev.filter((p) => p.prescriptionid !== prescriptionId));
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  // Sort prescriptions by patient name
  const sortedPrescriptions = prescriptions.sort((a, b) => {
    const patientNameA = `${a.patients.firstname} ${a.patients.lastname}`.toLowerCase();
    const patientNameB = `${b.patients.firstname} ${b.patients.lastname}`.toLowerCase();
    return patientNameA.localeCompare(patientNameB);
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Prescriptions</h1>
      {sortedPrescriptions.length === 0 ? (
        <p>No prescriptions available.</p>
      ) : (
        <ul>
          {sortedPrescriptions.map((prescription) => (
            <li key={prescription.prescriptionid} style={styles.item}>
              <p>
                <strong>Patient:</strong> {prescription.patients.firstname} {prescription.patients.lastname} <br />
                <strong>Medication:</strong> {prescription.medications.name} <br />
                <strong>Quantity:</strong> {prescription.quantity} <br />
                <strong>Date Prescribed:</strong> {new Date(prescription.dateprescribed).toLocaleDateString()}
              </p>
              <div style={styles.buttonContainer}>
                <button onClick={() => onEditPrescription(prescription)} style={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => handleDelete(prescription.prescriptionid)} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
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
  item: {
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
  editButton: {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default PrescriptionsList;
