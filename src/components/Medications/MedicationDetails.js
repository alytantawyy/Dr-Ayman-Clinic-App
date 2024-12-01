import React from 'react';
import { supabase } from '../../supabaseClient';

function MedicationDetails({ medication, onBack, onEdit, onDeleteSuccess }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the medication "${medication.name}"?`
    );
    if (confirmDelete) {
      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('medicationid', medication.medicationid);

      if (error) {
        console.error('Error deleting medication:', error);
        alert('Failed to delete medication.');
      } else {
        alert('Medication deleted successfully!');
        onDeleteSuccess(); // Notify parent component to refresh the list
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Medication Details</h2>
      <p>
        <strong>Name:</strong> {medication.name}
      </p>
      <p>
        <strong>Description:</strong> {medication.description}
      </p>
      <p>
        <strong>Stock:</strong> {medication.stock}
      </p>
      <p>
        <strong>Unit Price:</strong> ${medication.unitprice.toFixed(2)}
      </p>
      <div style={styles.buttonContainer}>
        <button onClick={onBack} style={styles.button}>
          Back to List
        </button>
        <button onClick={() => onEdit(medication)} style={styles.editButton}>
          Edit
        </button>
        <button onClick={handleDelete} style={styles.deleteButton}>
          Delete
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
    maxWidth: '500px',
    margin: '0 auto',
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

export default MedicationDetails;
