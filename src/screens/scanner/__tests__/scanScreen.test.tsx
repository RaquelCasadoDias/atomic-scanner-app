import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ReactTestRenderer from 'react-test-renderer';
import {Scanner} from '../scanScreen';

describe('Scanner screen', () => {
  const dispatchScannerRequestMock = jest.fn();
  const render = ReactTestRenderer.create(
    <Scanner dispatchScannerRequest={dispatchScannerRequestMock} />,
  );

  it('Matches Snapshot', () => {
    expect(render.toJSON()).toMatchSnapshot();
  });

  it('Dispatches Scanner Request Action', () => {
    const qrCodeScanner = render.root.findByType(QRCodeScanner).instance.props;
    qrCodeScanner.onRead!({data: 'data'});
    expect(dispatchScannerRequestMock).toBeCalledWith('data');
  });

  it('Asks for camera permission', () => {
    const qrCodeScanner = render.root.findByType(QRCodeScanner).instance.props;
    expect(qrCodeScanner.checkAndroid6Permissions).toBeTruthy();
  });
});
