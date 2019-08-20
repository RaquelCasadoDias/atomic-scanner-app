export const SCAN_STARTED = 'SCAN_STARTED';
export const SCAN_FAILED = 'SCAN_FAILED';
export const SCAN_SUCCEEDED = 'SCAN_SUCCEEDED';

export enum notificationType {
  DIALOG = 'DIALOG',
  SNACKBAR = 'SNACKBAR',
}

export interface QRCodeNotification {
  type: string;
  title: string;
  text: string;
  ok: string;
  cancel: string;
}

export interface SnackbarNotification {
  type: string;
  text: string;
}
