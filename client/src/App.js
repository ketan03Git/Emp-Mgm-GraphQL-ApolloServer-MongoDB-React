import React from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Employee Management (GraphQL)</h1>
      <EmployeeForm />
      <hr />
      <EmployeeList />
    </div>
  );
}

export default App;