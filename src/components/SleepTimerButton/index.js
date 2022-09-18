import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { scaledValue } from '~/utils/design.utils';
import { Button, IconButton } from 'react-native-paper';
import pencilIcon from '../../../assets/images/pencilIcon.png';
import deleteIcon from '../../../assets/images/deleteIcon.png';
import clockIcon from '../../../assets/images/clockIcon.png';
import linearBg from '../../../assets/images/linear-Background.png';
import { styles } from './styles';
const SleepTimerButton = props => {
  return (
    <>
      {!props?.sleepTime && (
        <TouchableOpacity
          style={styles.sleepTimerButtonView}
          onPress={props.onPress}>
          <View>
            <ImageBackground
              source={linearBg}
              resizeMode="cover"
              style={styles.img}>
              <View style={styles.sleepTimeIconTextView}>
                <IconButton
                  style={styles.clockIcon}
                  color="#fff"
                  size={scaledValue(20)}
                  icon={clockIcon}
                />
                <Text style={styles.sleepTimerText}>Sleep Timer</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      )}
      {props?.sleepTime && (
        <ImageBackground
          source={linearBg}
          resizeMode="cover"
          style={styles.sleepTimerButtonView}>
          <View style={styles.sleepTimerActiveButtonView}>
            <View style={styles.editSleepTimerView}>
              <IconButton
                color="#fff"
                size={scaledValue(14)}
                icon={clockIcon}
              />
              <Text style={styles.sleepTimerText}>
                Sleep Timer: <Text style={styles.onText}>On</Text>
              </Text>
            </View>

            <View style={styles.deleteEditButton}>
              <Button
                color="#97A4C5"
                labelStyle={styles.buttonText}
                icon={pencilIcon}
                mode="text"
                uppercase={false}
                onPress={props.editHandler}>
                Edit
              </Button>
              <Button
                color="#97A4C5"
                labelStyle={styles.buttonText}
                icon={deleteIcon}
                mode="text"
                uppercase={false}
                onPress={props.deleteHandler}>
                Delete
              </Button>
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};

export default SleepTimerButton;
