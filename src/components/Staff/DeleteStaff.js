import React from 'react';
import { supabase } from '../../supabaseClient';

function DeleteStaff({ staffId, onDeleteSuccess }) {
  const handleDelete = async () => {
    const { error } = await supabase
      .from('staff')
      .delete()
      .eq('staffid', staffId);

    if (error) {
      console.error('Error deleting staff:', error);
      alert('Failed to delete staff.');
    } else {
      alert('Staff deleted successfully!');
      onDeleteSuccess(); // Notify parent to refresh the list
    }
  };

  return (
    <div style={styles.container}>
      <h2>Delete Staff</h2>
      <p>Are you sure you want to delete this staff member?</p>
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

export default DeleteStaff;
