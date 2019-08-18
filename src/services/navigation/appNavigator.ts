import {createStackNavigator} from 'react-navigation';
import {HomeScreen} from '../../screens/home/homeScreen';

export const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  }
});
