import React, { useState, useEffect } from 'react';
//I used query-string for easier parsing of URL
import queryString from 'query-string';
import io from 'socket.io-client';

import Users from './Users/Users';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';

import s from './Chat.module.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  //I tried to use enviroment variables here, but for some reason it didn't work

  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    //Handling new user joining
    socket.emit('join', { name, room }, (error) => {
      /*When a user wants to invite somebody to chat room, he sends the link, that contains his username,
      that is why, when new user joins the chat using this link "Already existing user" error appears
      naturally (except rare situations, when user changes username in the link itself). Pretty sure,
      there can be better solution for handling new user joining, but i chose this :/ */

      if (error === 'Already existing user') {
        let newName = prompt(`Choose your username for ${room}`);
        if (RegExp('^(?!system$)(?=.{3,16}$)[a-zA-Z0-9]').test(newName)) {
          window.location.href = `http://localhost:3000/chat?name=${newName}&room=${room}`;
        } else {
          alert(
            'Username be alphanumeric and minimum 3 characters long, but no longer than 16 characters. Also, it must not be "system"'
          );
          window.location.href = '';
        }
      } else {
        console.log(error);
      }
    });
  }, [ENDPOINT, location.search]);

  //Handling new messages coming from server

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  //Creating sendMessage function to transfer it to <Input /> element as a prop

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className={s.chat}>
      <InfoBar room={room} />
      <div className={s.middle}>
        <Users users={users} />
        <Messages messages={messages} name={name} />
      </div>
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
