import React from 'react';
import './App.css';
import Registration from './components/Registration';
import StudentPortal from './components/StudentPortal';
import Login from './views/Login.view';

function App() {
  return (
    <div className="App">
      {
        // if user is logged in, show app, otherwise show
      }

      <Login /> 

      <Registration />
      {/* < StudentPortal /> */}
    </div>
  );
}

export default App;
