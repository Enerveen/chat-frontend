export function setName(data) {
  return {
    type: 'SET_NAME',
    payload: data,
  };
}

export function setRoom(data) {
  return {
    type: 'SET_ROOM',
    payload: data,
  };
}

export function setUsers(data) {
  return {
    type: 'SET_USERS',
    payload: data,
  };
}

export function setMessages(data) {
  return {
    type: 'SET_MESSAGES',
    payload: data,
  };
}

export function setMessage(data) {
  return {
    type: 'SET_MESSAGE',
    payload: data,
  };
}
