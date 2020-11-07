import { combineReducers } from 'redux';

import dataReducer from './dataReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  chat: chatReducer,
});

export default rootReducer;
