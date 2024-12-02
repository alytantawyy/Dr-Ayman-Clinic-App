import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function AddPrescriptionForm({ onPrescriptionAdded }) {
  const [patients, setPatients] = useState([]);
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    patientid: '',
    medicationid: '',
    quantity: '',
    dateprescribed: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: patientsData, error: patientsError } = await supabase.from('patients').select('*');
      const { data: medicationsData, error: medicationsError } = await supabase.from('medications').select('*');

      if (patientsError) {
        console.error('Error fetching patients:', patientsError);
      } else {
        setPatients(patientsData || []);
      }

      if (medicationsError) {
        console.error('Error fetching medications:', medicationsError);
      } else {
        setMedications(medicationsData || []);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPrescription = {
      patientid: formData.patientid,
      medicationid: formData.medicationid,
      quantity: parseInt(formData.quantity, 10),
      dateprescribed: formData.dateprescribed,
    };

    const { error } = await supabase.from('prescriptions').insert([newPrescription]);
    if (error) {
      console.error('Error adding prescription:', error);
      alert('Failed to add prescription.');
    } else {
      alert('Prescription added successfully!');
      onPrescriptionAdded(); // Notify parent to refresh the list
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Add Prescription</h2>

          <label style={styles.label}>Patient</label>
          <select
            name="patientid"
            value={formData.patientid}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.patientid} value={patient.patientid}>
                {patient.firstname} {patient.lastname}
              </option>
            ))}
          </select>

          <label style={styles.label}>Medication</label>
          <select
            name="medicationid"
            value={formData.medicationid}
            onChange={handleChange}
            required
          >
            <option value="">Select Medication</option>
            {medications.map((medication) => (
              <option key={medication.medicationid} value={medication.medicationid}>
                {medication.name}
              </option>
            ))}
          </select>

          <label style={styles.label}>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            min="1"
            required
          />

          <label style={styles.label}>Date Prescribed</label>
          <input
            type="date"
            name="dateprescribed"
            value={formData.dateprescribed}
            onChange={handleChange}
            required
          />

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>Add Prescription</button>
            <button type="button" onClick={() => onPrescriptionAdded()} style={styles.discardButton}>
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
    textAlign: 'center',
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
};

export default AddPrescriptionForm;
