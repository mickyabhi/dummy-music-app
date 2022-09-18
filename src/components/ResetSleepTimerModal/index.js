import React, { useEffect, useState } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { Modal, RadioButton, HelperText } from 'react-native-paper';
import { scaledValue } from '~/utils/design.utils';
import Button from '~/components/Button';
import Slider from '@react-native-community/slider';
import { useProgress } from 'react-native-track-player';
import database from '@react-native-firebase/database';
import { Auth } from '../../firebase';
import { convertMinIntoSec, formatPlayerTime } from '~/utils/common.utils';
import { useDispatch, useSelector } from 'react-redux';
import { setSleepTimer } from '~/store/UiSlice';
import { getItemFromAsyncStorage, setItemInAsyncStorage } from '~/storage';
import { analytics } from '~/utils/analytics';
import { FONTS } from '~/constants';
import { styles } from './styles';

const ResetSleepTimerModal = props => {
  const dispatch = useDispatch();
  const sleepTime = useSelector(state => state.ui.sleepTimer);
  const globalCurrentSong = useSelector(state => state.ui.currentTrack.title);
  const trackProgress = useProgress();
  const [sliderValue, setSliderValue] = useState(null);
  const [radioValue, setRadioValue] = useState('unchecked');
  const userIdentifier =
    Auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
    Auth()?.currentUser?.email?.split('.').join('_');

  const fetchUserProfile = async () => {
    await database()
      .ref('/users/' + userIdentifier)
      .once('value')
      .then(data => {
        data = convertMinIntoSec(data.val().sleepTimer);
        dispatch(setSleepTimer(data));
      });
  };

  const initModal = async () => {
    let globalCurrentSongTitle = await getItemFromAsyncStorage(
      'globalCurrentSongTitle',
    );

    if (
      sleepTime === null ||
      sleepTime === 0 ||
      globalCurrentSong !== JSON.parse(globalCurrentSongTitle)
    ) {
      fetchUserProfile();
    }
  };

  useEffect(() => {
    initModal();
  }, []);

  const hasErrors = () => {
    return sliderValue < 300 && sliderValue !== null;
  };

  const saveHandler = async () => {
    let localTimer = null;
    localTimer = formatPlayerTime(sliderValue)?.split(':')[0];
    localTimer = convertMinIntoSec(localTimer);
    props.onDismiss();
    dispatch(setSleepTimer(localTimer));
    setItemInAsyncStorage('globalCurrentSongTitle', globalCurrentSong);
    if (radioValue === 'checked') {
      const userRef = database()?.ref('users');
      let convertedMinutes = formatPlayerTime(sliderValue);
      convertedMinutes = convertedMinutes?.split(':');
      await userRef
        .child(userIdentifier)
        .update({
          sleepTimer: convertedMinutes[0].concat(' min'),
        })
        .then(() => fetchUserProfile());
      analytics.trackEvent('sleep_timer', {
        CTA: 'Save Button To Change Global Sleep Timer',
        Screen: 'Track Player',
        SleepTimer: formatPlayerTime(sliderValue),
      });
      ToastAndroid.show('Sleep Timer is saved as default!', ToastAndroid.SHORT);
    } else {
      analytics.trackEvent('sleep_timer', {
        CTA: 'Save Button To Change Sleep Timer',
        Screen: 'Track Player',
        SleepTimer: formatPlayerTime(sliderValue),
      });
      ToastAndroid.show('Sleep Timer is saved!', ToastAndroid.SHORT);
    }
  };

  return (
    <Modal
      visible={props.visible}
      onDismiss={() => {
        props.onDismiss();
        setSliderValue(null);
      }}
      contentContainerStyle={styles.containerStyles}>
      <Text style={styles.resetTimerText}>Reset sleep timer</Text>
      <Text style={styles.timerText}>
        {sliderValue !== null
          ? formatPlayerTime(sliderValue)?.split(':')[0] + ' min'
          : formatPlayerTime(sleepTime)?.split(':')[0] + ' min'}
      </Text>
      <Slider
        value={sleepTime}
        style={styles.sliderStyle}
        minimumValue={0}
        maximumValue={trackProgress?.duration}
        minimumTrackTintColor="#E6E7F2"
        maximumTrackTintColor="#47557E"
        thumbTintColor={
          sliderValue < 300 && sliderValue !== null ? '#FF0000' : '#937DE2'
        }
        onSlidingComplete={value => setSliderValue(value)}
        onValueChange={value => setSliderValue(value)}
      />
      <HelperText type="error" style={styles.errText} visible={hasErrors()}>
        Timer can’t be set below 5 min
      </HelperText>
      <View style={styles.setAsDefaultView}>
        <RadioButton
          uncheckedColor="#97A4C5"
          color="#937DE2"
          value="first"
          status={radioValue === 'checked' ? 'checked' : 'unchecked'}
          onPress={() => {
            radioValue === 'checked'
              ? setRadioValue('unchecked')
              : setRadioValue('checked');
          }}
        />
        <Text style={styles.radioText}>
          Set as default, will apply to all audios
        </Text>
      </View>

      <View style={styles.buttonsView}>
        <Button
          marginTop={0}
          borderWidth={1}
          borderColor="#727E9D"
          fontSize={scaledValue(14)}
          fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
          title="Cancel"
          width={scaledValue(132)}
          onPress={() => {
            props.onDismiss();
            setSliderValue(null);
            analytics.trackEvent('sleep_timer', {
              CTA: 'Cancel Button To Close Timer Modal',
              Screen: 'Track Player',
              SleepTimer: formatPlayerTime(sliderValue),
            });
          }}
        />
        <Button
          disabled={sliderValue < 300 && sliderValue !== null}
          marginTop={0}
          borderWidth={1}
          fontSize={scaledValue(14)}
          fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
          width={scaledValue(132)}
          borderColor="#937DE2"
          backgroundColor="#937DE2"
          title="Save"
          onPress={saveHandler}
        />
      </View>
    </Modal>
  );
};

export default ResetSleepTimerModal;
