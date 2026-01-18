import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

const CREATE_EMP = gql`
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id name email department salary status
    }
  }
`;

const GET_ACTIVE = gql`query { activeEmployees { id name email department salary status } }`;

export default function EmployeeForm() {
  const [form, setForm] = useState({ name: '', email: '', department: '', salary: '' });
  const [msg, setMsg] = useState('');
  const [createEmployee, { loading }] = useMutation(CREATE_EMP, {
    refetchQueries: [{ query: GET_ACTIVE }]
  });

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const salary = Number(form.salary);
      // eslint-disable-next-line no-unused-vars
      const res = await createEmployee({ variables: { input: { ...form, salary } } });
      setMsg('Employee added');
      setForm({ name: '', email: '', department: '', salary: '' });
    } catch (err) {
      setMsg(err.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={submit}>
        <div><input required placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
        <div><input required placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        <div><input placeholder="Department" value={form.department} onChange={e => setForm({...form, department: e.target.value})} /></div>
        <div><input required placeholder="Salary" type="number" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} /></div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading}>Add</button>
        </div>
      </form>
      <div style={{ color: 'green', marginTop: 8 }}>{msg}</div>
    </div>
  );
}