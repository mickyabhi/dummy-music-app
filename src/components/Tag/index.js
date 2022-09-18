import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scaledValue } from '~/utils/design.utils';
import { FONTS } from '~/constants';

const Tag = props => {
  const styles = StyleSheet.create({
    tagView: {
      backgroundColor: props?.tagColor,
      paddingHorizontal: scaledValue(6),
      paddingTop: scaledValue(3),
      paddingBottom: scaledValue(4),
      borderTopRightRadius: scaledValue(10),
      borderBottomRightRadius: scaledValue(10),
      position: 'absolute',
      top: props?.top,
      zIndex: 1,
    },
    tagText: {
      fontSize: props?.fontSize,
      fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    },
  });
  return (
    <>
      {props?.tagName && (
        <View style={styles.tagView}>
          <Text style={styles.tagText}>{props?.tagName}</Text>
        </View>
      )}
    </>
  );
};

export default Tag;
