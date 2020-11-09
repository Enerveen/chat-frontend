import React, { useEffect } from 'react';
//I used query-string for easier parsing of URL
import queryString from 'query-string';
import io from 'socket.io-client';

import { connect } from 'react-redux';
import { setName, setRoom, setUsers, setMessages, setMessage } from '../../redux/actions';

import Users from './Users/Users';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';

import s from './Chat.module.css';

let socket;

const Chat = ({ location, message, setName, setRoom, setUsers, setMessages, setMessage }) => {
  //I tried to use enviroment variables here, but for some reason it didn't work

  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room);
    setName(name);

    socket = io(ENDPOINT);

    //Handling new user joining
    socket.emit('join', { name, room }, (error) => {
      /*When a user wants to invite somebody to chat room, he sends the link, that contains his username,
      that is why, when new user joins the chat using this link "Already existing user" error appears
      naturally (except rare situations, when user changes username in the link itself). Pretty sure,
      there can be better solution for handling new user joining, but i chose this :/ */

      if (error === 'Already existing user') {
        let newName = prompt(`Choose your username for ${room}`);
        if (newName && RegExp('^(?!system$)(?=.{3,16}$)[a-zA-Z0-9]').test(newName)) {
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
  }, [location.search]);

  //Handling new messages coming from server

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(message);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  /*I tried to put sendMessage function inside Input component,but there are problems with transferring socket
    either as a prop and with redux, that is why I need to transfer the function itself as a prop*/

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className={s.chat}>
      <InfoBar />
      <div className={s.middle}>
        <Users />
        <Messages />
      </div>
      <Input sendMessage={sendMessage} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.chat.message,
  };
};

export default connect(mapStateToProps, { setName, setRoom, setUsers, setMessages, setMessage })(Chat);
