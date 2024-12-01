import React, { useState } from 'react';
import DeleteStaff from './DeleteStaff';

function StaffDetails({ staff, onBack, onEdit }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteSuccess = () => {
    setShowDeleteConfirmation(false);
    onBack(); // Return to staff list after deletion
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
        <button
          onClick={() => setShowDeleteConfirmation(true)}
          style={styles.deleteButton}
        >
          Delete
        </button>
      </div>
      {showDeleteConfirmation && (
        <DeleteStaff staffId={staff.staffid} onDeleteSuccess={handleDeleteSuccess} />
      )}
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
