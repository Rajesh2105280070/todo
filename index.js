/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Navigations from './src/navigations/Navigations';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => Navigations);
