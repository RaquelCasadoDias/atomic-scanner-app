import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {scanStarted} from './actions';
import {FailScreen} from './scanFailScreen';

interface ScannerProps {
  dispatchScannerRequest: (data: string) => void;
}

export class Scanner extends React.Component<{}, ScannerProps> {
  static navigationOptions = {
    header: null,
  };

  onSuccess = (e: any) => this.props.dispatchScannerRequest(e.data);

  render() {
    return (
      <QRCodeScanner
        permissionDialogTitle={'Camera request'}
        permissionDialogMessage={
          'Click on the screen to grant Atomic Scanner permission to access your camera'
        }
        checkAndroid6Permissions
        onRead={this.onSuccess}
        notAuthorizedView={<FailScreen />}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchScannerRequest: (data: string) => dispatch(scanStarted(data)),
});

export const ScannerScreen = connect(
  null,
  mapDispatchToProps,
)(Scanner);
