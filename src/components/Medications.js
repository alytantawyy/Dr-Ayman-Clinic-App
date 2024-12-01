import React, { useState } from 'react';
import MedicationsList from './Medications/MedicationsList';
import AddMedicationForm from './Medications/AddMedicationForm';
import EditMedicationForm from './Medications/EditMedicationForm';
import MedicationDetails from './Medications/MedicationDetails';

function Medications() {
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [editingMedication, setEditingMedication] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleMedicationSelected = (medication) => {
    setSelectedMedication(medication);
    setShowAddForm(false);
    setEditingMedication(null);
  };

  const handleEditMedication = (medication) => {
    setEditingMedication(medication);
    setSelectedMedication(null);
    setShowAddForm(false);
  };

  const handleMedicationAdded = () => {
    setShowAddForm(false);
  };

  const handleMedicationUpdated = () => {
    setEditingMedication(null);
  };

  const handleDiscardChanges = () => {
    setEditingMedication(null); // Close the edit form without saving
  };

  const handleDeleteSuccess = () => {
    setSelectedMedication(null); // Reset selected medication to refresh the list
  };

  return (
    <div style={styles.container}>
      {!selectedMedication && !editingMedication && !showAddForm && (
        <div>
          <button onClick={() => setShowAddForm(true)} style={styles.button}>
            Add New Medication
          </button>
          <MedicationsList
            onSelectMedication={handleMedicationSelected}
            onEditMedication={handleEditMedication}
          />
        </div>
      )}
      {showAddForm && (
        <AddMedicationForm 
          onMedicationAdded={handleMedicationAdded} 
          onDiscard={() => setShowAddForm(false)}
        />
      )}
      {editingMedication && (
        <EditMedicationForm
          medication={editingMedication}
          onMedicationUpdated={handleMedicationUpdated}
          onDiscard={handleDiscardChanges}
        />
      )}
      {selectedMedication && (
        <MedicationDetails
          medication={selectedMedication}
          onBack={() => setSelectedMedication(null)}
          onEdit={handleEditMedication}
          onDeleteSuccess={handleDeleteSuccess}
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

export default Medications;
