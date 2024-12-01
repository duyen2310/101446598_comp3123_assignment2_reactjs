import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'; // Import the logout action
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const dispatch = useDispatch(); // To dispatch Redux actions
  const navigate = useNavigate(); // To navigate to different pages
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');  // Redirect to login if no token
    } else {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get('https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees');
          console.log('API Response:', response);
          setEmployees(response.data);  // Set the state with the employee data
        } catch (err) {
          setError('Failed to fetch employees');
          console.error('Error fetching employees:', err);
        }
      };

      fetchEmployees();
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    // Dispatch logout action to clear token from Redux store
    dispatch(logout());

    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      
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
