import React from 'react';
import { supabase } from '../../supabaseClient';

function DeletePatient({ patientId, onDeleteSuccess }) {
  const handleDelete = async () => {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('patientid', patientId);

    if (error) {
      console.error('Error deleting patient:', error);
      alert('Failed to delete patient.');
    } else {
      alert('Patient deleted successfully!');
      onDeleteSuccess(); // Notify parent component to refresh the list
    }
  };

  return (
    <div style={styles.container}>
      <h2>Delete Patient</h2>
      <p>Are you sure you want to delete this patient?</p>
      <div style={styles.buttonContainer}>
        <button onClick={handleDelete} style={styles.deleteButton}>
          Yes, Delete
        </button>
        <button onClick={onDeleteSuccess} style={styles.cancelButton}>
          Cancel
        </button>
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
    maxWidth: '400px',
    margin: '0 auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DeletePatient; 