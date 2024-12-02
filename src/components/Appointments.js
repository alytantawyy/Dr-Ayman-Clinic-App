import React, { useState } from 'react';
import AppointmentsList from './Appointments/AppointmentsList';
import AddAppointmentForm from './Appointments/AddAppointmentForm';
import EditAppointmentForm from './Appointments/EditAppointmentForm';
import AppointmentDetails from './Appointments/AppointmentDetails';

function Appointments() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAppointmentSelected = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAddForm(false);
    setEditingAppointment(null);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setSelectedAppointment(null);
    setShowAddForm(false);
  };

  const handleAppointmentAdded = () => {
    setShowAddForm(false);
  };

  const handleAppointmentUpdated = () => {
    setEditingAppointment(null);
  };

  const handleDiscardChanges = () => {
    setEditingAppointment(null); // Close the edit form without saving
  };

  return (
    <div style={styles.container}>
      {!selectedAppointment && !editingAppointment && !showAddForm && (
        <div>
          <button onClick={() => setShowAddForm(true)} style={styles.button}>
            Add New Appointment
          </button>
          <AppointmentsList
            onSelectAppointment={handleAppointmentSelected}
            onEditAppointment={handleEditAppointment}
          />
        </div>
      )}
      {showAddForm && (
        <AddAppointmentForm
          onAppointmentAdded={handleAppointmentAdded}
          onBack={() => setShowAddForm(false)}
        />
      )}
      {editingAppointment && (
        <EditAppointmentForm
          appointment={editingAppointment}
          onAppointmentUpdated={handleAppointmentUpdated}
          onDiscard={handleDiscardChanges} // Pass the discard function
        />
      )}
      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onBack={() => setSelectedAppointment(null)}
          onEdit={handleEditAppointment}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url('https://worldkings.org/Userfiles/Upload/images/Aswan%202.jpg')`, // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    color: 'white', // Ensures text is readable against the background
  },
  button: {
    marginBottom: '20px',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Appointments;
