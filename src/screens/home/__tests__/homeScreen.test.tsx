import {notificationType} from '../../scanner/actionTypes';

jest.mock('../../../services/scanner/scannerService', () => {
  return {
    pickImage: jest.fn(),
  };
});

import React from 'react';
import {TouchableHighlight} from 'react-native';
import {Snackbar} from 'react-native-paper';
import ReactTestRenderer from 'react-test-renderer';
import AtomicDialog from '../../../components/dialog/dialog';
import {navigate} from '../../../services/navigation/navigationService';
import {pickImage} from '../../../services/scanner/scannerService';
import {Home} from '../homeScreen';

describe('Home Screen', () => {
  const notificationService = {
    notification: {
      type: notificationType.DIALOG,
      title: 'dummy title',
      text: 'dummy text',
      ok: 'ok',
      cancel: 'cancel',
    },
    visible: true,
  };
  let render = ReactTestRenderer.create(
    <Home
      notificationService={notificationService}
      dispatchClearNotification={jest.fn()}
      dispatchScannerRequest={jest.fn()}
    />,
  );

  it('Matches Snapshot', () => {
    expect(render.toJSON()).toMatchSnapshot();
  });

  it('Navigates to scanner screen when Scan button is presssed', () => {
    const scan_button = render.root
      .find((node: any) => node.props.id === 'ScanButton')
      .findByType(TouchableHighlight).instance.props;
    scan_button.onPress!();
    expect(navigate).toBeCalledWith('Scanner', {});
  });

  it('Calls scanner service when clicking on photo gallery button', () => {
    const photo_gallery_button = render.root
      .find((node: any) => node.props.id === 'PhotoGalleryButton')
      .findByType(TouchableHighlight).instance.props;
    photo_gallery_button.onPress!();
    expect(pickImage).toBeCalled();
  });

  it('Displays dialog with props from notification', () => {
    const dialog = render.root.findByType(AtomicDialog).instance.props;
    expect(dialog.title).toBe('dummy title');
    expect(dialog.text).toBe('dummy text');
    expect(dialog.cancelText).toBe('cancel');
    expect(dialog.okText).toBe('ok');
    expect(dialog.visible).toBeTruthy();
  });

  it('Displays snackbar with props from notification', () => {
    const error_notificationService = {
      notification: {
        type: notificationType.SNACKBAR,
        text: 'dummy text',
      },
      visible: true,
    };
    render = ReactTestRenderer.create(
      <Home
        notificationService={error_notificationService}
        dispatchClearNotification={jest.fn()}
        dispatchScannerRequest={jest.fn()}
      />,
    );
    const snackbar = render.root.findByType(Snackbar).instance.props;
    expect(snackbar.visible).toBeTruthy();
    expect(snackbar.children).toBe('dummy text');
  });
});
