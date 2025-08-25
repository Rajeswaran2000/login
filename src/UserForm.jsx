import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './userSlice';

const UserForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addUser({ name }));
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 mr-2"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">
        Add User
      </button>
    </form>
  );
};

export default UserForm;