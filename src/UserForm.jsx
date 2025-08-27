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
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">Add New User</h3>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <div className="flex-1 w-full">
          <input
            className="w-full px-4 py-3 bg-white/20 text-white rounded-xl border border-white/30 focus:ring-2 focus:ring-indigo-400 focus:outline-none placeholder-gray-300 transition-all duration-200"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
          />
        </div>
        <button
          className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto"
          type="submit"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
