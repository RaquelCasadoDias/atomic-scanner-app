import {shallow} from 'enzyme';
import React from 'react';
import AtomicDialog from '../dialog';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Button, Dialog, Paragraph} from 'react-native-paper';

describe('Home Screen', () => {
  const cancelMock = jest.fn();
  const okMock = jest.fn();

  const render = ShallowRenderer.createRenderer();
  render.render(
    <AtomicDialog
      title={'Simple dialog'}
      text={'Dialog text'}
      cancelText={'cancel'}
      okText={'ok'}
      cancelAction={cancelMock}
      okAction={okMock}
      visible
    />,
  );

  const wrapper = shallow(
    <AtomicDialog
      title={'Simple dialog'}
      text={'Dialog text'}
      cancelText={'cancel'}
      okText={'ok'}
      cancelAction={cancelMock}
      okAction={okMock}
      visible
    />,
  );

  it('Matches Snapshot', () => {
    expect(render.getRenderOutput()).toMatchSnapshot();
  });

  it('Renders without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Receives the right props', () => {
    const cancel_button = wrapper.find({id: 'cancelButton'});
    const ok_button = wrapper.find({id: 'okButton'});
    const title = wrapper.find(Dialog.Title);
    const text = wrapper.find(Paragraph);

    expect(cancel_button.props().children).toBe('cancel');
    expect(ok_button.props().children).toBe('ok');
    expect(title.props().children).toBe('Simple dialog');
    expect(text.props().children).toBe('Dialog text');
  });
});
