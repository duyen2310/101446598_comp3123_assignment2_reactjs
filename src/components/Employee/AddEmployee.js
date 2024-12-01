import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    department: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees', formData);
      navigate('/employees'); 
    } catch (err) {
      setError('Failed to add employee');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
        <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
