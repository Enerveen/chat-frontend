import React from 'react';
import ReactEmoji from 'react-emoji';

import s from './Message.module.css';

const Message = ({ message: { text, user }, name }) => {
  let newDate = new Date();

  //Checking who is the author of the message to apply the correct markup for it.

  if (user === name.trim().toLowerCase()) {
    return (
      <div className={`${s.message} ${s.byMe}`}>
        <p>{`${newDate.getHours()}:${newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes()}`}</p>
        <div>
          <p className='username'>You</p>
          <p>{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    );
  } else if (user === 'system') {
    return (
      <div className={`${s.message} ${s.bySys}`}>
        <p>{text}</p>
      </div>
    );
  } else {
    return (
      <div className={s.message}>
        <div>
          <p className={s.username}>{user}</p>
          <p>{ReactEmoji.emojify(text)}</p>
        </div>
        <p>{`${newDate.getHours()}:${newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes()}`}</p>
      </div>
    );
  }
};

export default Message;
