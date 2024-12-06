import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function EditAppointmentForm({ appointment, onAppointmentUpdated, onDiscard }) {
  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
    patientid: '',
    staffid: '',
    appointmentdate: '',
    status: 'Scheduled',
    notes: '',
  });

  // Format the date for the datetime-local input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('*');

      const { data: staffData, error: staffError } = await supabase
        .from('staff')
        .select('*');

      if (patientsError || staffError) {
        console.error('Error fetching data:', patientsError || staffError);
      } else {
        setPatients(patientsData || []);
        setStaff(staffData || []);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Only set form data after we have the appointment and both arrays
    if (appointment && patients.length > 0 && staff.length > 0) {
      setFormData({
        patientid: appointment.patientid || '',
        staffid: appointment.staffid || '',
        appointmentdate: formatDateForInput(appointment.appointmentdate),
        status: appointment.status || 'Scheduled',
        notes: appointment.notes || '',
      });
    }
  }, [appointment, patients, staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('appointments')
      .update({
        patientid: formData.patientid,
        staffid: formData.staffid,
        appointmentdate: formData.appointmentdate,
        status: formData.status,
        notes: formData.notes,
      })
      .eq('appointmentid', appointment.appointmentid);

    if (error) {
      console.error('Error updating appointment:', error.message);
      alert('Failed to update appointment.');
    } else {
      alert('Appointment updated successfully!');
      onAppointmentUpdated();
    }
  };

  // If we haven't loaded patients and staff yet, show a loading state
  if (patients.length === 0 || staff.length === 0) {
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
        <h2 style={styles.title}>Edit Appointment</h2>
        <label htmlFor="patientid">Select Patient</label>
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

        <label htmlFor="staffid">Select Staff</label>
        <select
          name="staffid"
          value={formData.staffid}
          onChange={handleChange}
          required
        >
          <option value="">Select Staff</option>
          {staff.map((member) => (
            <option key={member.staffid} value={member.staffid}>
              {member.firstname} {member.lastname} ({member.role})
            </option>
          ))}
        </select>

        <label htmlFor="appointmentdate">Appointment Date</label>
        <input
          type="datetime-local"
          name="appointmentdate"
          value={formData.appointmentdate}
          onChange={handleChange}
          required
        />

        <label htmlFor="status">Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <label htmlFor="notes">Notes</label>
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
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
    color: 'black'
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

export default EditAppointmentForm;
