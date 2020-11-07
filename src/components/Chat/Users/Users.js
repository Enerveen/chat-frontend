import React from 'react';

import s from './Users.module.css';

const Users = ({ users }) => (
  <div className={s.users}>
    <h2>Users in this chat:</h2>
    {users.map((user, i) => (
      <p key={i}>{user.name}</p>
    ))}
  </div>
);

export default Users;
