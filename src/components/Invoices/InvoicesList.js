import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function InvoicesList({ onSelectInvoice, onEditInvoice }) {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          invoiceid,
          invoicedate,
          totalamount,
          status,
          patients (firstname, lastname)
        `);

      if (error) {
        console.error('Error fetching invoices:', error);
      } else {
        setInvoices(data || []);
      }
      setLoading(false);
    };

    fetchInvoices();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const patientName = `${invoice.patients.firstname} ${invoice.patients.lastname}`.toLowerCase();
    return (
      patientName.includes(searchQuery) ||
      invoice.status.toLowerCase().includes(searchQuery) ||
      invoice.invoicedate.toLowerCase().includes(searchQuery)
    );
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Invoices</h1>
      <input
        type="text"
        placeholder="Search by patient or status"
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      <ul>
        {filteredInvoices.map((invoice) => (
          <li key={invoice.invoiceid} style={styles.invoiceItem}>
            <p>
              <strong>Patient:</strong> {invoice.patients.firstname} {invoice.patients.lastname} <br />
              <strong>Date:</strong> {new Date(invoice.invoicedate).toLocaleDateString()} <br />
              <strong>Total:</strong> ${invoice.totalamount.toFixed(2)} <br />
              <strong>Status:</strong> {invoice.status}
            </p>
            <div style={styles.buttonContainer}>
              <button onClick={() => onSelectInvoice(invoice)}>View</button>
              <button onClick={() => onEditInvoice(invoice)}>Edit</button>
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
  invoiceItem: {
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

export default InvoicesList;
