const initialState = { users: [], messages: [], message: '' };

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
