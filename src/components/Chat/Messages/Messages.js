import React from 'react';

//I used react-scroll-to-bottom for better chat appearance and improvig of UX

import ScrollToBottom from 'react-scroll-to-bottom';

import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
  return {
    name: state.data.name,
    messages: state.chat.messages,
  };
};

export default connect(mapStateToProps, null)(Messages);
