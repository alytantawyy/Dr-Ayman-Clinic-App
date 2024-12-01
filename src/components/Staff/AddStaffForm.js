import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

function AddStaffForm({ onStaffAdded }) {
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
      <h2>Add Staff</h2>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Doctor">Doctor</option>
        <option value="Nurse">Nurse</option>
        <option value="Admin">Admin</option>
      </select>
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="date"
        name="hiredate"
        value={formData.hiredate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Staff</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
};

export default AddStaffForm;
