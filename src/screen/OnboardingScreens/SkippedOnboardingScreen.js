import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '~/components/Button';

import { scaledValue } from '~/utils/design.utils';
import { sharedStyles } from './sharedStyles';

import { styles } from './WelcomeScreen';

import onBoardingSkippedImage from '~assets/images/onboarding/onboarding_skipped.png';
import { OnboardingHeader } from '~/navigations/OnboardingHeader';
import { saveFormState } from '~/utils/common.utils';
import { analytics } from '~/utils/analytics';
import { Auth } from '~/firebase';
import { useSelector } from 'react-redux';

export const SkippedOnboardingScreen = ({ route }) => {
  const formState = route?.params?.formState;
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.userInfo);

  return (
    <View style={[sharedStyles.container, { paddingTop: scaledValue(40) }]}>
      <View style={[styles.container, styles.innerContainer]}>
        <Text
          style={[
            sharedStyles.heading,
            { maxWidth: '65%', textAlign: 'center' },
          ]}>
          Hey {`${userInfo.username?.split(' ')[0]}`}, {'\n'} We don't want you
          to leave.
        </Text>

        <Image
          source={onBoardingSkippedImage}
          style={[
            sharedStyles.image,
            {
              width: scaledValue(150),
              marginVertical: scaledValue(-50),
              marginTop: scaledValue(-30),
            },
          ]}
        />

        <Text style={[sharedStyles.text, styles.text]}>
          Give us a minute, and get back 8 hrs {'\n'}of peaceful sleep every
          night.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            fontSize={scaledValue(14)}
            marginTop={scaledValue(0)}
            width={scaledValue(135)}
            height={scaledValue(48)}
            marginRight={scaledValue(20)}
            title="I'll skip"
            onPress={async () => {
              await saveFormState(formState, userInfo.id);
              analytics.trackEvent('oPostskipscreen_skip');
              return navigation.navigate('HomeScreen', {
                screen: 'Home',
              });
            }}
          />
          <Button
            {...sharedStyles.button}
            width={scaledValue(135)}
            height={scaledValue(48)}
            title="Ok, let’s fill"
            onPress={() => {
              analytics.trackEvent('oPostskipscreen');
              return navigation.navigate('QuestionsScreen', {
                currentQuestionIndex: 0,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};
