import {CLEAR_NOTIFICATION, STORE_NOTIFICATION} from './actionTypes';

export function storeNotification(notification: object) {
  return {
    type: STORE_NOTIFICATION,
    payload: {
      notification,
    },
  };
}

export function clearNotification() {
  return {
    type: CLEAR_NOTIFICATION,
  };
}
