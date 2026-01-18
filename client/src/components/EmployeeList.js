import React from 'react';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';

const GET_ACTIVE = gql`
  query GetActiveEmployees {
    activeEmployees {
      id name email department salary status
    }
  }
`;

const DELETE_EMP = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id status
    }
  }
`;

const UPDATE_EMP = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id name email department salary status
    }
  }
`;

export default function EmployeeList() {
  const { data, loading, error, refetch } = useQuery(GET_ACTIVE);
  const [deleteEmployee] = useMutation(DELETE_EMP);
  const [updateEmployee] = useMutation(UPDATE_EMP);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error.message}</div>;

  const rows = data?.activeEmployees || [];

  const handleDelete = async (id) => {
    if (!window.confirm('Mark employee as INACTIVE?')) return;
    await deleteEmployee({ variables: { id } });
    refetch();
  };

  const handleEdit = async (emp) => {
    const name = prompt('Name', emp.name);
    if (name === null) return;
    const email = prompt('Email', emp.email);
    if (email === null) return;
    const department = prompt('Department', emp.department || '');
    if (department === null) return;
    const salaryStr = prompt('Salary', emp.salary);
    if (salaryStr === null) return;
    const salary = Number(salaryStr);
    try {
      await updateEmployee({ variables: { id: emp.id, input: { name, email, department, salary } } });
      refetch();
    } catch (err) {
      alert(err.message || 'Update failed');
    }
  };

  return (
    <div>
      <h2>Active Employees</h2>
      <button onClick={() => refetch()}>Refresh</button>
      <table border="1" cellPadding="8" style={{ marginTop: 10, borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Salary</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.department}</td>
              <td>{r.salary}</td>
              <td>
                <button onClick={() => handleEdit(r)}>Edit</button>{' '}
                <button onClick={() => handleDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan="6">No active employees</td></tr>}
        </tbody>
      </table>
    </div>
  );
}