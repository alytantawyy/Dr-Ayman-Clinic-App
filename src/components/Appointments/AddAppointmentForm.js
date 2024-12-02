import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function AddAppointmentForm({ onAppointmentAdded, onBack }) {
  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
    patientid: '',
    staffid: '',
    appointmentdate: '',
    status: 'Scheduled',
    notes: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: patientsData, error: patientsError } = await supabase.from('patients').select('*');
      if (patientsError) console.error('Error fetching patients:', patientsError);
      const { data: staffData, error: staffError } = await supabase.from('staff').select('*');
      if (staffError) console.error('Error fetching staff:', staffError);

      setPatients(patientsData || []);
      setStaff(staffData || []);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('appointments').insert([formData]);
    if (error) {
      console.error('Error adding appointment:', error);
      alert('Failed to add appointment.');
    } else {
      alert('Appointment added successfully!');
      onAppointmentAdded();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Add Appointment</h2>
          
          <label style={styles.label}>Select Patient</label>
          <select
            name="patientid"
            value={formData.patientid}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.patientid} value={patient.patientid}>
                {patient.firstname} {patient.lastname}
              </option>
            ))}
          </select>

          <label style={styles.label}>Select Staff</label>
          <select
            name="staffid"
            value={formData.staffid}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Staff</option>
            {staff.map((member) => (
              <option key={member.staffid} value={member.staffid}>
                {member.firstname} {member.lastname} ({member.role})
              </option>
            ))}
          </select>

          <label style={styles.label}>Appointment Date</label>
          <input
            type="datetime-local"
            name="appointmentdate"
            value={formData.appointmentdate}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} style={styles.input}>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <label style={styles.label}>Notes</label>
          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={handleChange}
            style={styles.input}
          />

          <div style={styles.buttonContainer}>
            <button type="button" onClick={onBack} style={styles.backButton}>
              Back to Appointments
            </button>
            <button type="submit" style={styles.submitButton}>Add Appointment</button>
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
    maxWidth: '350px',
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
    marginTop: '10px',
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
    marginRight: '10px',
  },
};

export default AddAppointmentForm;
