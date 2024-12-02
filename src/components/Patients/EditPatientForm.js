import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

function EditPatientForm({ patient, onPatientUpdated, onDiscard }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: patient.firstname || '',
    lastname: patient.lastname || '',
    dateofbirth: patient.dateofbirth || '',
    gender: patient.gender || 'Male',
    phone: patient.phone || '',
    email: patient.email || '',
    address: patient.address || '',
    emergencycontact: patient.emergencycontact || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log('Form submitted:', formData);

    try {
      const { data, error } = await supabase
        .from('patients')
        .update(formData)
        .eq('patientid', patient.patientid)
        .select();

      if (error) {
        console.error('Error updating patient:', error.message);
        alert('Failed to update patient: ' + error.message);
      } else if (data && data.length > 0) {
        alert('Patient updated successfully!');
        onPatientUpdated(data[0]);
        navigate('/patients');
      } else {
        alert('No data returned after update.');
      }
    } catch (err) {
      console.error('Unexpected error:', err.message);
      alert('An unexpected error occurred: ' + err.message);
    }
  };

  return (
    <div style={styles.overlay}>
      <form style={styles.form}>
        <h2 style={styles.title}>Edit Patient</h2>

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

        <label htmlFor="dateofbirth" style={styles.label}>Date of Birth</label>
        <input
          type="date"
          id="dateofbirth"
          name="dateofbirth"
          value={formData.dateofbirth}
          onChange={handleChange}
          required
        />

        <label htmlFor="gender" style={styles.label}>Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

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

        <label htmlFor="address" style={styles.label}>Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />

        <label htmlFor="emergencycontact" style={styles.label}>Emergency Contact</label>
        <input
          type="text"
          id="emergencycontact"
          name="emergencycontact"
          value={formData.emergencycontact}
          onChange={handleChange}
          placeholder="Emergency Contact"
        />

        <div style={styles.buttonContainer}>
          <button type="button" onClick={handleSubmit} style={styles.saveButton}>Save Changes</button>
          <button type="button" onClick={onDiscard} style={styles.discardButton}>
            Back to List
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
  saveButton: {
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

export default EditPatientForm;
