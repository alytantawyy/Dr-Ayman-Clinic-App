import React, { useState } from 'react';
import PatientsList from './Patients/PatientsList';
import AddPatientForm from './Patients/AddPatientForm';
import EditPatientForm from './Patients/EditPatientForm';
import PatientDetails from './Patients/PatientDetails';

function Patients() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handlePatientSelected = (patient) => {
    setSelectedPatient(patient);
    setShowAddForm(false);
    setEditingPatient(null);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setSelectedPatient(null);
    setShowAddForm(false);
  };

  const handlePatientAdded = () => {
    setShowAddForm(false);
  };

  const handlePatientUpdated = () => {
    setEditingPatient(null);
  };

  const handleDiscardChanges = () => {
    setEditingPatient(null); // Close the edit form without saving
  };

  return (
    <div style={styles.container}>
      {!selectedPatient && !editingPatient && !showAddForm && (
        <div>
          <button onClick={() => setShowAddForm(true)} style={styles.button}>
            Add New Patient
          </button>
          <PatientsList
            onSelectPatient={handlePatientSelected}
            onEditPatient={handleEditPatient}
          />
        </div>
      )}
      {showAddForm && (
        <AddPatientForm
          onPatientAdded={handlePatientAdded}
        />
      )}
      {editingPatient && (
        <EditPatientForm
          patient={editingPatient}
          onPatientUpdated={handlePatientUpdated}
          onDiscard={handleDiscardChanges} // Pass the discard function
        />
      )}
      {selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          onBack={() => setSelectedPatient(null)}
          onEdit={handleEditPatient}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url('https://worldkings.org/Userfiles/Upload/images/Aswan%202.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    color: 'white',
  },
  button: {
    marginBottom: '20px',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Patients;
