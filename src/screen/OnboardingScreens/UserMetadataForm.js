import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from '~/components/Button';
import { Picker } from '@react-native-picker/picker';

import { OnboardingFooter } from '~/navigations/OnboardingFooter';
import { scaledValue } from '~/utils/design.utils';
import { sharedStyles } from './sharedStyles';
import { OnboardingHeader } from '~/navigations/OnboardingHeader';
import { RadioButton } from 'react-native-paper';
import { saveFormState } from '~/utils/common.utils';
import { analytics } from '~/utils/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { updateScreenCount } from '~/store/OnboardingSlice';

const AGE_RANGE = [
  { label: 'Below 18 years', value: '0-18' },
  { label: '18 to 24 years', value: '18-24' },
  { label: '25 to 34 years', value: '25-34' },
  { label: '35 to 44 years', value: '35-44' },
  { label: '45 to 54 years', value: '45-54' },
  { label: '55 to 64 years', value: '55-64' },
  { label: '65 and above', value: '64-100' },
];

const GENDER_OPTIONS = ['Male', 'Female', "Don't want to say"];

export const UserMetadataFormScreen = ({ route, navigation }) => {
  const [formState, setFormState] = useState(route?.params?.formState ?? {});

  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.userInfo);

  return (
    <View style={[sharedStyles.container]}>
      <OnboardingHeader onBackPress={() => navigation.goBack()} />

      <View style={styles.innerContainer}>
        <Text style={[sharedStyles.text, { fontSize: scaledValue(16) }]}>
          Please help us understand you better
        </Text>
        <View>
          <Text
            style={[
              sharedStyles.text,
              { fontSize: scaledValue(14), marginTop: scaledValue(20) },
            ]}>
            Your gender:
          </Text>

          <View style={{ marginTop: scaledValue(10) }}>
            <RadioButton.Group
              onValueChange={value => {
                console.log(value, formState);
                setFormState(prev => {
                  return {
                    ...prev,
                    user_data: {
                      ...prev.user_data,
                      gender: value,
                    },
                  };
                });
              }}
              style={styles.optionsContainer}>
              {GENDER_OPTIONS.map((gender, idx) => {
                return (
                  <RadioButton.Item
                    key={idx}
                    style={styles.optionItem}
                    value={gender}
                    status={
                      formState.user_data?.gender === gender
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={'#937DE2'}
                    uncheckedColor={'rgba(151, 164, 197, 0.72)'}
                    label={gender}
                    labelStyle={[
                      sharedStyles.text,
                      {
                        marginLeft: scaledValue(10),
                        textAlign: 'left',
                      },
                    ]}
                    position="leading"
                  />
                );
              })}
            </RadioButton.Group>
          </View>
        </View>

        <View>
          <Text
            style={[
              sharedStyles.text,
              { fontSize: scaledValue(14), marginTop: scaledValue(10) },
            ]}>
            Your Age:
          </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={[styles.picker]}
              selectedValue={formState.user_data?.birth_year ?? 1942}
              onValueChange={value => {
                if (value !== 'PLACEHOLDER') {
                  setFormState(prev => {
                    return {
                      ...prev,
                      user_data: {
                        ...prev.user_data,
                        birth_year: value,
                      },
                    };
                  });
                }
              }}
              itemStyle={{
                backgroundColor: 'grey',
                color: 'blue',
                fontFamily: 'Helvetica Neue',
                fontSize: 17,
              }}
              mode="dropdown"
              dropdownIconColor={'white'}>
              <Picker.Item
                color="grey"
                label="Select your age"
                value="PLACEHOLDER"
              />

              {AGE_RANGE.map(age => (
                <Picker.Item
                  key={age.value.toString()}
                  label={age.label.toString()}
                  value={age.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          {...sharedStyles.button}
          marginTop={scaledValue(20)}
          title="Next"
          disabled={
            !formState?.user_data?.gender || !formState?.user_data?.birth_year
          }
          onPress={async () => {
            await saveFormState(formState, userInfo.id);
            dispatch(updateScreenCount({ type: 'increment' }));
            analytics.trackEvent('oq_yeargender_nextbutton');
            return navigation.push('QuestionsScreen', {
              currentQuestionIndex: route?.params?.currentQuestionIndex,
              formState,
            });
          }}
        />
      </View>
      <OnboardingFooter
        formState={formState}
        currentQuestionIndex={route?.params?.currentQuestionIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingHorizontal: scaledValue(40),

    marginTop: scaledValue(20),
  },
  optionsContainer: {
    marginTop: scaledValue(15),
    // using negative margin to make it look like a list
    marginHorizontal: scaledValue(-6),
    flex: 1,
  },
  optionItem: {
    marginVertical: scaledValue(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: scaledValue(16),
    paddingHorizontal: scaledValue(2),
  },
  picker: {
    backgroundColor: '#586894',
    borderColor: '#586894',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#fff',
    paddingLeft: 14,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pickerWrapper: {
    overflow: 'hidden',
    borderRadius: scaledValue(5),
    backgroundColor: 'red',
    marginTop: scaledValue(10),
  },
});
