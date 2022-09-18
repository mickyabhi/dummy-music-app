import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { sharedStyles } from './sharedStyles';
import { styles } from './WelcomeScreen';
import trustedByScreenImage from '~assets/images/onboarding/trusted_by2.png';
import { analytics } from '~/utils/analytics';
import { useDispatch } from 'react-redux';
import { updateScreenCount } from '~/store/OnboardingSlice';
import Button from '~/components/Button';
import { scaledValue } from '~/utils/design.utils';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { OnboardingHeader } from '~/navigations/OnboardingHeader';

export const TrustedByScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [completedOnboarding, setCompletedOnboarding] = useState(false);

  const emailAddress = auth()?.currentUser?.email?.split('.')?.join('_');
  const phoneNumber = auth()?.currentUser?.phoneNumber?.replace('+', '_');

  const userIdentifier = emailAddress || phoneNumber;

  useEffect(() => {
    const getOnboardingInfo = async () => {
      const onboardingTableRef = database().ref(
        `/onboarding/${userIdentifier}`,
      );

      const hasCompletedOnboarding = await onboardingTableRef
        .once('value')
        .then(val => {
          return val.val();
        });

      if (hasCompletedOnboarding) {
        setCompletedOnboarding(true);
      } else {
        setCompletedOnboarding(false);
      }
      setCompletedOnboarding(false);
    };
    getOnboardingInfo();
  }, [userIdentifier]);

  return (
    <>
      <View style={[sharedStyles.container]}>
        <OnboardingHeader onBackPress={() => navigation.goBack()} />
        <View style={[styles.container, styles.innerContainer]}>
          <Text
            style={[
              sharedStyles.heading,
              {
                maxWidth: '60%',
                textAlign: 'center',
              },
            ]}>
            Over 1 million users trust {'\n'} me!
          </Text>
          <Image
            source={trustedByScreenImage}
            style={[
              sharedStyles.image,
              {
                width: scaledValue(200),
                marginBottom: scaledValue(-50),
                marginTop: scaledValue(-30),
              },
            ]}
          />

          <Text style={[sharedStyles.text, styles.text]}>
            9 out of 10 users sleep faster with {'\n'} my help
          </Text>
          <Button
            {...sharedStyles.button}
            marginTop={scaledValue(40)}
            title="Continue"
            onPress={() => {
              dispatch(updateScreenCount({ type: 'increment' }));
              analytics.trackEvent('oTrust_nextbutton');

              if (completedOnboarding) {
                return navigation.push('QuestionsScreen', {
                  currentQuestionIndex: route?.params?.currentQuestionIndex,
                  formState: route?.params?.formState,
                });
              } else {
                return navigation.push('UserMetadataFormScreen', {
                  currentQuestionIndex: route?.params?.currentQuestionIndex,
                  formState: route?.params?.formState,
                });
              }
            }}
          />
        </View>
      </View>
    </>
  );
};
