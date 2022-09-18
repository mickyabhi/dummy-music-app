import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import crossIcon from '../../../assets/images/crossIcon.png';
import { IconButton, RadioButton } from 'react-native-paper';
import { scaledValue } from '~/utils/design.utils';
import { useNavigation } from '@react-navigation/native';
import { Auth } from '../../firebase';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import { setSleepTimer } from '~/store/UiSlice';
import { convertMinIntoSec } from '~/utils/common.utils';
import { analytics } from '~/utils/analytics';
import { styles } from './styles';

const SetSleepTimer = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [checked, setChecked] = useState(null);
  const userRef = database()?.ref('users');
  const userIdentifier =
    Auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
    Auth()?.currentUser?.email?.split('.').join('_');

  const handleRadioButton = async value => {
    ToastAndroid.show(
      'Okay, Sleep Timer is setup',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    navigation.goBack();
    if (value) {
      setChecked(value);
      await userRef.child(userIdentifier).update({
        sleepTimer: value,
      });
      analytics.trackEvent('sleep_timer', {
        CTA: 'Set Sleep Timer',
        Screen: 'Sleep Timer',
        SleepTimer: value,
      });
      value = convertMinIntoSec(value);
      dispatch(setSleepTimer(value));
    }
  };

  const fetchUserProfile = async () => {
    if (userIdentifier !== null) {
      await database()
        .ref('/users/' + userIdentifier)
        .once('value')
        .then(data => {
          setChecked(data.val().sleepTimer);
        });
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const removeSleepTimerHandler = async () => {
    navigation.goBack();

    await userRef
      .child(userIdentifier)
      .update({
        sleepTimer: null,
      })
      .then(() => {
        fetchUserProfile();
        analytics.trackEvent('sleep_timer', {
          CTA: 'Delete Sleep Timer',
          Screen: 'Sleep Timer',
        });
        ToastAndroid.show('Sleep Timer is deleted', ToastAndroid.SHORT);
        props.navigation.closeDrawer();
      });
  };

  return (
    <View style={styles.sleepTimerMainView}>
      <StatusBar backgroundColor="#0B173C" />
      <IconButton
        icon={crossIcon}
        color="#fff"
        size={scaledValue(16)}
        onPress={() => {
          navigation.goBack();
          analytics.trackEvent('sleep_timer', {
            CTA: 'Close Button',
            Screen: 'Sleep Timer',
          });
        }}
      />
      <View style={styles.textButtonView}>
        <Text style={styles.stopAudioText}>Stop Audio In</Text>
        <TouchableOpacity
          onPress={() => handleRadioButton('5 min')}
          style={styles.radioButtonView}>
          <RadioButton
            status={checked === '5 min' ? 'checked' : 'unchecked'}
            uncheckedColor="#fff"
            color="#fff"
            value="5 min"
            onPress={() => handleRadioButton('5 min')}
          />
          <Text style={styles.radioButtonTitle}>5 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRadioButton('10 min')}
          style={styles.radioButtonView}>
          <RadioButton
            onPress={() => handleRadioButton('10 min')}
            status={checked === '10 min' ? 'checked' : 'unchecked'}
            uncheckedColor="#fff"
            color="#fff"
            value="10 min"
          />
          <Text style={styles.radioButtonTitle}>10 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRadioButton('15 min')}
          style={styles.radioButtonView}>
          <RadioButton
            onPress={() => handleRadioButton('15 min')}
            status={checked === '15 min' ? 'checked' : 'unchecked'}
            uncheckedColor="#fff"
            color="#fff"
            value="15 min"
          />
          <Text style={styles.radioButtonTitle}>15 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRadioButton('20 min')}
          style={styles.radioButtonView}>
          <RadioButton
            onPress={() => handleRadioButton('20 min')}
            status={checked === '20 min' ? 'checked' : 'unchecked'}
            uncheckedColor="#fff"
            color="#fff"
            value="20 min"
          />
          <Text style={styles.radioButtonTitle}>20 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRadioButton('30 min')}
          style={styles.radioButtonView}>
          <RadioButton
            onPress={() => handleRadioButton('30 min')}
            status={checked === '30 min' ? 'checked' : 'unchecked'}
            uncheckedColor="#fff"
            color="#fff"
            value="30 min"
          />
          <Text style={styles.radioButtonTitle}>30 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRadioButton('45 min')}
          style={styles.radioButtonView}>
          <RadioButton
            onPress={() => handleRadioButton('45 min')}
            status={checked === '45 min' ? 'checked' : 'unchecked'}
            uncheckedColor="#fff"
            color="#fff"
            value="45 min"
          />
          <Text style={styles.radioButtonTitle}>45 mins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRadioButton('60 min')}
          style={styles.radioButtonView}>
          <RadioButton
            onPress={() => handleRadioButton('60 min')}
            status={checked === '60 min' ? 'checked' : 'unchecked'}
            uncheckedColor="#fff"
            color="#fff"
            value="60 min"
          />
          <Text style={styles.radioButtonTitle}>60 mins</Text>
        </TouchableOpacity>
      </View>
      {checked != null && (
        <TouchableOpacity
          onPress={removeSleepTimerHandler}
          style={styles.timerOffButton}>
          <Text style={styles.turnOffTimerText}>Turn Off Timer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SetSleepTimer;
