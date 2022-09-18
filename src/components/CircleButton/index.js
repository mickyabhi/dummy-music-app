import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const CircleButton = ({ buttonSize, onPress, size, icon }) => {
  return (
    <TouchableOpacity
      style={{ width: buttonSize, height: buttonSize }}
      onPress={onPress}>
      <View style={style.iconContainer}>{icon}</View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#ADB7E4',
    borderRadius: 65,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircleButton;
