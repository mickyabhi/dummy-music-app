import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';
import { TextInput } from 'react-native-gesture-handler';
import Button from '~/components/Button';
import { useNavigation } from '@react-navigation/native';
import { analytics } from '~/utils/analytics';
import ReactMoE from 'react-native-moengage';

const SetAgeGenderScreen = () => {
  const [checked, setChecked] = useState('');
  const [age, setAge] = useState('');
  const navigation = useNavigation();
  const handleRadioClick = value => {
    setChecked(value);
  };

  const handleNext = () => {
    navigation.navigate('QuestionScreen', { age: age, gender: checked });
    ReactMoE.setUserGender(checked);
    analytics.trackEvent('set_age_gender', {
      CTA: 'submitted age gender',
      age: age,
      gender: checked,
    });
    setChecked('');
    setAge('');
  };

  return (
    <View style={styles.setAgeGenderView}>
      <StatusBar backgroundColor="#0B173C" />
      <Text style={styles.headingText}>
        Please help us understand you better
      </Text>
      <Text style={styles.genderText}>Your Gender:</Text>
      <View style={styles.radioView}>
        <TouchableOpacity
          onPress={() => handleRadioClick('Male')}
          style={styles.radioButtonView}>
          <RadioButton
            onPress={() => handleRadioClick('Male')}
            status={checked === 'Male' ? 'checked' : 'unchecked'}
            uncheckedColor="rgba(151, 164, 197, 0.72)"
            color="#937DE2"
          />
          <Text style={styles.radioButtonTitle}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRadioClick('Female')}
          style={styles.radioButtonView}>
          <RadioButton
            onPress={() => handleRadioClick('Female')}
            status={checked === 'Female' ? 'checked' : 'unchecked'}
            uncheckedColor="rgba(151, 164, 197, 0.72)"
            color="#937DE2"
          />
          <Text style={styles.radioButtonTitle}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRadioClick('Prefer not to say')}
          style={styles.radioButtonView}>
          <RadioButton
            onPress={() => handleRadioClick('Prefer not to say')}
            status={checked === 'Prefer not to say' ? 'checked' : 'unchecked'}
            uncheckedColor="rgba(151, 164, 197, 0.72)"
            color="#937DE2"
          />
          <Text style={styles.radioButtonTitle}>Prefer not to say</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.ageText}>Your Age:</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => setAge(value)}
        value={age}
        keyboardType="numeric"
        maxLength={3}
      />
      <View style={styles.buttonView}>
        <Button
          onPress={handleNext}
          title="Next"
          marginTop={scaledValue(57)}
          backgroundColor="#937DE2"
          borderColor={checked === '' || age === '' ? '#586894' : '#937DE2'}
          disabled={checked === '' || age === ''}
        />
      </View>
      <View style={styles.paginationView}>
        <Text style={styles.activeNum}>1</Text>
        <Text style={styles.num}>/2</Text>
      </View>
    </View>
  );
};
export default SetAgeGenderScreen;
const styles = StyleSheet.create({
  setAgeGenderView: {
    flex: 1,
  },
  headingText: {
    color: '#fff',
    marginLeft: scaledValue(41),
    marginTop: scaledValue(54),
    fontSize: scaledValue(16),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    marginBottom: scaledValue(31),
  },
  genderText: {
    color: '#fff',
    marginLeft: scaledValue(41),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
  },
  radioButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledValue(29),
  },
  radioButtonTitle: {
    fontSize: scaledValue(14),
    color: '#fff',
    marginLeft: scaledValue(31),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  radioView: {
    paddingTop: scaledValue(31),
    paddingLeft: scaledValue(41),
  },
  ageText: {
    color: '#fff',
    paddingLeft: scaledValue(41),
    marginBottom: scaledValue(7),
    fontSize: scaledValue(14),
  },
  input: {
    width: scaledValue(280),
    height: scaledValue(48),
    backgroundColor: '#586894',
    borderWidth: scaledValue(1),
    borderColor: '#727E9D',
    borderRadius: scaledValue(5),
    marginLeft: scaledValue(40),
    color: '#fff',
    paddingLeft: scaledValue(12),
    // marginBottom: scaledValue(62),
  },
  buttonView: {
    alignItems: 'center',
  },
  paginationView: {
    flexDirection: 'row',
    marginTop: scaledValue(53),
    justifyContent: 'center',
  },
  activeNum: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(12),
    color: '#ffffff',
  },
  num: {
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    fontSize: scaledValue(12),
    color: '#937DE2',
  },
});
