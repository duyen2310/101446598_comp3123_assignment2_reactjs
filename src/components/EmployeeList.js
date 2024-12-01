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

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');  
    } else {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get('https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees');
          console.log('API Response:', response);
          setEmployees(response.data);  
        } catch (err) {
          setError('Failed to fetch employees');
          console.error('Error fetching employees:', err);
        }
      };

      fetchEmployees();
    }
  }, [navigate]);
//LOGOUT
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };
//DELETE
  const handleDeleteSuccess = () => {
    // refresh the employee list after deletion
    setEmployees(employees.filter(employee => employee._id !== selectedEmployeeId));
    setSelectedEmployeeId(null); // reset the selected employee ID
  };

  const handleDeleteClick = (id) => {
    setSelectedEmployeeId(id); // set the selected employee ID
  };


//ADD EMPLOYEE
  const handleAddEmployee = () => {
    navigate('/employees/add');
  };
  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{employee.first_name} {employee.last_name}</td>
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
