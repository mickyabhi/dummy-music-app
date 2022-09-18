import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/store/UiSlice';

const CheckOut = props => {
  console.log('uri', props?.route?.params?.checkOutLink);
  const dispatch = useDispatch();
  return (
    <WebView
      source={{
        uri: props?.route?.params?.checkOutLink,
      }}
      onLoadEnd={() => dispatch(setLoading(false))}
      style={styles.checkOutWebView}
    />
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  checkOutWebView: {
    flex: 1,
  },
});
