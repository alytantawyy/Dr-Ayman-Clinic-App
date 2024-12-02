import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

function EditStaffForm({ staff, onStaffUpdated, onDiscard }) {
  const [formData, setFormData] = useState({
    firstname: staff.firstname || '',
    lastname: staff.lastname || '',
    role: staff.role || 'Doctor',
    department: staff.department || '',
    phone: staff.phone || '',
    email: staff.email || '',
    hiredate: staff.hiredate || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('staff')
      .update(formData)
      .eq('staffid', staff.staffid)
      .select();

    if (error) {
      console.error('Error updating staff:', error.message);
      alert('Failed to update staff: ' + error.message);
    } else if (data && data.length > 0) {
      alert('Staff updated successfully!');
      onStaffUpdated(data[0]);
    } else {
      alert('No data returned after update.');
    }
  };

  return (
    <div style={styles.overlay}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Edit Staff</h2>

        <label htmlFor="firstname" style={styles.label}>First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />

        <label htmlFor="lastname" style={styles.label}>Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />

        <label htmlFor="role" style={styles.label}>Role</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange}>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Admin">Admin</option>
        </select>

        <label htmlFor="department" style={styles.label}>Department</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />

        <label htmlFor="phone" style={styles.label}>Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <label htmlFor="email" style={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <label htmlFor="hiredate" style={styles.label}>Hire Date</label>
        <input
          type="date"
          id="hiredate"
          name="hiredate"
          value={formData.hiredate}
          onChange={handleChange}
          required
        />

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>Save Changes</button>
          <button type="button" onClick={onDiscard} style={styles.discardButton}>
            Back To List
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
    gap: '10px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  discardButton: {
    padding: '10px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EditStaffForm;
