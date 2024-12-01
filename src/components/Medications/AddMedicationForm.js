import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

function AddMedicationForm({ onMedicationAdded, onDiscard }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stock: 0,
    unitprice: 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from('medications').insert([formData]);
    if (error) {
      console.error('Error adding medication:', error);
      alert('Failed to add medication.');
    } else {
      alert('Medication added successfully!');
      onMedicationAdded();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Add Medication</h2>
          
          <label style={styles.label}>Medication Name</label>
          <input
            type="text"
            name="name"
            placeholder="Medication Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
          
          <label style={styles.label}>Stock Quantity</label>
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
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
            placeholder="Unit Price"
            value={formData.unitprice}
            onChange={handleChange}
            style={styles.input}
            step="0.01"
            min="0"
            required
          />
          
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>Add Medication</button>
            <button type="button" onClick={onDiscard} style={styles.discardButton}>
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    color: 'black'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  discardButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddMedicationForm;
