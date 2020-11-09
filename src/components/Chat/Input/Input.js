import React from 'react';

import { connect } from 'react-redux';
import { setMessage } from '../../../redux/actions';

import SVG from 'react-inlinesvg';
import send from '../../../icons/send.svg';

import s from './Input.module.css';

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className={s.container}>
      <input
        className={s.inpt}
        type='text'
        placeholder='Type a message'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
      />
      <button className={s.btn} onClick={(event) => sendMessage(event)}>
        <SVG src={send} className={s.mm6} />
      </button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.chat.message,
  };
};

export default connect(mapStateToProps, { setMessage })(Input);
