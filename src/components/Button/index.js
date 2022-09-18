import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scaledValue } from '~/utils/design.utils';

const Button = props => {
  const Icon = props.icon;

  const style = StyleSheet.create({
    buttonView: {
      backgroundColor:
        props.disabled === true ? '#586894' : props.backgroundColor,
      borderWidth: props.borderWidth ? props.borderWidth : 3,
      borderColor: props.borderColor !== undefined ? props.borderColor : '#fff',
      borderRadius: props.borderRadius ? props.borderRadius : 50,
      alignItems: 'center',
      alignSelf: props.alignSelf,
      height: props.height !== undefined ? props.height : 48,
      justifyContent: 'center',
      width: props.width !== undefined ? props.width : 312,
      flexDirection: 'row',
      marginTop: props.marginTop,
      marginHorizontal:
        props.marginHorizontal !== undefined ? props.marginHorizontal : 0,
    },

    buttonText: {
      fontFamily: props.fontFamily || 'Helvetica Neue',
      fontSize: props?.fontSize || 13,
      color: props.color || props.disabled === true ? '#97A4C5' : '#FFFFFF',
      textTransform: props.textTransform,
      letterSpacing: props.letterSpacing || 0,
    },
    buttonContainer: {
      marginTop: props.marginTop !== undefined ? props.marginTop : 0,
      marginLeft: props.marginLeft !== undefined ? props.marginLeft : 0,
      marginRight: props.marginRight !== undefined ? props.marginRight : 0,
      marginBottom: props.marginBottom !== undefined ? props.marginBottom : 0,
      paddingHorizontal:
        props.paddingHorizontal !== undefined ? props.paddingHorizontal : 0,
    },
  });
  return (
    <TouchableOpacity
      style={style.buttonContainer}
      disabled={props.disabled}
      onPress={props?.onPress}>
      <View style={style.buttonView}>
        {props.icon && (
          <View style={{ marginRight: scaledValue(5) }}>
            {props.icon && Icon}
          </View>
        )}
        <Text style={style.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Button;
