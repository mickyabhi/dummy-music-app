import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FONTS } from '~/constants';
import { analytics } from '~/utils/analytics';
import { scaledValue } from '~/utils/design.utils';
const ResendCodeUI = props => {
  const [time, setTime] = useState(30);
  const [otpTimeout, setOtpTimeout] = useState(null);

  useEffect(() => {
    if (time > 0) {
      setOtpTimeout(setTimeout(() => setTime(time - 1), 1000));
    }
  }, [time]);

  useEffect(() => {
    if (otpTimeout && props.clearOtpTimeout) clearTimeout(otpTimeout);
  }, [otpTimeout, props.clearOtpTimeout]);

  const otpHandler = () => {
    analytics.trackEvent('resend_OTP', {
      CTA: 'User requested OTP to be resent',
    });
    props.setUserInFirebase();
    setTime(30);
  };

  return (
    <TouchableOpacity
      style={style.touchableStyle}
      disabled={time > 0}
      onPress={otpHandler}>
      <Text style={style.text}>
        <Text style={{ color: time > 0 ? '#9F9F9F' : '#937DE2' }}>
          RESEND OTP{' '}
        </Text>
        {time > 0 && <>in {time} sec</>}
      </Text>
    </TouchableOpacity>
  );
};
export default ResendCodeUI;
const style = StyleSheet.create({
  text: {
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    fontSize: scaledValue(14),
    letterSpacing: 0.8,
    color: '#9F9F9F',
    marginTop: 16,
    width: scaledValue(290),
  },
  touchableStyle: {
    marginTop: scaledValue(53),
  },
});
