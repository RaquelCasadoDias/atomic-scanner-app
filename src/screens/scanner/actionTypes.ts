export const SCAN_STARTED = 'SCAN_STARTED';
export const SCAN_FAILED = 'SCAN_FAILED';
export const SCAN_SUCCEEDED = 'SCAN_SUCCEEDED';

export interface QRCodeNotification {
  title: string;
  text: string;
  ok: string;
  cancel: string;
}
