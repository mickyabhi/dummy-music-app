import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { scaledValue } from '~/utils/design.utils';
import { FONTS } from '~/constants';

const HeadingTitle = props => {
  return (
    <View style={styles.headingContainer(props?.marginHorizontal)}>
      <Text style={styles.headingTitle}>{props?.title}</Text>
      <TouchableOpacity>
        <Text style={styles.moreText} onPress={props?.onPress}>
          {props?.more}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeadingTitle;

const styles = StyleSheet.create({
  headingContainer: marginHorizontal => ({
    marginTop: scaledValue(7),
    marginBottom: scaledValue(12.67),
    marginHorizontal: marginHorizontal ? marginHorizontal : scaledValue(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  headingTitle: {
    fontSize: scaledValue(14),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  moreText: {
    color: 'rgba(147, 125, 226, 1)',
    letterSpacing: scaledValue(0.8),
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
});
