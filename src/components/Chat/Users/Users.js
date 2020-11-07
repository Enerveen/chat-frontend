import React from 'react';

import { connect } from 'react-redux';

import s from './Users.module.css';

const Users = ({ users }) => (
  <div className={s.users}>
    <h2>Users in this chat:</h2>
    {users.map((user, i) => (
      <p key={i}>{user.name}</p>
    ))}
  </div>
);

const mapStateToProps = (state) => {
  return {
    users: state.chat.users,
  };
};

export default connect(mapStateToProps, null)(Users);
