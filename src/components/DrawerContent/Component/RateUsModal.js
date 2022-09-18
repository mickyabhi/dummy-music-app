import * as React from 'react';
import { Modal } from 'react-native-paper';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scaledValue } from '~/utils/design.utils';
import Button from '~/components/Button';
import rateStars from '~assets/images/ratingStars.png';
import { useDispatch } from 'react-redux';
import { toggleRateUsModal } from '~/store/UiSlice';
import FastImage from 'react-native-fast-image';
import cancelIcon from '../../../../assets/images/cancel_icon.png';
import { FONTS } from '~/constants';

const RateUsModal = ({ visible, onPress, hideModal }) => {
  const dispatch = useDispatch();

  const containerStyle = {
    backgroundColor: '#0B173C',
    top: scaledValue(118),
    right: scaledValue(24),
    left: scaledValue(24),
    position: 'absolute',
    borderRadius: scaledValue(8),
    borderWidth: scaledValue(1),
    borderColor: '#4E579F',
    alignItems: 'center',
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}>
      <FastImage
        style={styles.ratingStarsImg}
        source={rateStars}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.ratingTitleText}>Like Neend?</Text>
      <Text style={styles.ratingMsgText}>
        Please take a moment to rate us and share your feedback with us.
      </Text>
      <Button
        width={scaledValue(264)}
        marginTop={0}
        title="Rate us on playstore"
        onPress={onPress}
        fontSize={scaledValue(14)}
        backgroundColor="#937DE2"
        borderColor="#937DE2"
        fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
        marginBottom={scaledValue(29.07)}
      />
      <TouchableOpacity
        style={styles.backNavigationView}
        onPress={() => {
          dispatch(toggleRateUsModal(false));
        }}>
        <FastImage
          style={styles.cancelIcon}
          source={cancelIcon}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </Modal>
  );
};

export default RateUsModal;

const styles = StyleSheet.create({
  ratingStarsImg: {
    width: scaledValue(121.73),
    height: scaledValue(54.86),
    marginBottom: scaledValue(19.37),
    marginTop: scaledValue(49.16),
  },
  ratingTitleText: {
    color: '#fff',
    fontSize: scaledValue(16),
    marginBottom: scaledValue(16),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
  },
  ratingMsgText: {
    color: '#CDCDCD',
    lineHeight: scaledValue(20),
    width: scaledValue(222),
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(0.8),
    marginBottom: scaledValue(21.07),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    textAlign: 'center',
  },
  backNavigationView: {
    position: 'absolute',
    right: scaledValue(8),
    top: scaledValue(8),
    padding: scaledValue(5),
  },
  cancelIcon: {
    width: scaledValue(20),
    height: scaledValue(20),
    marginTop: scaledValue(18.06),
    marginRight: scaledValue(14),
  },
});
