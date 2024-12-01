import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees');  // Correct API endpoint
        console.log('API Response:', response);  // Log the full response
        setEmployees(response.data);  // Set the state with the employee data
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, []);  // Empty dependency array ensures this runs once on component mount

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
