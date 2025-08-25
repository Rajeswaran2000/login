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
    dispatch(updateUser({ id: editId, name: editName }));
    setEditId(null);
    setEditName('');
  };

  return (
    <ul>
      {users.map(user => (
        <li key={user.id} className="flex items-center justify-between mb-2">
          {editId === user.id ? (
            <>
              <input
                className="border p-1 mr-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <button onClick={saveEdit} className="bg-green-500 text-white px-2 py-1 mr-2">Save</button>
            </>
          ) : (
            <>
              <span>{user.name}</span>
              <div>
                <button onClick={() => startEdit(user)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
                <button onClick={() => dispatch(deleteUser(user.id))} className="bg-red-500 text-white px-2 py-1">Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;