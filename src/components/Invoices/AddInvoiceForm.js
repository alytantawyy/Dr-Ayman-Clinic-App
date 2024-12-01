import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function AddInvoiceForm({ onInvoiceAdded }) {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientid: '',
    invoicedate: '',
    totalamount: '',
    status: 'Pending',
  });

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) {
        console.error('Error fetching patients:', error);
      } else {
        setPatients(data || []);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from('invoices').insert([formData]);
    if (error) {
      console.error('Error adding invoice:', error);
      alert('Failed to add invoice.');
    } else {
      alert('Invoice added successfully!');
      onInvoiceAdded(); // Notify the parent to refresh the list
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Invoice</h2>
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

      <label>Invoice Date</label>
      <input
        type="date"
        name="invoicedate"
        value={formData.invoicedate}
        onChange={handleChange}
        required
      />

      <label>Total Amount</label>
      <input
        type="number"
        name="totalamount"
        value={formData.totalamount}
        onChange={handleChange}
        step="0.01"
        min="0"
        required
      />

      <label>Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <button type="submit" style={styles.submitButton}>Add Invoice</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddInvoiceForm;
