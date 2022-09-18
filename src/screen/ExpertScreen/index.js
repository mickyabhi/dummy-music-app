import React from 'react';
import { View, Text, Linking } from 'react-native';
import Header from '~/components/Header';
import FastImage from 'react-native-fast-image';
import Button from '~/components/Button';
import { analytics } from '~/utils/analytics';
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '~/constants';
import { styles } from './styles';

export const ExpertScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header
        onPress={() => navigation.goBack()}
        headerTitle="Talk to expert"
      />
      <View style={styles.container}>
        <FastImage
          style={styles.imageStyles}
          source={require('../../../assets/images/experts_logo.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.expertTextView}>
          <Text style={styles.boldText}>Facing sleep crisis?</Text>
          <Text style={styles.text}>
            Support from a qualified expert is just a click away!
          </Text>
          <Button
            title="Send Message"
            backgroundColor={'#937DE2'}
            borderColor={'#937DE2'}
            marginTop={48}
            width={'100%'}
            fontSize={16}
            fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
            onPress={() => {
              analytics.trackEvent('expert_screen_send_message_button', {});
              Linking.openURL('https://forms.gle/G5SUtT7cwCSkuh1EA');
            }}
          />
          <Text style={styles.smallText}>
            Send us a message & we will get back to you.
          </Text>
        </View>
      </View>
    </>
  );
};
