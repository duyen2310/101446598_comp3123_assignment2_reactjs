// src/pages/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'; 
import { useNavigate } from 'react-router-dom';
import DeleteEmployee from './Employee/DeleteEmployee';
import './style/EmployeeList.css';  // Import the updated CSS

// Font Awesome imports for icons
import { FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeList = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch employees based on search query
  const fetchEmployees = async (query = '') => {
    try {
      const url = query
        ? `https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employee/search?search=${query}`
        : 'https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees'; 

      const response = await axios.get(url);
      setEmployees(response.data);  
      setError('');
    } catch (err) {
      setError('Not Found Employees');
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');  
    } else {
      fetchEmployees(); // Fetch employees on initial load
    }
  }, [navigate]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  const handleSearch = () => {
    fetchEmployees(searchQuery);  
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeleteSuccess = () => {
    setEmployees(employees.filter(employee => employee._id !== selectedEmployeeId));
    setSelectedEmployeeId(null); 
  };

  const handleDeleteClick = (id) => {
    setSelectedEmployeeId(id); 
  };

  // Add new employee handler
  const handleAddEmployee = () => {
    navigate('/employees/add');
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">Logout</button> 

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search employees by name, email, position..."
          value={searchQuery}
          onChange={handleSearchChange} 
          className="search-input"
        />
        <button 
          onClick={handleSearch} 
          className="search-button"
        >
          <FaSearch /> {/* Search Icon */}
        </button>
      </div>

      {/* Table for Employee Data */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.first_name} {employee.last_name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>
                  <button
                    onClick={() => navigate(`/employees/view/${employee._id}`)}
                    className="view-button"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => navigate(`/employees/edit/${employee._id}`)}
                    className="edit-button"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(employee._id)} 
                    className="delete-button"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-employees">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={handleAddEmployee} className="add-employee-button">Add New Employee</button>

      {/* Conditional rendering of DeleteEmployee */}
      {selectedEmployeeId && (
        <DeleteEmployee 
          employeeId={selectedEmployeeId} 
          onDeleteSuccess={handleDeleteSuccess} 
        />
      )}
    </div>
  );
};

export default EmployeeList;
