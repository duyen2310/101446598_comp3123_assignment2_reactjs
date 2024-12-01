import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    department: '',
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch employee details');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://101446598-comp-3123-assignment1.vercel.app/api/v1/emp/employees/${id}`, formData);
      navigate('/employees'); 
    } catch (err) {
      setError('Failed to update employee');
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
        <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
