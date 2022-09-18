import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { analytics } from '~/utils/analytics';

export const setItemInAsyncStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromAsyncStorage = async (key, defaultValue = '') => {
  return await AsyncStorage.getItem(key)
    .then(data => {
      return data || defaultValue;
    })
    .catch(error => {
      analytics.trackEvent('async_storage_get_item', { error });
      return defaultValue;
    });
};

export const getDeviceId = async () => {
  return getItemFromAsyncStorage('DEVICE_ID', null).then(data => {
    if (data == null) {
      const DEVICE_ID = uuid.v4();
      setItemInAsyncStorage('DEVICE_ID', DEVICE_ID);
      return DEVICE_ID;
    } else {
      return data;
    }
  });
};
