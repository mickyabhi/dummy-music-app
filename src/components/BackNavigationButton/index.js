import React, { memo } from 'react';
import { IconButton } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { scaledValue } from '~/utils/design.utils';
import backIcon from '../../../assets/images/backarrow.png';
import minimiseIcon from '../../../assets/images/minimise.png';

const BackNavigationButton = props => {
  const style = StyleSheet.create({
    View: {
      width: props?.hw,
      height: props?.hw,
      padding: scaledValue(5),
    },
    backNavigationIcon: {
      backgroundColor: 'rgba(3, 23, 76, 0.5)',
      borderRadius: scaledValue(38),
      width: scaledValue(32),
      height: scaledValue(32),
      alignItems: 'center',
      justifyContent: 'center',
    },
    crossIcon: {
      width: scaledValue(18),
      height: scaledValue(18),
    },
    backIcon: {
      backgroundColor: 'rgba(3, 23, 76, 0.5)',
      borderRadius: scaledValue(38),
      width: scaledValue(32),
      height: scaledValue(32),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  if (props?.title === 'back') {
    return (
      <IconButton
        style={style.backIcon}
        icon={backIcon}
        color="#fff"
        size={props?.size}
        onPress={props?.onPress}
      />
    );
  } else {
    return (
      <TouchableOpacity style={style.View} onPress={props?.onPress}>
        <View style={style.backNavigationIcon}>
          <Image style={style.crossIcon} source={minimiseIcon} />
        </View>
      </TouchableOpacity>
    );
  }
};
export default memo(BackNavigationButton);
