import QRCode from '@remobile/react-native-qrcode-local-image';
import ImagePicker from 'react-native-image-picker';

export function pickImage(): Promise<{error: string; result: any}> {
  return new Promise(resolve => {
    ImagePicker.launchImageLibrary({title: 'Select Photo'}, response => {
      console.log('Response = ', response);
      let source;
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        source = response.path;
        console.log('source', source);
        QRCode.decode(source, (error: string, result: string) => {
          resolve({error, result});
        });
      }
    });
  });
}
