import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { scaledValue } from '~/utils/design.utils';
import { FONTS } from '../../constants';

const ProductCategoryTab = props => {
  return (
    <TouchableOpacity
      style={styles.tabView(props.backgroundColor)}
      onPress={props.onPress}>
      <Text style={styles.tabCategoryName}>{props?.tabName}</Text>
    </TouchableOpacity>
  );
};

export default ProductCategoryTab;

const styles = StyleSheet.create({
  tabCategoryName: {
    color: '#fff',
    fontSize: scaledValue(12),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    padding: scaledValue(7),
  },
  tabView: backgroundColor => ({
    marginRight: scaledValue(28),
    borderBottomColor: backgroundColor,
    borderBottomWidth: scaledValue(2),
  }),
});
