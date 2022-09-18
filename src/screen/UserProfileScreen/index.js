import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { Auth } from '../../firebase';
import { scaledValue } from '../../utils/design.utils';
import Header from '../../components/Header';
import Button from '../../components/Button';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';
import { HelperText } from 'react-native-paper';
import { analytics } from '../../utils/analytics';
import { useNavigation } from '@react-navigation/native';

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserProfile = () => {
  const navigation = useNavigation();
  const [formState, setFormState] = useState({
    name: Auth()?.currentUser?.displayName,
    email: Auth()?.currentUser?.email,
    phoneNumber: Auth()?.currentUser?.phoneNumber,
    gender: 'N/A',
    age: null,
  });

  const [selectedGender, setSelectedGender] = useState(formState?.gender);

  const [validationErrors, setValidationErrors] = useState({
    name: null,
    email: null,
    phoneNumber: null,
    gender: null,
    age: null,
  });

  const identifer =
    Auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
    Auth()?.currentUser?.email?.split('.').join('_');

  const isGoogleOrFacebook =
    Auth()?.currentUser?.providerData?.[0].providerId === 'google.com' ||
    Auth()?.currentUser?.providerData?.[0].providerId === 'facebook.com';

  const handleSubmit = async () => {
    const userRef = database()?.ref('users');

    await userRef
      .child(identifer)
      .update({
        ...formState,
        name: formState?.name,
        gender: selectedGender,
      })
      .then(() => {
        fetchUserProfile();
      });

    ToastAndroid.show('Submitted', ToastAndroid.SHORT);
    analytics.trackEvent('user_profile', {
      CTA: 'Submitted User Info',
    });
  };

  const fetchUserProfile = async () => {
    await database()
      .ref('/users/' + identifer)
      .once('value')
      .then(data => {
        setFormState(prev => {
          return {
            ...prev,
            name: isGoogleOrFacebook
              ? Auth()?.currentUser?.displayName
              : data.val().name,
            age: data.val().age,
            gender: data.val().gender,
            email: data.val().email ?? Auth()?.currentUser?.email,
          };
        });
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleValidation = () => {
    if (!formState.name || formState.name.length <= 0) {
      setValidationErrors(prev => {
        return { ...prev, name: 'Name is required.' };
      });
    }

    if (!formState.email) {
      setValidationErrors(prev => {
        return { ...prev, email: 'Please enter a valid email.' };
      });
    }

    if (!formState.phoneNumber || formState.phoneNumber.length < 0) {
      setValidationErrors(prev => {
        return { ...prev, phoneNumber: 'Phone number is required.' };
      });
    }

    if (!formState.age || formState.age.length < 0) {
      setValidationErrors(prev => {
        return { ...prev, age: 'Age is required.' };
      });
    }

    if (!formState.gender) {
      setValidationErrors(prev => {
        return { ...prev, gender: 'Please specify a gender' };
      });
    }
  };

  return (
    <ScrollView style={styles.userProfileView}>
      <Header onPress={() => navigation.goBack()} headerTitle="User Profile" />
      <View style={styles.userProfileMainView}>
        <Text style={styles.profileText}>Profile</Text>

        <Text style={styles.inputTitle}>Username</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#B5C5EF"
          style={styles.textInput}
          value={formState?.name}
          editable={!isGoogleOrFacebook}
          onChangeText={value => {
            setValidationErrors(prev => {
              return {
                ...prev,
                name: value.length === 0 ? 'Name is required.' : null,
              };
            });
            setFormState(prev => ({ ...prev, name: value }));
          }}
          onBlur={handleValidation}
        />

        {validationErrors.name && (
          <HelperText
            style={styles.helperText}
            type="error"
            visible={validationErrors.name}>
            {validationErrors.name}
          </HelperText>
        )}

        <Text style={styles.inputTitle}>Email Address</Text>

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#B5C5EF"
          style={styles.textInput}
          value={formState?.email}
          editable={!isGoogleOrFacebook}
          onChangeText={value => {
            setValidationErrors(prev => {
              return {
                ...prev,
                email:
                  value.length === 0 ? 'Please enter a valid email.' : null,
              };
            });
            setFormState(prev => ({ ...prev, email: value }));
          }}
        />

        {validationErrors.email && (
          <HelperText
            style={styles.helperText}
            type="error"
            visible={validationErrors.email}>
            {validationErrors.email}
          </HelperText>
        )}

        <Text style={styles.inputTitle}>Phone Number</Text>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#B5C5EF"
          style={styles.textInput}
          keyboardType="numeric"
          maxLength={13}
          value={formState?.phoneNumber}
          onChangeText={value => {
            setValidationErrors(prev => {
              return {
                ...prev,
                phoneNumber:
                  value.length === 0
                    ? 'Please enter valid phone number.'
                    : null,
              };
            });
            setFormState(prev => ({ ...prev, phoneNumber: value }));
          }}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputTitle}>Gender</Text>
        <View style={styles.container}>
          <Picker
            style={[
              styles.textInput,
              {
                height: 50,
                width: scaledValue(312),
                borderRadius: scaledValue(10),
                color: '#fff',
              },
            ]}
            selectedValue={formState.gender}
            onValueChange={itemValue => {
              setSelectedGender(itemValue);
              setFormState(prev => ({ ...prev, gender: itemValue }));
            }}
            onPress={value => {
              setFormState(prev => ({ ...prev, gender: value }));
            }}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        <Text style={styles.inputTitle}>Age</Text>
        <TextInput
          placeholder="Age"
          placeholderTextColor="#B5C5EF"
          style={styles.textInput}
          keyboardType="numeric"
          maxLength={3}
          value={formState?.age}
          onChangeText={value => {
            setValidationErrors(prev => {
              return {
                ...prev,
                age: value <= 0 ? 'Please enter age.' : null,
              };
            });
            setFormState(prev => ({ ...prev, age: value }));
          }}
          onBlur={handleValidation}
        />

        {validationErrors.age && (
          <HelperText
            style={styles.helperText}
            type="error"
            visible={validationErrors.age}>
            {validationErrors.age}
          </HelperText>
        )}

        <Button
          backgroundColor="#937DE2"
          borderColor="#937DE2"
          marginTop={scaledValue(27)}
          title="SUBMIT"
          disabled={
            validationErrors.age ||
            validationErrors.name ||
            validationErrors.email
          }
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    width: scaledValue(312),
    color: '#fff',
    borderColor: '#586894',
    backgroundColor: '#586894',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    overflow: 'hidden',
  },
  userProfileView: {
    flex: 1,
    backgroundColor: '#03174C',
  },
  userProfileMainView: {
    flex: 1,
    alignItems: 'center',
    padding: scaledValue(16),
  },
  picker: {
    color: '#ffff',
    backgroundColor: '#ffff',
  },
  profileText: {
    fontSize: scaledValue(16),
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Neue',
    letterSpacing: scaledValue(1),
    lineHeight: scaledValue(22),
    color: '#fff',
    width: scaledValue(312),
  },
  inputTitle: {
    color: '#fff',
    marginTop: scaledValue(12),
    letterSpacing: scaledValue(1),
    marginBottom: scaledValue(8),
    width: scaledValue(312),
  },
  textInput: {
    backgroundColor: '#586894',
    borderColor: '#586894',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    paddingLeft: 14,
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#fff',
    width: scaledValue(312),
  },
  placeholderText: {
    zIndex: 1,
    fontSize: 14,
    color: '#B5C5EF',
    position: 'absolute',
    paddingLeft: 14.5,
    paddingBottom: 1.1,
  },
  inputView: {
    justifyContent: 'center',
  },
  helperText: {
    width: '100%',
  },
});
