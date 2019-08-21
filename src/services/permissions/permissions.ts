import {PermissionsAndroid} from 'react-native';

export async function requestPermission(types: any[]) {
  try {
    const permissions: any[] = [];
    for (let type of types) {
      permissions.push(PermissionsAndroid.PERMISSIONS[type]);
    }
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    if (Object.values(granted).includes('denied' || 'never_ask_again')) {
      return 'denied';
    }
    return 'granted';
  } catch (err) {
    console.warn(err);
    return 'errored';
  }
}
