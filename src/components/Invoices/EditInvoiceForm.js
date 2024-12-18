import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function EditInvoiceForm({ invoice, onInvoiceUpdated, onDiscard }) {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientid: '',
    invoicedate: '',
    totalamount: '',
    status: 'Pending',
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

  useEffect(() => {
    if (invoice && patients.length > 0) {
      setFormData({
        patientid: invoice.patientid || '',
        invoicedate: formatDateForInput(invoice.invoicedate),
        totalamount: invoice.totalamount || '',
        status: invoice.status || 'Pending',
      });
    }
  }, [invoice, patients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      patientid: formData.patientid,
      invoicedate: formData.invoicedate,
      totalamount: parseFloat(formData.totalamount),
      status: formData.status,
    };

    const { error } = await supabase
      .from('invoices')
      .update(updatedData)
      .eq('invoiceid', invoice.invoiceid);

    if (error) {
      console.error('Error updating invoice:', error);
      alert('Failed to update invoice.');
    } else {
      alert('Invoice updated successfully!');
      onInvoiceUpdated();
    }
  };

  if (patients.length === 0) {
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
        <h2 style={styles.title}>Edit Invoice</h2>

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

export default EditInvoiceForm;
