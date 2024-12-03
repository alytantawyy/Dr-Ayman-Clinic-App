import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

function AddPatientForm({ onPatientAdded }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    dateofbirth: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    emergencycontact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('patients').insert([formData]);
    
    console.log('Insert Response:', data);
    console.error('Insert Error:', error);

    if (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient.'); // Show an alert if there's an error
    } else if (data && data.length > 0) {
      alert('Patient added successfully!'); // Success message
      onPatientAdded(data[0]); // Notify parent component
      navigate('/patients'); // Navigate back to the Patients page
    } else {
      alert('No data returned after adding patient.'); // Handle unexpected case
    }
  };

  const handleBack = () => {
    onPatientAdded(); // Notify parent to close the form
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Add Patient</h2>
          
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
          
          <label style={styles.label}>Date of Birth</label>
          <input
            type="date"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            required
            style={styles.input}
          />
          
          <label style={styles.label}>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required style={styles.input}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          
          <label style={styles.label}>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />
          
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          
          <label style={styles.label}>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={styles.input}
          />
          
          <label style={styles.label}>Emergency Contact</label>
          <input
            type="text"
            name="emergencycontact"
            placeholder="Emergency Contact"
            value={formData.emergencycontact}
            onChange={handleChange}
            required
            style={styles.input}
          />
          
          <div style={styles.buttonContainer}>
            <button type="button" onClick={handleBack} style={styles.backButton}>
              Back to Patients
            </button>
            <button type="submit" style={styles.submitButton}>Add Patient</button>
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
    zIndex: 1000,
  },
  container: {
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '300px',
    color: 'black'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  backButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};


export default AddPatientForm;