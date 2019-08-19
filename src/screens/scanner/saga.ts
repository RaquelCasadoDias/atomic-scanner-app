import {all, put, takeEvery} from '@redux-saga/core/effects';
import {AnyAction} from 'redux';
import {call} from 'redux-saga-test-plan/matchers';
import {navigate} from '../../services/navigation/navigationService';
import {scanFailed, scanSucceeded} from './actions';
import {QRCodeNotification, SCAN_STARTED} from './actionTypes';
import {storeNotification} from '../../services/notification/actions';

export function* scanWorker(action: AnyAction) {
  try {
    const result = action.data;
    if (result !== undefined) {
      yield put(scanSucceeded(result));
      yield call(navigate, 'Home');
      const notification: QRCodeNotification = {
        title: 'This is the link from the QR code',
        text: result,
        ok: 'Visite website',
        cancel: 'Cancel',
      };
      yield put(storeNotification(notification));
    }
  } catch (e) {
    yield put(scanFailed(e.message));
  }
}

export function* scanWatcher() {
  yield all([takeEvery(SCAN_STARTED, scanWorker)]);
}
