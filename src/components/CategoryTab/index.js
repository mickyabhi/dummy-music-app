import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { scaledValue } from '~/utils/design.utils';
import { FONTS } from '~/constants';
import { TouchableRipple } from 'react-native-paper';
import { convertCase } from '~/utils/common.utils';

const CategoryTab = props => {
  return (
    <TouchableRipple style={styles.categoryContainer} onPress={props.onPress}>
      <Text
        key={props.category}
        style={
          props.activeTab === props.category
            ? styles.categoryTextActive
            : styles.categoryText
        }>
        {convertCase(props.category)}
      </Text>
    </TouchableRipple>
  );
};

export default CategoryTab;

const styles = StyleSheet.create({
  categoryText: {
    color: '#515979',
    fontSize: scaledValue(12),
    textAlign: 'center',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  categoryTextActive: {
    borderBottomColor: '#937DE2',
    borderBottomWidth: scaledValue(3),
    fontSize: scaledValue(12),
    paddingBottom: scaledValue(7.46),
    color: '#fff',
    fontFamily: FONTS.OPEN_SANS_REGULAR,
  },
  categoryContainer: {
    paddingLeft: scaledValue(10),
    paddingRight: scaledValue(10),
    paddingTop: scaledValue(5),
    paddingBottom: scaledValue(5),
    borderRadius: scaledValue(8),
    marginBottom: scaledValue(19),
  },
});
