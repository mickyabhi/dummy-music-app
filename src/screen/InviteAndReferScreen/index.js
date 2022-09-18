import React from 'react';
import { Alert, View, Share } from 'react-native';
import { styles } from './styles';
import { Auth } from '~/firebase';
import Header from '~/components/Header';
import Button from '~/components/Button';
import shareMsg from '~assets/images/shareText.png';
import mobileIcon from '~assets/images/mobileIcon.png';
import { analytics } from '~/utils/analytics';
import { scaledValue } from '~/utils/design.utils';
import FastImage from 'react-native-fast-image';
import { FONTS } from '~/constants';
import { useNavigation } from '@react-navigation/native';

const InviteAndRefer = () => {
  const navigation = useNavigation();
  const phnNumber = Auth()?.currentUser?.phoneNumber;
  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: `Listen to relaxing sleep stories with me for free! Neend's stories are crafted by experts, and proven to work. Here's my invite link https://tinyurl.com/r3tsenhj`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          analytics.trackEvent('refer_share', {
            CTA: 'Shared',
            User_PhoneNumber: phnNumber,
          });
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View styles={styles.inviteAndReferView}>
      <Header onPress={() => navigation.goBack()} headerTitle="Refer & Earn" />
      <View style={styles.inviteAndReferMainView}>
        <FastImage
          style={styles.inviteMsgImage}
          source={shareMsg}
          resizeMode={FastImage.resizeMode.contain}
        />
        <FastImage
          style={styles.inviteMobileImage}
          source={mobileIcon}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.shareView}>
          {/* <Text style={styles.shareText}>Share the referral link via</Text> */}

          <Button
            width={scaledValue(280)}
            height={scaledValue(48)}
            marginTop={scaledValue(0)}
            title="Share with Friends"
            onPress={shareApp}
            backgroundColor="#937DE2"
            borderColor="#937DE2"
            borderWidth={scaledValue(1)}
            fontSize={scaledValue(14)}
            fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
          />
        </View>
      </View>
    </View>
  );
};

export default InviteAndRefer;
