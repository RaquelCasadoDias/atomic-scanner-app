jest.mock('../../../services/scanner/scannerService', () => {
  return {
    pickImage: jest.fn(),
  };
});

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {Home} from '../homeScreen';
import {navigate} from '../../../services/navigation/navigationService';
import {TouchableHighlight} from 'react-native';
import AtomicDialog from '../../../components/dialog/dialog';
import {pickImage} from '../../../services/scanner/scannerService';

describe('Home Screen', () => {
  const notificationService = {
    notification: {
      title: 'dummy title',
      text: 'dummy text',
      ok: 'ok',
      cancel: 'cancel',
    },
    visible: true,
  };
  const render = ReactTestRenderer.create(
    <Home notificationService={notificationService} />,
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
});
