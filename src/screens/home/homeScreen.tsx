import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Linking,
} from 'react-native';
import {theme} from '../../theme';
import {Dispatch} from 'redux';
import {scanStarted} from '../scanner/actions';
import {connect} from 'react-redux';
import {navigate} from '../../services/navigation/navigationService';
import AtomicDialog from '../../components/dialog/dialog';
import {QRCodeNotification} from '../scanner/actionTypes';
import {clearNotification} from '../../services/notification/actions';
import {pickImage} from '../../services/scanner/scannerService';

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
});

interface HomeProps {
  notificationService: {
    notification: QRCodeNotification;
    visible: boolean;
  };
  dispatchClearNotification: () => void;
  dispatchScannerRequest: (data: string) => void;
}

export class Home extends React.Component<HomeProps> {
  static navigationOptions = {
    header: null,
  };

  navigateToScanner = () => {
    navigate('Scanner', {});
  };

  scanFromPhotoGallery = async () => {
    pickImage().then(result =>
      this.props.dispatchScannerRequest(result.result),
    );
  };

  onCancel = () => {
    this.props.dispatchClearNotification();
  };

  onOk = () => {
    Linking.openURL(this.props.notificationService.notification.text)
      .catch(err => console.error('An error occured', err))
      .then(this.props.dispatchClearNotification());
  };

  render() {
    const {notificationService} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scanButtonView}>
          <TouchableHighlight
            id={'ScanButton'}
            onPress={this.navigateToScanner}>
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
          title={notificationService.notification.title}
          text={notificationService.notification.text}
          cancelText={notificationService.notification.cancel}
          okText={notificationService.notification.ok}
          cancelAction={this.onCancel}
          okAction={this.onOk}
          visible={notificationService.visible}
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
    dispatchClearNotification: () => dispatch(clearNotification()),
    dispatchScannerRequest: (data: string) => dispatch(scanStarted(data)),
  };
}

export const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
