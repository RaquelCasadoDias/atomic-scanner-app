import {combineReducers} from 'redux';
import scanReducer from './screens/scanner/reducer';
import {notificationReducer} from './services/notification/reducer';

export default combineReducers({
  scanner: scanReducer,
  notification: notificationReducer,
});
