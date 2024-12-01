import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteEmployee = ({ employeeId, onDeleteSuccess }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees?eid=${employeeId}`);
      console.log('Employee deleted:', response.data);
      onDeleteSuccess(); 
      navigate('/employees');
    } catch (err) {
      setError('Failed to delete employee');
      console.error('Error deleting employee:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete this employee?</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button 
        onClick={handleDelete} 
        disabled={loading} 
        style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }}
      >
        {loading ? 'Deleting...' : 'Delete Employee'}
      </button>
      <button
        onClick={() => navigate('/employees')}
        style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteEmployee;
