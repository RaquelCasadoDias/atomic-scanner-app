import {AnyAction} from 'redux';
import {CLEAR_NOTIFICATION, STORE_NOTIFICATION} from './actionTypes';

interface NotificationState {
  notification: object;
  visible: boolean;
}

const initialState = {
  notification: {},
  visible: false,
};

export function notificationReducer(
  state: NotificationState = initialState,
  action: AnyAction,
): NotificationState {
  switch (action.type) {
    case STORE_NOTIFICATION:
      return {
        ...state,
        notification: action.payload.notification,
        visible: true,
      };
    case CLEAR_NOTIFICATION:
    default:
      return {...state, notification: {}, visible: false};
  }
}
