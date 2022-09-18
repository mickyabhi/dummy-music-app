import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { OnboardingHeader } from '~/navigations/OnboardingHeader';
import { sharedStyles } from './sharedStyles';
import { styles } from './WelcomeScreen';
import { scaledValue } from '~/utils/design.utils';
import finishedOnboardingImage from '~assets/images/onboarding/safe_hands2.png';
import { saveFormState } from '~/utils/common.utils';
import { Auth } from '~/firebase';
import database from '@react-native-firebase/database';
import { analytics } from '~/utils/analytics';
import LoadingButtonUI from '~/components/LoadingButtonUI';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';

export const FinishedOnboardingScreen = ({ route, navigation }) => {
  const phoneNumber = Auth()?.currentUser?.phoneNumber?.replace('+', '_');
  const emailAddress = Auth()?.currentUser?.email?.split('.')?.join('_');
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector(state => state.userInfo);

  useEffect(() => {
    saveFormState(route?.params?.formState, userInfo.id);
  }, [route?.params?.formState, userInfo.id]);

  // submit form data to firebase
  const submitFormData = async () => {
    const onboardingFromTableRef = database()?.ref('onboarding');
    setLoading(true);
    console.log(`formState-${userInfo.id}`, route?.params?.formState);
    onboardingFromTableRef.child(phoneNumber ?? emailAddress).push(
      {
        onboarding: {
          ...route?.params?.formState,
          user_data: {
            ...route?.params?.formState?.user_data,
            phoneNumber,
            userName: Auth()?.currentUser?.displayName,
            email: Auth()?.currentUser?.email ?? '',
          },
        },
      },
      () => {
        setLoading(false);
        analytics.trackEvent('oFinalscreen_nextbutton');

        return navigation.navigate('HomeScreen', {
          screen: 'Home',
        });
      },
    );
  };

  return (
    <>
      <View
        style={[
          sharedStyles.container,
          { paddingTop: scaledValue(40), alignItems: 'center' },
        ]}>
        <View style={[styles.container, styles.innerContainer]}>
          <Text style={[sharedStyles.heading, { textAlign: 'center' }]}>
            You are in safe hands!
          </Text>

          <Image
            source={finishedOnboardingImage}
            style={[
              sharedStyles.image,
              {
                width: scaledValue(180),
                marginTop: scaledValue(-10),
              },
            ]}
          />

          <Text style={[sharedStyles.text, styles.text]}>
            Your information will help our {'\n'} experts to curate sleep
            stories,{'\n'} meditations, and music best-suited{'\n'}for you.
          </Text>
        </View>
        <View style={{ marginTop: scaledValue(30) }}>
          {loading ? (
            <LoadingButtonUI marginTop={24} height={50} />
          ) : (
            <Button
              {...sharedStyles.button}
              onPress={() => submitFormData()}
              marginTop={scaledValue(20)}
              title="Welcome on board!"
            />
          )}
        </View>
      </View>
    </>
  );
};
