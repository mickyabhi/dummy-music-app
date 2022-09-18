import { StyleSheet } from 'react-native';
import React from 'react';
import { Badge } from 'react-native-paper';
import { scaledValue } from '~/utils/design.utils';
import { FONTS } from '~/constants';

const BadgeComponent = props => {
  const styles = StyleSheet.create({
    badge: {
      borderRadius: scaledValue(2),
      position: 'absolute',
      fontSize: scaledValue(10),
      top: props.top ? props.top : scaledValue(10),
      right: scaledValue(29),
      backgroundColor: '#937DE2',
      color: '#ffffff',
      fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    },
  });
  return (
    <>
      {props.badgeCount !== 0 && (
        <Badge style={styles.badge} size={scaledValue(13)}>
          {props.badgeCount}
        </Badge>
      )}
    </>
  );
};

export default BadgeComponent;
