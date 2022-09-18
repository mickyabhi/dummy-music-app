import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { analytics } from '~/utils/analytics';
import { scaledValue } from '~/utils/design.utils';

export const FloatingButton = () => {
  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: scaledValue(60),
      padding: scaledValue(8),
      backgroundColor: '#937DE2',
      zIndex: 99,
    },
  });
  const navigation = useNavigation();

  return (
    <FAB
      style={styles.fab}
      small
      color="#fff"
      icon={require('assets/images/expert_button_icon_2.png')}
      onPress={() => {
        navigation.navigate('Experts');
        analytics.trackEvent('experts_floating_button_clicked', {});
      }}
    />
  );
};
