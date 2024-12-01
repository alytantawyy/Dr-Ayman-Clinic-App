import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function StaffList({ onSelectStaff, onEditStaff }) {
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase.from('staff').select('*');
      if (error) console.error('Error fetching staff:', error);
      else setStaff(data);
      setLoading(false);
    };

    fetchStaff();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredStaff = staff.filter(
    (member) =>
      member.firstname.toLowerCase().includes(searchQuery) ||
      member.lastname.toLowerCase().includes(searchQuery) ||
      member.role.toLowerCase().includes(searchQuery)
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Staff</h1>
      <input
        type="text"
        placeholder="Search by name or role"
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      <ul>
        {filteredStaff.map((member) => (
          <li key={member.staffid} style={styles.staffItem}>
            <p style={styles.staffInfo}>
              {member.firstname} {member.lastname} - {member.role}
            </p>
            <div style={styles.buttonContainer}>
              <button onClick={() => onSelectStaff(member)}>View</button>
              <button onClick={() => onEditStaff(member)}>Edit</button>
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
  staffItem: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#C2B280',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  staffInfo: {
    flexGrow: 1,
  },
};

export default StaffList;
