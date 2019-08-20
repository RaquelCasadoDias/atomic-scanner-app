import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';
import {theme} from '../../theme';

interface AtomicDialogProps {
  title: string;
  text: string;
  cancelText: string;
  okText: string;
  cancelAction: () => void;
  okAction: () => void;
  visible: boolean;
  onDismiss?: () => void;
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: theme.colors.backgroundGrey,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
  },
  button: {
    color: theme.colors.white,
    tintColor: theme.colors.white,
    textDecorationColor: theme.colors.white,
  },
});

export default class AtomicDialog extends React.Component<AtomicDialogProps> {
  _cancelAction = () => {
    this.props.cancelAction();
  };

  _okAction = () => {
    this.props.okAction();
  };

  render() {
    return (
      <Portal>
        <Dialog visible={this.props.visible} style={styles.dialogContainer}>
          <Dialog.Title style={styles.text}>{this.props.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.text}>{this.props.text}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              id={'cancelButton'}
              onPress={this._cancelAction}
              color={theme.colors.white}>
              {this.props.cancelText}
            </Button>
            <Button
              id={'okButton'}
              onPress={this._okAction}
              color={theme.colors.white}>
              {this.props.okText}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}
