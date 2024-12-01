import React, { useState } from 'react';
import StaffList from './Staff/StaffList';
import AddStaffForm from './Staff/AddStaffForm';
import EditStaffForm from './Staff/EditStaffForm';
import StaffDetails from './Staff/StaffDetails';

function Staff() {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleStaffSelected = (staff) => {
    setSelectedStaff(staff);
    setShowAddForm(false);
    setEditingStaff(null);
  };

  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
    setSelectedStaff(null);
    setShowAddForm(false);
  };

  const handleStaffAdded = () => {
    setShowAddForm(false);
  };

  const handleStaffUpdated = () => {
    setEditingStaff(null);
  };

  const handleDiscardChanges = () => {
    setEditingStaff(null); // Close the edit form without saving
  };

  return (
    <div style={styles.container}>
      {!selectedStaff && !editingStaff && !showAddForm && (
        <div>
          <button onClick={() => setShowAddForm(true)} style={styles.button}>
            Add New Staff
          </button>
          <StaffList
            onSelectStaff={handleStaffSelected}
            onEditStaff={handleEditStaff}
          />
        </div>
      )}
      {showAddForm && (
        <AddStaffForm onStaffAdded={handleStaffAdded} onBack={() => setShowAddForm(false)} />
      )}
      {editingStaff && (
        <EditStaffForm
          staff={editingStaff}
          onStaffUpdated={handleStaffUpdated}
          onDiscard={handleDiscardChanges}
        />
      )}
      {selectedStaff && (
        <StaffDetails
          staff={selectedStaff}
          onBack={() => setSelectedStaff(null)}
          onEdit={handleEditStaff}
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

export default Staff;
