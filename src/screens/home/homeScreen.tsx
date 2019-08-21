import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import AtomicDialog from '../../components/dialog/dialog';
import {navigate} from '../../services/navigation/navigationService';
import {
  clearNotification,
  storeNotification,
} from '../../services/notification/actions';
import {requestPermission} from '../../services/permissions/permissions';
import {pickImage} from '../../services/scanner/scannerService';
import {theme} from '../../theme';
import {scanStarted} from '../scanner/actions';
import {
  notificationType,
  QRCodeNotification,
  SnackbarNotification,
} from '../scanner/actionTypes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: theme.colors.backgroundGrey,
    alignItems: 'center',
  },
  scanButtonView: {
    marginTop: 150,
    marginBottom: 30,
  },
  scanButton: {
    height: 100,
    width: 200,
  },
  photoGalleryButton: {
    height: 100,
    width: 200,
  },
  snackbar: {
    backgroundColor: theme.colors.red,
  },
});

interface HomeProps {
  notificationService: {
    notification: QRCodeNotification | SnackbarNotification;
    visible: boolean;
  };
  dispatchNotification: (notification: SnackbarNotification) => void;
  dispatchClearNotification: () => void;
  dispatchScannerRequest: (data: string) => void;
}

export class Home extends React.Component<HomeProps> {
  static navigationOptions = {
    header: null,
  };

  scanFromCamera = async () => {
    const permission = await requestPermission(['CAMERA']);
    if (permission === 'granted') {
      navigate('Scanner', {});
    } else if (permission === 'denied') {
      this.props.dispatchNotification({
        type: notificationType.SNACKBAR,
        text: 'Please grant permission to continue',
      });
    } else {
      this.props.dispatchNotification({
        type: notificationType.SNACKBAR,
        text: 'Something went wrong. Try again',
      });
    }
  };

  scanFromPhotoGallery = async () => {
    const permission = await requestPermission([
      'READ_EXTERNAL_STORAGE',
      'CAMERA',
    ]);
    if (permission === 'granted') {
      pickImage().then(result =>
        this.props.dispatchScannerRequest(result.result),
      );
    } else if (permission === 'denied') {
      this.props.dispatchNotification({
        type: notificationType.SNACKBAR,
        text: 'Please grant permission to continue',
      });
    } else {
      this.props.dispatchNotification({
        type: notificationType.SNACKBAR,
        text: 'Something went wrong. Try again',
      });
    }
  };

  onCancel = () => {
    this.props.dispatchClearNotification();
  };

  onOk = () => {
    Linking.openURL(this.props.notificationService.notification.text)
      .catch((err: any) => console.error('An error occured', err))
      .then(this.props.dispatchClearNotification());
  };

  render() {
    const {notificationService} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scanButtonView}>
          <TouchableHighlight id={'ScanButton'} onPress={this.scanFromCamera}>
            <Image
              style={styles.scanButton}
              source={require('../../../assets/images/scanButton.png')}
            />
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          id={'PhotoGalleryButton'}
          onPress={this.scanFromPhotoGallery}>
          <Image
            style={styles.photoGalleryButton}
            source={require('../../../assets/images/photoGalleryButton.png')}
          />
        </TouchableHighlight>
        <AtomicDialog
          title={
            notificationService.notification.title
              ? notificationService.notification.title
              : ''
          }
          text={
            notificationService.notification.text
              ? notificationService.notification.text
              : ''
          }
          cancelText={
            notificationService.notification.cancel
              ? notificationService.notification.cancel
              : ''
          }
          okText={
            notificationService.notification.ok
              ? notificationService.notification.ok
              : ''
          }
          cancelAction={this.onCancel}
          okAction={this.onOk}
          visible={
            notificationService.visible &&
            notificationService.notification.type === notificationType.DIALOG
          }
        />
        <Snackbar
          onDismiss={this.onCancel}
          style={styles.snackbar}
          visible={
            notificationService.visible &&
            notificationService.notification.type === notificationType.SNACKBAR
          }
          children={
            notificationService.notification.text
              ? notificationService.notification.text
              : ''
          }
        />
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {notificationService: state.notification};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    dispatchNotification: (notification: SnackbarNotification) =>
      dispatch(storeNotification(notification)),
    dispatchClearNotification: () => dispatch(clearNotification()),
    dispatchScannerRequest: (data: string) => dispatch(scanStarted(data)),
  };
}

export const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
