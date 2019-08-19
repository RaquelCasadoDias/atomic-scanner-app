import {scanWatcher, scanWorker} from "../saga";
import {QRCodeNotification, SCAN_STARTED} from "../actionTypes";
import {expectSaga, testSaga} from "redux-saga-test-plan";
import {scanFailed, scanSucceeded} from "../actions";
import {navigate} from "../../../services/navigation/navigationService";
import { takeEvery } from "redux-saga/effects";
import {storeNotification} from "../../../services/notification/actions";

describe('Scanner saga', () => {
    const notification: QRCodeNotification = {
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
});