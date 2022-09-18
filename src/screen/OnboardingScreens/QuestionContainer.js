import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RadioButton, Checkbox } from 'react-native-paper';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Button from '~/components/Button';

import { OnboardingFooter } from '~/navigations/OnboardingFooter';
import { OnboardingHeader } from '~/navigations/OnboardingHeader';

import { sharedStyles } from './sharedStyles';
import { updateScreenCount } from '~/store/OnboardingSlice';
import { onboardingQuestions } from '~/constants/onboarding-questions';

import { analytics } from '~/utils/analytics';
import { scaledValue } from '~/utils/design.utils';
import { saveFormState } from '~/utils/common.utils';

export const QuestionContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  // Shape of state {questionId: response}
  // note that this is not same as redux.
  // this is done purely to maintain the state of the form
  const [formState, setFormState] = useState(
    // intially form state will be populated by a redux dispatch that gets
    // its form state from localstorage
    route?.params?.formState ?? {},
  );

  const userInfo = useSelector(state => state.userInfo);

  const currentQuestion =
    onboardingQuestions[route?.params?.currentQuestionIndex];

  /**
   *  This function solely handles
   *  navigation based on current question number/index
   */
  const handleNavigation = () => {
    if (currentQuestion.id < onboardingQuestions.length - 1) {
      // Special screen after id = 2 question
      if (currentQuestion.id === 2) {
        return navigation.push('TrustedByScreen', {
          currentQuestionIndex: 3,
          formState: formState,
        });
      }

      console.log('called');
      navigation.push('QuestionsScreen', {
        currentQuestionIndex: currentQuestion.id + 1,
        formState: formState,
      });
    } else {
      return navigation.push('FinishedOnboardingScreen', {
        formState: formState,
      });
    }
  };

  return (
    <View style={sharedStyles.container}>
      <OnboardingHeader onBackPress={() => navigation.goBack()} />

      <View style={styles.innerContainer}>
        <Text style={[sharedStyles.text, { fontSize: scaledValue(16) }]}>
          {currentQuestion.question}
        </Text>

        {currentQuestion.type === 'select' && (
          <Text style={[sharedStyles.text, styles.selectInfoText]}>
            (You can choose more than one option)
          </Text>
        )}

        <View style={styles.optionsContainer}>
          {currentQuestion.type === 'radio' && (
            <RadioButton.Group
              onValueChange={async value => {
                const formUpdateObject = {
                  ...formState,
                  [currentQuestion.id]: {
                    question: currentQuestion.question,
                    response: value,
                  },
                };

                setFormState({ ...formUpdateObject });
              }}
              value={formState[currentQuestion]}>
              {currentQuestion.options.map(option => (
                <RadioButton.Item
                  key={option.id}
                  label={option.body}
                  value={option.body}
                  color={'#937DE2'}
                  uncheckedColor={'rgba(151, 164, 197, 0.72)'}
                  labelStyle={[sharedStyles.text, styles.radioItemLabel]}
                  position="leading"
                  style={styles.optionItem}
                  status={
                    formState[currentQuestion.id]?.response === option.body
                      ? 'checked'
                      : 'unchecked'
                  }
                />
              ))}
            </RadioButton.Group>
          )}

          {currentQuestion.type === 'select' && (
            <>
              {currentQuestion.options.map((option, index) => {
                return (
                  <TouchableOpacity key={option.id} style={styles.optionItem}>
                    <Checkbox.Item
                      status={
                        formState[currentQuestion.id]?.response?.includes(
                          option.body,
                        ) === true
                          ? 'checked'
                          : 'unchecked'
                      }
                      color={'#937DE2'}
                      uncheckedColor={'rgba(151, 164, 197, 0.72)'}
                      onPress={() => {
                        console.log(
                          formState[currentQuestion.id]?.response?.includes(
                            option.body,
                          ),
                        );
                        setFormState(prev => {
                          const previousOptions =
                            prev?.[currentQuestion.id]?.response ?? [];

                          return {
                            ...prev,
                            [currentQuestion.id]: {
                              question: currentQuestion.question,
                              response: formState[
                                currentQuestion.id
                              ]?.response?.includes(option.body)
                                ? previousOptions.filter(
                                    item => item !== option.body,
                                  )
                                : [...previousOptions, option.body],
                            },
                          };
                        });
                      }}
                      label={option.body}
                      position="leading"
                      style={{ width: '90%' }}
                      labelStyle={[sharedStyles.text, styles.selectItemLabel]}
                    />
                  </TouchableOpacity>
                );
              })}
            </>
          )}
        </View>

        {/* We don't render next button if type is radio */}

        <Button
          {...sharedStyles.button}
          marginTop={scaledValue(20)}
          title={'Next'}
          disabled={
            (currentQuestion.type === 'select' &&
              !formState[currentQuestion.id]?.response?.length > 0) ||
            (currentQuestion.type === 'radio' &&
              !formState[currentQuestion.id]?.response)
          }
          onPress={async () => {
            analytics.trackEvent(`oq_${currentQuestion.code}_nextbutton`, {
              question: currentQuestion.question,
              response: formState[currentQuestion.id]?.response,
            });

            dispatch(updateScreenCount({ type: 'increment' }));

            await saveFormState(formState, userInfo.id);

            handleNavigation();
          }}
        />
      </View>

      <OnboardingFooter
        showSkip={currentQuestion.id === 0}
        formState={formState}
        currentQuestionIndex={route?.params?.currentQuestionIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop: scaledValue(20),
    paddingHorizontal: scaledValue(40),
  },
  optionsContainer: {
    marginTop: scaledValue(10),
    // using negative margin to make it look like a list
    marginHorizontal: scaledValue(-20),
    flex: 1,
  },
  optionItem: {
    marginVertical: scaledValue(5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: scaledValue(16),
  },
  selectInfoText: {
    fontSize: scaledValue(14),
    marginTop: scaledValue(5),
    color: 'rgba(151, 164, 197, 0.72)',
  },
  radioItemLabel: {
    marginLeft: scaledValue(10),
    textAlign: 'left',
  },
  selectItemLabel: {
    marginLeft: scaledValue(10),
    textAlign: 'left',
    width: '100%',
  },
});
