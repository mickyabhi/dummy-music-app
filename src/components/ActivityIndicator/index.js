import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';

export const ActivityIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <RNActivityIndicator animating={true} size="large" color="#937DE2" />
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: 'row',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
});
