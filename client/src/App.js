import React from 'react';
import './App.css';
import Registration from './components/Registration';
import { Router } from '@reach/router';
import StudentPortal from './components/StudentPortal';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/login" /> 
        <Registration path="/register" />
        <StudentPortal path="/portal"/>
      </Router>
    </div>
  );
}

export default App;
