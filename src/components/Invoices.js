import React, { useState } from 'react';
import InvoicesList from './Invoices/InvoicesList';
import AddInvoiceForm from './Invoices/AddInvoiceForm';
import EditInvoiceForm from './Invoices/EditInvoiceForm';
import InvoiceDetails from './Invoices/InvoiceDetails';

function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleInvoiceSelected = (invoice) => {
    setSelectedInvoice(invoice);
    setShowAddForm(false);
    setEditingInvoice(null);
  };

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setSelectedInvoice(null);
    setShowAddForm(false);
  };

  const handleInvoiceAdded = () => {
    setShowAddForm(false);
  };

  const handleInvoiceUpdated = () => {
    setEditingInvoice(null);
  };

  const handleDiscardChanges = () => {
    setEditingInvoice(null); // Close the edit form without saving
  };

  return (
    <div style={styles.container}>
      {!selectedInvoice && !editingInvoice && !showAddForm && (
        <div>
          <button onClick={() => setShowAddForm(true)} style={styles.button}>
            Add New Invoice
          </button>
          <InvoicesList
            onSelectInvoice={handleInvoiceSelected}
            onEditInvoice={handleEditInvoice}
          />
        </div>
      )}
      {showAddForm && (
        <AddInvoiceForm onInvoiceAdded={handleInvoiceAdded} />
      )}
      {editingInvoice && (
        <EditInvoiceForm
          invoice={editingInvoice}
          onInvoiceUpdated={handleInvoiceUpdated}
          onDiscard={handleDiscardChanges}
        />
      )}
      {selectedInvoice && (
        <InvoiceDetails
          invoice={selectedInvoice}
          onBack={() => setSelectedInvoice(null)}
          onEdit={handleEditInvoice}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url('https://worldkings.org/Userfiles/Upload/images/Aswan%202.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    color: 'white',
  },
  button: {
    marginBottom: '20px',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Invoices;
