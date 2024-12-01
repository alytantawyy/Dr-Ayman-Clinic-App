import React, { useState } from 'react';
import PrescriptionsList from './Prescriptions/PrescriptionsList';
import AddPrescriptionForm from './Prescriptions/AddPrescriptionForm';
import EditPrescriptionForm from './Prescriptions/EditPrescriptionForm.js';

function Prescriptions() {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handlePrescriptionSelected = (prescription) => {
    setSelectedPrescription(prescription);
    setShowAddForm(false);
    setEditingPrescription(null);
  };

  const handleEditPrescription = (prescription) => {
    setEditingPrescription(prescription);
    setSelectedPrescription(null);
    setShowAddForm(false);
  };

  const handlePrescriptionAdded = () => {
    setShowAddForm(false);
  };

  const handlePrescriptionUpdated = () => {
    setEditingPrescription(null);
  };

  const handleDiscardChanges = () => {
    setEditingPrescription(null); // Close the edit form without saving
  };

  return (
    <div style={styles.container}>
      {!selectedPrescription && !editingPrescription && !showAddForm && (
        <div>
          <button onClick={() => setShowAddForm(true)} style={styles.button}>
            Add New Prescription
          </button>
          <PrescriptionsList
            onSelectPrescription={handlePrescriptionSelected}
            onEditPrescription={handleEditPrescription}
          />
        </div>
      )}
      {showAddForm && (
        <AddPrescriptionForm
          onPrescriptionAdded={handlePrescriptionAdded}
        />
      )}
      {editingPrescription && (
        <EditPrescriptionForm
          prescription={editingPrescription}
          onPrescriptionUpdated={handlePrescriptionUpdated}
          onDiscard={handleDiscardChanges}
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

export default Prescriptions;
