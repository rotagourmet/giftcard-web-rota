import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import { dashboard } from './dashboard/reducer';


const reducers = combineReducers({
  menu,
  settings,
  authUser,
  InfosDash: dashboard
});

export default reducers;