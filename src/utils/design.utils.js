import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const scaledValue = (value = 0) => value * (windowWidth / 360);
