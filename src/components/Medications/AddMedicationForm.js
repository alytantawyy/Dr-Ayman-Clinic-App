import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

function AddMedicationForm({ onMedicationAdded }) {
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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Medication</h2>
      <input
        type="text"
        name="name"
        placeholder="Medication Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={formData.stock}
        onChange={handleChange}
        min="0"
        required
      />
      <input
        type="number"
        name="unitprice"
        placeholder="Unit Price"
        value={formData.unitprice}
        onChange={handleChange}
        step="0.01"
        min="0"
        required
      />
      <button type="submit" style={styles.submitButton}>Add Medication</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddMedicationForm;
