import React from 'react';
import { supabase } from '../../supabaseClient';

function StaffDetails({ staff, onBack, onEdit, onDeleteSuccess }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the staff member "${staff.firstname} ${staff.lastname}"?`
    );
    if (confirmDelete) {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('staffid', staff.staffid);

      if (error) {
        console.error('Error deleting staff:', error);
        alert('Failed to delete staff.');
      } else {
        alert('Staff deleted successfully!');
        onDeleteSuccess(); // Notify parent component to refresh the list
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Staff Details</h2>
      <p><strong>Name:</strong> {staff.firstname} {staff.lastname}</p>
      <p><strong>Role:</strong> {staff.role}</p>
      <p><strong>Department:</strong> {staff.department}</p>
      <p><strong>Phone:</strong> {staff.phone}</p>
      <p><strong>Email:</strong> {staff.email}</p>
      <p><strong>Hire Date:</strong> {staff.hiredate}</p>
      <div style={styles.buttonContainer}>
        <button onClick={onBack} style={styles.button}>Back to List</button>
        <button onClick={() => onEdit(staff)} style={styles.editButton}>Edit</button>
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

export default StaffDetails;
