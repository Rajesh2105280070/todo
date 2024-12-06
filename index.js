/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// import 'react-native-gesture-handler';
import SplashScreen from './src/screens/loginScreens/SplashScreen';

AppRegistry.registerComponent(appName, () => SplashScreen);
