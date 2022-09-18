import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import AppWrapper from './src/App';

AppRegistry.registerComponent(appName, () => AppWrapper);
TrackPlayer.registerPlaybackService(() => require('./services.js'));
