import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '~/components/Button';
import { scaledValue } from '~/utils/design.utils';
import { sharedStyles } from './sharedStyles';
import welcomeScreenImage from '~assets/images/onboarding/welcome3.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateScreenCount } from '~/store/OnboardingSlice';

export const WelcomeScreen = ({ route, initialFormState }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);

  return (
    <>
      <View style={[sharedStyles.container, { paddingTop: scaledValue(40) }]}>
        <StatusBar backgroundColor="#0B173C" />

        <View style={[styles.container, styles.innerContainer]}>
          <Text style={sharedStyles.heading}>
            Welcome {`${userInfo?.username?.split(' ')[0]},`}
          </Text>

          <Text style={[sharedStyles.text, styles.text]}>I am Neend.</Text>

          <Image
            source={welcomeScreenImage}
            style={{
              width: scaledValue(210),
              resizeMode: 'contain',
              height: scaledValue(210),
            }}
          />

          <Text
            style={[
              sharedStyles.text,
              styles.text,
              { paddingVertical: scaledValue(20) },
            ]}>
            Did you know that you will spend one-third {'\n'}of your life
            sleeping? So, let's make sure {'\n'}you get some good sleep tonight,
            and {'\n'}every night.
          </Text>

          <Button
            {...sharedStyles.button}
            marginTop={scaledValue(40)}
            title="Yes, let’s start!"
            onPress={() => {
              dispatch(updateScreenCount({ type: 'increment' }));
              return navigation.navigate('QuestionsScreen', {
                currentQuestionIndex: 0,
                formState: initialFormState,
              });
            }}
          />
        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: scaledValue(20),
  },
  text: {
    maxWidth: '80%',
    textAlign: 'center',
    paddingVertical: scaledValue(5),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    marginTop: scaledValue(50),
  },
});
