// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import ViewEmployee from './components/Employee/ViewEmployee';
import EditEmployee from './components/Employee/EditEmployee';
import HomePage from './HomePage'; 
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Landing page route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/view/:id" element={<ViewEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
