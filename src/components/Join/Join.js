import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { setName, setRoom } from '../../redux/actions';

import s from './Join.module.css';

const Join = ({ setName, setRoom, name, room, setSocket }) => {
  //Username validation

  const NameHandler = (event) => {
    if (!RegExp('^(?!system$)(?=.{3,16}$)[a-zA-Z0-9]').test(name)) {
      event.preventDefault();
      document.querySelector(`.${s.inpt}`).style.border = '2px solid red';
      document.querySelector(`.${s.err}`).innerHTML =
        'Username be alphanumeric and minimum 3 characters long, but no longer than 16 characters. Also, it must not be "system"';
    }
  };
  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        <h1>Join</h1>
        <hr />
        <input
          className={s.inpt}
          placeholder='Choose username'
          type='text'
          onChange={(event) => {
            setName(event.target.value);
            setRoom(`${event.target.value}'s room`);
          }}
        />
        <span className={s.err}></span>
        <Link onClick={NameHandler} to={`/chat?name=${name}&room=${room}`}>
          <button type='submit' className={s.btn}>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.data.name,
    room: state.data.room,
  };
};

export default connect(mapStateToProps, { setName, setRoom })(Join);
