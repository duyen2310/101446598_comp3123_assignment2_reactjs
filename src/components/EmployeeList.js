import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'; 
import { useNavigate } from 'react-router-dom';
import DeleteEmployee from './Employee/DeleteEmployee';

const EmployeeList = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

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
    <div>
      <h2>Employee List</h2>
      <button onClick={handleLogout}>Logout</button> 

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search employees by name, email, position..."
          value={searchQuery}
          onChange={handleSearchChange} // Update search query on change
          style={{
            padding: '8px',
            width: '300px',
            marginBottom: '20px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button 
          onClick={handleSearch} 
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginLeft: '10px'
          }}
        >
          Search
        </button>
      </div>

      {/* Table for Employee Data */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Position</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Department</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee._id} style={{ textAlign: 'left' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {employee.first_name} {employee.last_name}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{employee.position}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{employee.department}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button
                    onClick={() => navigate(`/employees/view/${employee._id}`)}
                    style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/employees/edit/${employee._id}`)}
                    style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#FFA500', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(employee._id)} // Open delete modal
                    style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '8px' }}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={handleAddEmployee}>Add New Employee</button>

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
