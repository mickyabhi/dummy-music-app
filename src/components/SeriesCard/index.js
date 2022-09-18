import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { scaledValue } from '~/utils/design.utils';
import { BaseURL, FONTS } from '~/constants';

const SeriesCard = props => {
  return (
    <View style={styles.card(props?.marginRight)}>
      <TouchableOpacity style={styles.View} onPress={props?.onPress}>
        <View style={styles.bgImageView}>
          <Image
            imageStyle={{ borderRadius: scaledValue(8) }}
            style={styles.bgImage}
            source={{
              uri: BaseURL + props?.artwork,
            }}
          />
        </View>
        <View style={styles.seriesDetailsView}>
          <Text style={styles.seriesTitle} numberOfLines={1}>
            {props?.seriesTitle}
          </Text>
          <View style={styles.seriesPartView}>
            {props?.seriesCount && (
              <>
                <Text style={styles.seriesText}>Series</Text>
                <Text style={styles.partCount}>
                  {' '}
                  • {props?.seriesCount} parts
                </Text>
              </>
            )}
            {props?.mins && (
              <Text style={styles.partCount}> {props?.mins}</Text>
            )}
          </View>
        </View>
        {/* <Tag
          tagColor={props?.tag?.color}
          tagName={props?.tag?.name}
          top={scaledValue(11)}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export default SeriesCard;

const styles = StyleSheet.create({
  card: marginRight => ({
    width: scaledValue(132),
    marginRight: marginRight,
  }),
  View: {
    backgroundColor: '#1F265E',
    borderRadius: scaledValue(8),
    padding: scaledValue(6),
    marginBottom: scaledValue(15),
    elevation: scaledValue(6),
  },
  bgImageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: scaledValue(80.05),
    borderRadius: scaledValue(8),
  },
  seriesDetailsView: {
    paddingVertical: scaledValue(2),
    paddingHorizontal: scaledValue(5),
    width: '100%',
  },
  seriesTitle: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(0.3),
    color: '#E6E7F2',
    marginTop: scaledValue(6),
  },
  seriesPartView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: scaledValue(4),
  },

  seriesText: {
    fontSize: scaledValue(10),
    letterSpacing: scaledValue(0.8),
    color: '#98A0BD',
  },

  partCount: {
    fontSize: scaledValue(10),
    color: '#98A0BD',
  },
});
