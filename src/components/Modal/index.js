import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { screenHeight, screenWidth } from '~/constants';

const Modal = () => {
  return (
    <View style={style.View}>
      <View style={style.ModalBackground} />
      <View style={style.ModalView}>
        <View style={style.modalImageView}>
          <FastImage
            style={style.thumbImg}
            source={require('../../../assets/images/ThumbsUp.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={style.mainFeedbackView}>
          <Text style={style.textLabel}>Thank You!</Text>
          <Text style={style.Text2}>
            Your feedback will help us improve your experience.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Modal;

const style = StyleSheet.create({
  mainFeedbackView: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  View: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  ModalBackground: {
    height: screenHeight,
    width: screenWidth,
    position: 'absolute',
    backgroundColor: '#03174C',
    opacity: 0.8,
  },
  ModalView: {
    width: 300,
    height: 300,
    backgroundColor: '#03174C',
    borderColor: '#4E579F',
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 34,
    textAlign: 'center',
    letterSpacing: 0.32,
    color: '#FFFFFF',
  },
  Text2: {
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.8,
    color: '#CDCDCD',
    paddingTop: 16,
    marginHorizontal: 44,
  },
  modalImageView: {
    alignItems: 'center',
    marginTop: 24,
  },
  thumbImg: {
    width: 60,
    height: 60,
  },
});
