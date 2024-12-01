import React from 'react';

function AppointmentDetails({ appointment, onBack, onEdit }) {
  return (
    <div style={styles.container}>
      <h2>Appointment Details</h2>
      <p>
        <strong>Patient:</strong> {appointment.patients.firstname}{' '}
        {appointment.patients.lastname}
      </p>
      <p>
        <strong>Staff:</strong> {appointment.staff.firstname}{' '}
        {appointment.staff.lastname} ({appointment.staff.role})
      </p>
      <p>
        <strong>Date:</strong>{' '}
        {new Date(appointment.appointmentdate).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {appointment.status}
      </p>
      <p>
        <strong>Notes:</strong> {appointment.notes || 'None'}
      </p>
      <div style={styles.buttonContainer}>
        <button onClick={onBack} style={styles.button}>
          Back to List
        </button>
        <button onClick={() => onEdit(appointment)} style={styles.editButton}>
          Edit
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
};

export default AppointmentDetails;
