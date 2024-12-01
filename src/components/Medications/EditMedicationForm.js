import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

function EditMedicationForm({ medication, onMedicationUpdated, onDiscard }) {
  const [formData, setFormData] = useState({
    name: medication.name || '',
    description: medication.description || '',
    stock: medication.stock || 0,
    unitprice: medication.unitprice || 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.name,
      description: formData.description,
      stock: parseInt(formData.stock, 10),
      unitprice: parseFloat(formData.unitprice),
    };

    const { error } = await supabase
      .from('medications')
      .update(updatedData)
      .eq('medicationid', medication.medicationid);

    if (error) {
      console.error('Error updating medication:', error);
      alert('Failed to update medication.');
    } else {
      alert('Medication updated successfully!');
      onMedicationUpdated();
    }
  };

  return (
    <div style={styles.overlay}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Edit Medication</h2>

        <label style={styles.label}>Medication Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter medication name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <label style={styles.label}>Stock Quantity</label>
        <input
          type="number"
          name="stock"
          placeholder="Enter stock quantity"
          value={formData.stock}
          onChange={handleChange}
          style={styles.input}
          min="0"
          required
        />

        <label style={styles.label}>Unit Price</label>
        <input
          type="number"
          name="unitprice"
          placeholder="Enter unit price"
          value={formData.unitprice}
          onChange={handleChange}
          style={styles.input}
          step="0.01"
          min="0"
          required
        />

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.saveButton}>Save Changes</button>
          <button type="button" onClick={onDiscard} style={styles.discardButton}>
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light overlay background
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black',
  },
  label: {
    fontSize: '16px',
    color: 'black',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    minHeight: '100px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  discardButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EditMedicationForm;
