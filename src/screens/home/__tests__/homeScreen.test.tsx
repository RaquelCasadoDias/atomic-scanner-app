jest.mock('../../../services/scanner/scannerService', () => {
  return {
    pickImage: jest.fn().mockResolvedValue(true),
  };
});

jest.mock('../../../services/permissions/permissions', () => {
  return {
    requestPermission: jest
      .fn()
      .mockResolvedValueOnce('granted')
      .mockResolvedValueOnce('denied')
      .mockResolvedValueOnce('errored')
      .mockResolvedValueOnce('granted')
      .mockResolvedValueOnce('denied')
      .mockResolvedValueOnce('errored'),
  };
});

import React from 'react';
import {TouchableHighlight} from 'react-native';
import {Snackbar} from 'react-native-paper';
import ReactTestRenderer from 'react-test-renderer';
import AtomicDialog from '../../../components/dialog/dialog';
import {navigate} from '../../../services/navigation/navigationService';
import {requestPermission} from '../../../services/permissions/permissions';
import {pickImage} from '../../../services/scanner/scannerService';
import {notificationType} from '../../scanner/actionTypes';
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
  const mockDispatchNotification = jest.fn();
  let render = ReactTestRenderer.create(
    <Home
      notificationService={notificationService}
      dispatchClearNotification={jest.fn()}
      dispatchScannerRequest={jest.fn()}
      dispatchNotification={mockDispatchNotification}
    />,
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Matches Snapshot', () => {
    expect(render.toJSON()).toMatchSnapshot();
  });

  it('Calls permission service and  after granted  navigates to scanner screen when clicking on scan button', async () => {
    const scan_button = render.root
      .find((node: any) => node.props.id === 'ScanButton')
      .findByType(TouchableHighlight).instance.props;
    await scan_button.onPress!();
    expect(requestPermission).toBeCalledWith(['CAMERA']);
    expect(navigate).toBeCalledWith('Scanner', {});
  });

  it('Calls permission service and  after denied it does not navigate to scanner screen when clicking on scan button', async () => {
    const scan_button = render.root
      .find((node: any) => node.props.id === 'ScanButton')
      .findByType(TouchableHighlight).instance.props;
    await scan_button.onPress!();
    expect(requestPermission).toBeCalledWith(['CAMERA']);
    expect(navigate).toBeCalledTimes(0);
    expect(mockDispatchNotification).toBeCalledWith({
      text: 'Please grant permission to continue',
      type: 'SNACKBAR',
    });
  });

  it('Calls permission service and  after error it does not navigate to scanner screen when clicking on scan button', async () => {
    const scan_button = render.root
      .find((node: any) => node.props.id === 'ScanButton')
      .findByType(TouchableHighlight).instance.props;
    await scan_button.onPress!();
    expect(requestPermission).toBeCalledWith(['CAMERA']);
    expect(navigate).toBeCalledTimes(0);
    expect(mockDispatchNotification).toBeCalledWith({
      text: 'Something went wrong. Try again',
      type: 'SNACKBAR',
    });
  });

  it('Calls permission service and  after granted  calls scanner service when clicking on photo gallery button', async () => {
    const photo_gallery_button = render.root
      .find((node: any) => node.props.id === 'PhotoGalleryButton')
      .findByType(TouchableHighlight).instance.props;
    await photo_gallery_button.onPress!();
    expect(requestPermission).toBeCalledWith([
      'READ_EXTERNAL_STORAGE',
      'CAMERA',
    ]);
    expect(pickImage).toBeCalled();
  });

  it('Calls permission service and  after denied it does not calls scanner service when clicking on photo gallery button', async () => {
    const photo_gallery_button = render.root
      .find((node: any) => node.props.id === 'PhotoGalleryButton')
      .findByType(TouchableHighlight).instance.props;
    await photo_gallery_button.onPress!();
    expect(requestPermission).toBeCalledWith([
      'READ_EXTERNAL_STORAGE',
      'CAMERA',
    ]);
    expect(pickImage).toBeCalledTimes(0);
    expect(mockDispatchNotification).toBeCalledWith({
      text: 'Please grant permission to continue',
      type: 'SNACKBAR',
    });
  });

  it('Calls permission service and  after error it does not calls scanner service when clicking on photo gallery button', async () => {
    const photo_gallery_button = render.root
      .find((node: any) => node.props.id === 'PhotoGalleryButton')
      .findByType(TouchableHighlight).instance.props;
    await photo_gallery_button.onPress!();
    expect(requestPermission).toBeCalledWith([
      'READ_EXTERNAL_STORAGE',
      'CAMERA',
    ]);
    expect(pickImage).toBeCalledTimes(0);
    expect(mockDispatchNotification).toBeCalledWith({
      text: 'Something went wrong. Try again',
      type: 'SNACKBAR',
    });
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
        dispatchNotification={jest.fn()}
      />,
    );
    const snackbar = render.root.findByType(Snackbar).instance.props;
    expect(snackbar.visible).toBeTruthy();
    expect(snackbar.children).toBe('dummy text');
  });
});
