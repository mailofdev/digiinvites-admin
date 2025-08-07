import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
// import templateReducer from '../features/templates/templateSlice';

const rootReducer = combineReducers({
  auth: authReducer,
//   templates: templateReducer,
  // add more slices
});

export default rootReducer;
