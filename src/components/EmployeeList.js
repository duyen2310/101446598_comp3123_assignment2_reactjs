import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import AuthContext

const EmployeeList = () => {
  const { user } = useAuth(); // Access user from AuthContext
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    const token = localStorage.getItem('token'); // Retrieve the token
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          'https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees',
          {
            headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
          }
        );
        setEmployees(response.data); // Set employee data
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, [user, navigate]); // Run the effect when user or navigate changes

  return (
    <div>
      <h2>Employee List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.first_name} {employee.last_name}</td> {/* Combine first and last name */}
                <td>{employee.position}</td>
                <td>{employee.department}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
