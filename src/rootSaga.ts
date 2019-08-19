import {all} from '@redux-saga/core/effects';
import {scanWatcher} from './screens/scanner/saga';

export default function* rootSaga() {
  yield all([scanWatcher()]);
}
