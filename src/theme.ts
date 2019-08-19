import {DefaultTheme} from 'react-native-paper';

interface Theme {
  colors: {
    backgroundGrey: string;
    blue: string;
    green: string;
    white: string;
  };
}

export const theme: Theme = {
  ...DefaultTheme,
  colors: {
    backgroundGrey: '#313136',
    blue: '#607D8B',
    green: '#009688',
    white: '#FFF',
  },
};
