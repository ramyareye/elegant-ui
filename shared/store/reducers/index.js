import {combineReducers} from 'redux';

import userReducer from './user';
import appReducer from './app';

const rootReducers = combineReducers({
  user: userReducer,
  app: appReducer,
});

export default rootReducers;
