import { StyleSheet, View } from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { scaledValue } from '~/utils/design.utils';

const SkeletonUi = () => {
  return (
    <SkeletonPlaceholder backgroundColor="#1F265E" highlightColor="#937DE2">
      <View style={styles.mainView}>
        <View style={styles.categoryView}>
          <View style={styles.categorySkeleton} />
          <View style={styles.categorySkeleton} />
          <View style={styles.categorySkeleton} />
          <View style={styles.categorySkeleton} />
        </View>
        <View style={styles.musicCard} />
        <View style={styles.musicCard} />
        <View style={styles.musicCard} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonUi;

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: scaledValue(24),
    paddingTop: scaledValue(12),
    width: scaledValue(360),
    height: '100%',
  },
  categorySkeleton: {
    width: scaledValue(60),
    height: scaledValue(24),
    borderRadius: scaledValue(4),
  },
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  musicCard: {
    width: scaledValue(312),
    height: scaledValue(216),
    borderRadius: scaledValue(8),
    marginTop: scaledValue(15),
  },
  musicSmallCard: {
    width: scaledValue(312),
    height: scaledValue(90),
    borderRadius: scaledValue(8),
    marginTop: scaledValue(15),
  },
});
