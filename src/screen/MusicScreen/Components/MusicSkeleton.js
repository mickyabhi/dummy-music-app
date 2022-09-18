import { StyleSheet, View } from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { scaledValue } from '~/utils/design.utils';
const SkeletonUi = () => {
  return (
    <SkeletonPlaceholder backgroundColor="#1F265E" highlightColor="#937DE2">
      <View>
        <View style={styles.categoryView}>
          <View style={styles.categorySkeleton} />
          <View style={styles.categorySkeleton} />
          <View style={styles.categorySkeleton} />
          <View style={styles.categorySkeleton} />
        </View>
        <View style={styles.musicCardView}>
          <View style={styles.musicCard} />
          <View style={styles.musicCard} />
          <View style={styles.musicCard} />
          <View style={styles.musicCard} />
          <View style={styles.musicCard} />
          <View style={styles.musicCard} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
export default SkeletonUi;
const styles = StyleSheet.create({
  categorySkeleton: {
    width: scaledValue(60),
    height: scaledValue(24),
    borderRadius: scaledValue(4),
  },
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: scaledValue(360),
    paddingHorizontal: scaledValue(12),
  },
  musicCard: {
    width: scaledValue(148),
    height: scaledValue(175),
    borderRadius: scaledValue(8),
    marginTop: scaledValue(15),
  },
  musicCardView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: scaledValue(24),
    justifyContent: 'space-between',
  },
});
