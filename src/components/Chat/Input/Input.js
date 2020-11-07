import React from 'react';
import s from './Input.module.css';
import SVG from 'react-inlinesvg';
import send from '../../../icons/send.svg';

const Input = ({ message, setMessage, sendMessage }) => (
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

export default Input;
