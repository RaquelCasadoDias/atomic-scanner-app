import {scanWatcher, scanWorker} from '../saga';
import {
  notificationType,
  QRCodeNotification,
  SCAN_STARTED,
  SnackbarNotification,
} from '../actionTypes';
import {expectSaga, testSaga} from 'redux-saga-test-plan';
import {scanFailed, scanSucceeded} from '../actions';
import {navigate} from '../../../services/navigation/navigationService';
import {takeEvery} from 'redux-saga/effects';
import {storeNotification} from '../../../services/notification/actions';

describe('Scanner saga', () => {
  let notification: QRCodeNotification | SnackbarNotification = {
    type: notificationType.DIALOG,
    title: 'This is the link from the QR code',
    text: 'www.google.com',
    ok: 'Visite website',
    cancel: 'Cancel',
  };

  it('Watches for a scanner request', () => {
    testSaga(scanWatcher)
      .next()
      .all([takeEvery(SCAN_STARTED, scanWorker)])
      .next()
      .isDone();
  });

  it('Dispatches a scanSucceeded action with data as argument', () => {
    return expectSaga(scanWorker, {type: '', data: 'www.google.com'})
      .put(scanSucceeded('www.google.com'))
      .call(navigate, 'Home')
      .put(storeNotification(notification))
      .run();
  });

  it('Dispatches a scanFailed action when is not able to read data from action', () => {
    notification = {
      type: notificationType.SNACKBAR,
      text: 'Something went wrong. Please try again',
    };

    return expectSaga(scanWorker, 'not_an_action')
      .put(storeNotification(notification))
      .put(scanFailed('Fail to read data'))
      .run();
  });

  it('Dispatches a scanFailed action when is not able to read action', () => {
    notification = {
      type: notificationType.SNACKBAR,
      text: 'Something went wrong. Please try again',
    };

    return expectSaga(scanWorker, null)
      .put(storeNotification(notification))
      .put(scanFailed("Cannot read property 'data' of null"))
      .run();
  });
});
