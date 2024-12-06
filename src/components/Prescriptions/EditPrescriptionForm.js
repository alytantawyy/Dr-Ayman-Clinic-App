import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function EditPrescriptionForm({ prescription, onPrescriptionUpdated, onDiscard }) {
  const [patients, setPatients] = useState([]);
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    patientid: '',
    medicationid: '',
    quantity: '',
    dateprescribed: '',
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('*');
      const { data: medicationsData, error: medicationsError } = await supabase
        .from('medications')
        .select('*');

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

  useEffect(() => {
    // Only set formData after prescription, patients, and medications are loaded
    if (prescription && patients.length > 0 && medications.length > 0) {
      setFormData({
        patientid: prescription.patientid || '',
        medicationid: prescription.medicationid || '',
        quantity: prescription.quantity || '',
        dateprescribed: formatDateForInput(prescription.dateprescribed),
      });
    }
  }, [prescription, patients, medications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPrescription = {
      patientid: formData.patientid,
      medicationid: formData.medicationid,
      quantity: parseInt(formData.quantity, 10),
      dateprescribed: formData.dateprescribed,
    };

    const { error } = await supabase
      .from('prescriptions')
      .update(updatedPrescription)
      .eq('prescriptionid', prescription.prescriptionid);

    if (error) {
      console.error('Error updating prescription:', error);
      alert('Failed to update prescription.');
    } else {
      alert('Prescription updated successfully!');
      onPrescriptionUpdated();
    }
  };

  if (patients.length === 0 || medications.length === 0) {
    return (
      <div style={styles.overlay}>
        <div style={styles.form}>
          <h2 style={styles.title}>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Edit Prescription</h2>

        <label>Patient</label>
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

        <label>Medication</label>
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

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          min="1"
          required
        />

        <label>Date Prescribed</label>
        <input
          type="date"
          name="dateprescribed"
          value={formData.dateprescribed}
          onChange={handleChange}
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
    color: 'black',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
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

export default EditPrescriptionForm;
