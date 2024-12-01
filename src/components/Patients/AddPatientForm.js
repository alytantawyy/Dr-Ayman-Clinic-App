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
    
    if (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient.'); // Show an alert if there's an error
    } else if (data && data.length > 0) {
      alert('Patient added successfully!');
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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Patient</h2>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={formData.firstname}
        onChange={handleChange}
        required // Marked as required
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={handleChange}
        required // Marked as required
      />
      <input
        type="date"
        name="dateofbirth"
        value={formData.dateofbirth}
        onChange={handleChange}
        required // Marked as required
      />
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option> {/* Added a default option */}
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required // Marked as required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required // Marked as required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required // Marked as required
      />
      <input
        type="text"
        name="emergencycontact"
        placeholder="Emergency Contact"
        value={formData.emergencycontact}
        onChange={handleChange}
        required // Marked as required
      />
      <div style={styles.buttonContainer}>
        <button type="button" onClick={handleBack}>
          Back to Patients
        </button>
        <button type="submit">Add Patient</button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start'
  }
};

export default AddPatientForm;
