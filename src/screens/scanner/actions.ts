import {SCAN_FAILED, SCAN_STARTED, SCAN_SUCCEEDED} from './actionTypes';

export function scanStarted(data: string) {
  return {
    type: SCAN_STARTED,
    data,
  };
}
export function scanFailed(error: string) {
  return {
    type: SCAN_FAILED,
    payload: {
      error,
    },
  };
}
export function scanSucceeded(result: string) {
  return {
    type: SCAN_SUCCEEDED,
    payload: {
      result,
    },
  };
}
