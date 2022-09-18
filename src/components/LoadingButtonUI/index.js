import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
const LoadingButtonUI = props => {
  const style = StyleSheet.create({
    ButtonView: {
      backgroundColor: '#937DE2',
      borderRadius: 38,
      alignItems: 'center',
      height: props.height,
      justifyContent: 'center',
      width: 312,
      marginTop: props.marginTop !== undefined ? props.marginTop : 57,
    },
  });
  return (
    <View style={style.ButtonView}>
      <ActivityIndicator size={props.height - 15} color="#FFFFFF" />
    </View>
  );
};
export default LoadingButtonUI;
