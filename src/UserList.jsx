import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, updateUser } from './userSlice';

const UserList = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const startEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name);
  };

  const saveEdit = () => {
    if (editName.trim()) {
      dispatch(updateUser({ id: editId, name: editName }));
      setEditId(null);
      setEditName('');
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
  };

  if (users.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 text-center">
        <div className="text-gray-300 text-lg mb-2">No users yet</div>
        <p className="text-gray-400">Add your first user using the form above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
      <h3 className="text-xl font-semibold text-white mb-6 text-center">User List</h3>
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
            {editId === user.id ? (
              <div className="flex items-center gap-3 flex-1">
                <input
                  className="flex-1 px-3 py-2 bg-white/20 text-white rounded-lg border border-white/30 focus:ring-2 focus:ring-indigo-400 focus:outline-none placeholder-gray-300"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter new name"
                />
                <button 
                  onClick={saveEdit} 
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Save
                </button>
                <button 
                  onClick={cancelEdit} 
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className="text-white font-medium text-lg">{user.name}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => startEdit(user)} 
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => dispatch(deleteUser(user.id))} 
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;