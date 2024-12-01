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
    <div>
      <h2>Employee Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {employee ? (
        <div>
          <p>Name: {employee.first_name} {employee.last_name}</p>
          <p>Email: {employee.email}</p>
          <p>Position: {employee.position}</p>
          <p>Salary: {employee.salary}</p>
          <p>Department: {employee.department}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewEmployee;
