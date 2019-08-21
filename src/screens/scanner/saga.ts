import {all, put, takeEvery} from '@redux-saga/core/effects';
import {AnyAction} from 'redux';
import {call} from 'redux-saga-test-plan/matchers';
import {navigate} from '../../services/navigation/navigationService';
import {scanFailed, scanSucceeded} from './actions';
import {
  notificationType,
  QRCodeNotification,
  SCAN_STARTED,
  SnackbarNotification,
} from './actionTypes';
import {storeNotification} from '../../services/notification/actions';

export function* scanWorker(action: AnyAction) {
  try {
    const result = action.data;
    let notification: SnackbarNotification | QRCodeNotification;
    if (result !== undefined) {
      yield put(scanSucceeded(result));
      yield call(navigate, 'Home');
      notification = {
        type: notificationType.DIALOG,
        title: 'This is the link from the QR code',
        text: result,
        ok: 'Visite website',
        cancel: 'Cancel',
      };
      yield put(storeNotification(notification));
    } else {
      notification = {
        type: notificationType.SNACKBAR,
        text: 'Something went wrong. Please try again',
      };

      yield put(scanFailed('Fail to read data'));
    }
    yield put(storeNotification(notification));
  } catch (e) {
    const notification: SnackbarNotification = {
      type: notificationType.SNACKBAR,
      text: 'Something went wrong. Please try again',
    };
    yield put(storeNotification(notification));
    yield put(scanFailed(e.message));
  }
}

export function* scanWatcher() {
  yield all([takeEvery(SCAN_STARTED, scanWorker)]);
}
