import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function AppointmentsList({ onSelectAppointment, onEditAppointment }) {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          appointmentid,
          appointmentdate,
          status,
          notes,
          patients (firstname, lastname),
          staff (firstname, lastname, role)
        `);

      if (error) console.error('Error fetching appointments:', error);
      else setAppointments(data);
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = `${appointment.patients.firstname} ${appointment.patients.lastname}`.toLowerCase();
    const staffName = `${appointment.staff.firstname} ${appointment.staff.lastname}`.toLowerCase();
    return (
      patientName.includes(searchQuery) ||
      staffName.includes(searchQuery) ||
      appointment.appointmentdate.toLowerCase().includes(searchQuery)
    );
  });

  // Sort appointments by patient name
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const patientNameA = `${a.patients.firstname} ${a.patients.lastname}`.toLowerCase();
    const patientNameB = `${b.patients.firstname} ${b.patients.lastname}`.toLowerCase();
    return patientNameA.localeCompare(patientNameB);
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Appointments</h1>
      <input
        type="text"
        placeholder="Search by patient, staff, or date"
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      <ul>
        {sortedAppointments.map((appointment) => (
          <li key={appointment.appointmentid} style={styles.appointmentItem}>
            <p>
              <strong>Patient:</strong> {appointment.patients.firstname} {appointment.patients.lastname} <br />
              <strong>Staff:</strong> {appointment.staff.firstname} {appointment.staff.lastname} ({appointment.staff.role}) <br />
              <strong>Date:</strong> {new Date(appointment.appointmentdate).toLocaleString()} <br />
              <strong>Status:</strong> {appointment.status}
            </p>
            <div style={styles.buttonContainer}>
              <button onClick={() => onSelectAppointment(appointment)}>View</button>
              <button onClick={() => onEditAppointment(appointment)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center', // Center the heading
  },
  searchInput: {
    padding: '10px',
    width: '100%',
    marginBottom: '20px',
    fontSize: '16px',
  },
  appointmentItem: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C2B280',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
};

export default AppointmentsList;
