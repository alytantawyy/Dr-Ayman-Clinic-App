import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function AddAppointmentForm({ onAppointmentAdded }) {
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
      else console.log('Fetched patients:', patientsData);

      const { data: staffData, error: staffError } = await supabase.from('staff').select('*');
      if (staffError) console.error('Error fetching staff:', staffError);
      else console.log('Fetched staff:', staffData);

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
    console.log('Form data being submitted:', formData);

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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Appointment</h2>
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
      <input
        type="datetime-local"
        name="appointmentdate"
        value={formData.appointmentdate}
        onChange={handleChange}
        required
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Scheduled">Scheduled</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={formData.notes}
        onChange={handleChange}
      />
      <button type="submit">Add Appointment</button>
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

export default AddAppointmentForm;
