import {combineReducers} from 'redux';

const initialState = {};

function todoApp(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  todoApp,
});
