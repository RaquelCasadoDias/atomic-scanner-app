import {AnyAction} from 'redux';
import {SCAN_FAILED, SCAN_STARTED, SCAN_SUCCEEDED} from './actionTypes';

const initialState = {
  error: '',
  result: '',
  inProgress: false,
};

interface ScanState {
  error: string;
  result: string;
  inProgress: boolean;
}

export default function scanReducer(
  state: ScanState = initialState,
  action: AnyAction,
): ScanState {
  switch (action.type) {
    case SCAN_STARTED:
      return {...state, inProgress: true};
    case SCAN_FAILED:
      return {...state, inProgress: false, error: action.payload.error};
    case SCAN_SUCCEEDED:
      return {...state, inProgress: false, result: action.payload.result};
    default:
      return state;
  }
}
