import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import { scaledValue } from '~/utils/design.utils';
import { FONTS } from '~/constants';
import { RadioButton } from 'react-native-paper';
import Button from '~/components/Button';
import { Auth } from '~/firebase';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/store/UiSlice';
import { useNavigation } from '@react-navigation/native';
import { analytics } from '~/utils/analytics';
import ReactMoE from 'react-native-moengage';
const QuestionScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(null);
  const nextHandler = async () => {
    dispatch(setLoading(true));
    props.route.params.ans = checked;
    const userIdentifier =
      Auth()?.currentUser?.email?.split('.')?.join('_') ||
      Auth()?.currentUser?.phoneNumber?.replace('+', '_');
    database()
      .ref('onBoarding')
      .child(userIdentifier)
      .update(props.route.params);
    const userData = await database()
      .ref('users')
      .child(userIdentifier)
      .once('value')
      .then(val => val.val());
    analytics.setUserProperties('neend_question', props.route.params.ans);
    analytics.setUserProperties('age', JSON.parse(props.route.params.age));

    analytics.trackEvent('neend_questions', {
      CTA: 'submitted answer',
      answer: props.route.params.ans,
    });
    const preferredLanguage = userData?.languagePreference;
    if (!preferredLanguage) {
      dispatch(setLoading(false));
      navigation.replace('LanguagePicker');
      return;
    }
    dispatch(setLoading(false));
    navigation.replace('HomeScreen');
    return;
  };

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor="#0B173C" />
      <Text style={styles.question}>
        Hey, what do you want to achieve with Neend?
      </Text>
      <View>
        <View style={styles.optionView}>
          <RadioButton
            value="Improve my sleep"
            status={checked === 'Improve my sleep' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Improve my sleep')}
            uncheckedColor="rgba(151, 164, 197, 0.72)"
            color="#937DE2"
          />
          <Text
            onPress={() => setChecked('Improve my sleep')}
            style={
              checked === 'Improve my sleep'
                ? styles.optionText
                : styles.inActiveOptionText
            }>
            Improve my sleep
          </Text>
        </View>
        <View style={styles.optionView}>
          <RadioButton
            value="Manage stress or anxiety"
            status={
              checked === 'Manage stress or anxiety' ? 'checked' : 'unchecked'
            }
            onPress={() => setChecked('Manage stress or anxiety')}
            uncheckedColor="rgba(151, 164, 197, 0.72)"
            color="#937DE2"
          />
          <Text
            onPress={() => setChecked('Manage stress or anxiety')}
            style={
              checked === 'Manage stress or anxiety'
                ? styles.optionText
                : styles.inActiveOptionText
            }>
            Manage stress or anxiety
          </Text>
        </View>
        <View style={styles.optionView}>
          <RadioButton
            value="Learn to meditate"
            status={checked === 'Learn to meditate' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Learn to meditate')}
            uncheckedColor="rgba(151, 164, 197, 0.72)"
            color="#937DE2"
          />
          <Text
            onPress={() => setChecked('Learn to meditate')}
            style={
              checked === 'Learn to meditate'
                ? styles.optionText
                : styles.inActiveOptionText
            }>
            Learn to meditate
          </Text>
        </View>
        <View style={styles.optionView}>
          <RadioButton
            value="Relax with stories"
            status={checked === 'Relax with stories' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Relax with stories')}
            uncheckedColor="rgba(151, 164, 197, 0.72)"
            color="#937DE2"
          />
          <Text
            onPress={() => setChecked('Relax with stories')}
            style={
              checked === 'Relax with stories'
                ? styles.optionText
                : styles.inActiveOptionText
            }>
            Relax with stories
          </Text>
        </View>
        <View style={styles.optionView}>
          <RadioButton
            value="Other reasons"
            status={checked === 'Other reasons' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Other reasons')}
            uncheckedColor="rgba(151, 164, 197, 0.72)"
            color="#937DE2"
          />
          <Text
            onPress={() => setChecked('Other reasons')}
            style={
              checked === 'Other reasons'
                ? styles.optionText
                : styles.inActiveOptionText
            }>
            Other reasons
          </Text>
        </View>
      </View>
      <Button
        alignSelf="center"
        title="Next"
        backgroundColor="#937DE2"
        borderColor="#937DE2"
        width={scaledValue(278)}
        height={scaledValue(44)}
        fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
        fontSize={scaledValue(14)}
        marginTop={scaledValue(32)}
        onPress={nextHandler}
      />
      <View style={styles.paginationView}>
        <Text style={styles.activeNum}>2</Text>
        <Text style={styles.num}>/2</Text>
      </View>
    </View>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: scaledValue(88),
    paddingLeft: scaledValue(41),
    paddingRight: scaledValue(45),
  },
  question: {
    color: '#ffffff',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(16),
    marginBottom: scaledValue(32),
  },
  optionText: {
    color: '#ffffff',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
    marginLeft: scaledValue(10),
  },
  inActiveOptionText: {
    color: '#97A4C5',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
    marginLeft: scaledValue(10),
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledValue(26),
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
