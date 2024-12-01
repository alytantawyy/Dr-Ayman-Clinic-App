import React from 'react';

function InvoiceDetails({ invoice, onBack, onEdit }) {
  return (
    <div style={styles.container}>
      <h2>Invoice Details</h2>
      <p>
        <strong>Patient:</strong> {invoice.patients.firstname}{' '}
        {invoice.patients.lastname}
      </p>
      <p>
        <strong>Date:</strong>{' '}
        {new Date(invoice.invoicedate).toLocaleDateString()}
      </p>
      <p>
        <strong>Total Amount:</strong> ${invoice.totalamount.toFixed(2)}
      </p>
      <p>
        <strong>Status:</strong> {invoice.status}
      </p>
      <div style={styles.buttonContainer}>
        <button onClick={onBack} style={styles.button}>
          Back to List
        </button>
        <button onClick={() => onEdit(invoice)} style={styles.editButton}>
          Edit
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    maxWidth: '500px',
    margin: '0 auto',
    color: 'black'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default InvoiceDetails;
