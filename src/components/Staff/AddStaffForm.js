import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

function AddStaffForm({ onStaffAdded, onBack }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    role: 'Doctor',
    department: '',
    phone: '',
    email: '',
    hiredate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('staff').insert([formData]);
    if (error) {
      console.error('Error adding staff:', error);
      alert('Failed to add staff.');
    } else {
      alert('Staff added successfully!');
      onStaffAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Add Staff</h2>
      
      <label style={styles.label}>First Name</label>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={formData.firstname}
        onChange={handleChange}
        required
        style={styles.input}
      />
      
      <label style={styles.label}>Last Name</label>
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={handleChange}
        required
        style={styles.input}
      />
      
      <label style={styles.label}>Role</label>
      <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
        <option value="Doctor">Doctor</option>
        <option value="Nurse">Nurse</option>
        <option value="Admin">Admin</option>
      </select>
      
      <label style={styles.label}>Department</label>
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        required
        style={styles.input}
      />
      
      <label style={styles.label}>Phone</label>
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        style={styles.input}
      />
      
      <label style={styles.label}>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={styles.input}
      />
      
      <label style={styles.label}>Hire Date</label>
      <input
        type="date"
        name="hiredate"
        value={formData.hiredate}
        onChange={handleChange}
        required
        style={styles.input}
      />
      
      <div style={styles.buttonContainer}>
        <button type="button" onClick={onBack} style={styles.backButton}>
          Back to Staff
        </button>
        <button type="submit" style={styles.submitButton}>Add Staff</button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '300px', // Set a max width for the form
    margin: '0 auto', // Center the form
    padding: '15px', // Add padding for better spacing
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    color: 'black'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  backButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
};

export default AddStaffForm;
