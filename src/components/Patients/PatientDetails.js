import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

function PatientDetails({ patient, onBack, onEdit }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteSuccess = () => {
    setShowDeleteConfirmation(false);
    onBack(); // Go back to the patient list after deletion
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the patient "${patient.firstname} ${patient.lastname}"?`
    );
    if (confirmDelete) {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('patientid', patient.patientid);

      if (error) {
        console.error('Error deleting patient:', error);
        alert('Failed to delete patient.');
      } else {
        alert('Patient deleted successfully!');
        handleDeleteSuccess(); // Notify parent component to refresh the list
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.firstname} {patient.lastname}</p>
      <p><strong>Date of Birth:</strong> {patient.dateofbirth}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Phone:</strong> {patient.phone}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Address:</strong> {patient.address}</p>
      <p><strong>Emergency Contact:</strong> {patient.emergencycontact}</p>
      <div style={styles.buttonContainer}>
        <button onClick={onBack} style={styles.button}>Back to List</button>
        <button onClick={() => onEdit(patient)} style={styles.editButton}>Edit</button>
        <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    maxWidth: '500px',
    margin: '0 auto',
    color: 'black'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PatientDetails;
