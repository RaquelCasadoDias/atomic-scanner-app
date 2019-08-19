import {createStackNavigator} from 'react-navigation';
import {HomeScreen} from '../../screens/home/homeScreen';
import {ScannerScreen} from '../../screens/scanner/scanScreen';

export const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Scanner: {
    screen: ScannerScreen,
  },
});
