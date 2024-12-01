import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee details');
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Employee Details</h2>
      {error && <p style={styles.error}>{error}</p>}
      {employee ? (
        <div style={styles.card}>
          <div style={styles.field}>
            <strong>Name:</strong> {employee.first_name} {employee.last_name}
          </div>
          <div style={styles.field}>
            <strong>Email:</strong> {employee.email}
          </div>
          <div style={styles.field}>
            <strong>Position:</strong> {employee.position}
          </div>
          <div style={styles.field}>
            <strong>Salary:</strong> ${employee.salary.toLocaleString()}
          </div>
          <div style={styles.field}>
            <strong>Department:</strong> {employee.department}
          </div>
        </div>
      ) : (
        <p style={styles.loading}>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fce4ec', // Light pastel pink background
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#ad1457', // Deep pink for header
  },
  card: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ffffff', // White card background
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  field: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#424242', // Neutral text color for readability
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#757575', // Subtle grey for loading text
  },
};

export default ViewEmployee;
