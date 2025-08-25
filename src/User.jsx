import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import UserForm from "./UserForm";
import UserList from "./UserList";

const User = () => (
  <Provider store={store}>
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management with Redux</h1>
      <UserForm />
      <UserList />
    </div>
  </Provider>
);

export default User;