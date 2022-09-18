import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { scaledValue } from '~/utils/design.utils';
const CounterButton = props => {
  const styles = StyleSheet.create({
    buttonView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    counterButton: {
      flexDirection: 'row',
      width: props.width,
      height: props.height,
      borderWidth: scaledValue(1),
      borderColor: '#BBC0CF',
      borderRadius: scaledValue(32),
    },
    text: {
      color: '#BBC0CF',
      fontSize: props.fontSize,
    },
  });

  return (
    <View style={styles.counterButton}>
      <TouchableOpacity
        disabled={props.touchableDisable}
        onPress={props.decreaseQuantity}
        style={styles.buttonView}>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
      <View style={styles.buttonView}>
        <Text style={styles.text}>{props.quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={props.increaseQuantity}
        style={styles.buttonView}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CounterButton;
