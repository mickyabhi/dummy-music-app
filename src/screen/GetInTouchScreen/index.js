import React, { useState } from 'react';
import { Text, View, TextInput, ScrollView, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '~/components/Header';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';
import Button from '../../components/Button';
import { styles } from './styles';
import database from '@react-native-firebase/database';
import { Auth } from '~/firebase';
import { useNavigation } from '@react-navigation/native';
import { HelperText } from 'react-native-paper';
import { isEmptyString, isNumeric } from '~/utils/common.utils';

const GetInTouchScreen = () => {
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.userInfo);
  const currentLanguage = useSelector(state => state.ui.currentLanguage);
  const [formInputValue, setFormInputValue] = useState({
    name: userInfo?.username || '',
    phoneNumber: userInfo?.phoneNumber?.slice(3) || '',
    message: '',
    dateTime: new Date().toLocaleString(),
    currentLanguage: currentLanguage,
  });

  const userIdentifier =
    Auth()?.currentUser?.email?.split('.')?.join('_') ||
    Auth()?.currentUser?.phoneNumber?.replace('+', '_');

  const submitGetInTouchData = () => {
    setFormInputValue({ ...formInputValue, message: '' });
    ToastAndroid.show(
      'Successfully Submit',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    database().ref('get_in_touch').child(userIdentifier).push(formInputValue);
  };

  const handleNameValidation = () => {
    return (
      formInputValue?.phoneNumber?.length === 10 && formInputValue?.name === ''
    );
  };

  const handlePhoneNumberValidation = () => {
    return (
      (formInputValue.message !== '' &&
        formInputValue.phoneNumber.length !== 10) ||
      !isNumeric(formInputValue.phoneNumber)
    );
  };

  return (
    <View style={styles.getInTouchMainView}>
      <Header onPress={() => navigation.goBack()} headerTitle="Get in touch" />
      <ScrollView style={styles.textInputContainer}>
        <View style={styles.inputView}>
          <Text style={styles.textLabel}>Name</Text>
          <TextInput
            style={styles.nameTextInput(
              formInputValue.phoneNumber,
              formInputValue.name,
            )}
            value={formInputValue?.name}
            onChangeText={value =>
              setFormInputValue({ ...formInputValue, name: value })
            }
          />
          <HelperText visible={handleNameValidation()} style={styles.error}>
            Name is required.
          </HelperText>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.textLabel}>Mobile Number</Text>
          <View style={styles.countryCodeView}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.textMobileNumInput(
                formInputValue?.phoneNumber,
                formInputValue?.message,
              )}
              keyboardType="number-pad"
              maxLength={10}
              value={formInputValue?.phoneNumber}
              onChangeText={value =>
                setFormInputValue({ ...formInputValue, phoneNumber: value })
              }
            />
          </View>
          <HelperText
            style={styles.error}
            visible={handlePhoneNumberValidation()}>
            Please enter correct mobile no.
          </HelperText>
        </View>
        <View>
          <Text style={styles.textLabel}>Message</Text>
          <TextInput
            style={styles.textInputMessage}
            multiline={true}
            numberOfLines={50}
            onChangeText={value => {
              setFormInputValue({ ...formInputValue, message: value });
            }}
            value={formInputValue?.message}
          />
        </View>
        {/* <HelperText visible={handleMessageValidation()} style={styles.error}>
          Message is required.
        </HelperText> */}
        <Button
          title="Submit"
          backgroundColor={'#937DE2'}
          borderColor={
            isEmptyString(formInputValue?.name) ||
            formInputValue?.phoneNumber?.length !== 10 ||
            formInputValue?.message === ''
              ? '#586894'
              : '#937DE2'
          }
          marginTop={scaledValue(94)}
          marginBottom={scaledValue(52)}
          width={scaledValue(300)}
          height={scaledValue(48)}
          disabled={
            isEmptyString(formInputValue?.name) ||
            formInputValue?.phoneNumber?.length !== 10 ||
            isEmptyString(formInputValue?.message)
          }
          fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
          fontSize={scaledValue(14)}
          letterSpacing={scaledValue(0.5)}
          onPress={submitGetInTouchData}
        />
      </ScrollView>
    </View>
  );
};

export default GetInTouchScreen;
