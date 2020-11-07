import React from 'react';

//I used react-scroll-to-bottom for better chat appearance and improvig of UX

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import s from './Messages.module.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className={s.container}>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
