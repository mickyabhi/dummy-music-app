import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { scaledValue } from '~/utils/design.utils';
import { BaseURL } from '~/constants';
import whatsAppIcon from '~assets/images/Whatsapp.png';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import { useDispatch } from 'react-redux';
import { toggleActivityModal } from '~/store/UiSlice';
import { analytics } from '~/utils/analytics';

const ZenSparkCard = ({ data, activeCategory }) => {
  const fs = RNFetchBlob.fs;
  let imagePath = null;
  const dispatch = useDispatch();

  const convertToBase64 = shareableData => {
    if (shareableData !== null) {
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', BaseURL + shareableData.shareArtwork)
        .then(resp => {
          imagePath = resp.path();
          return resp.readFile('base64');
        })
        .then(base64 => {
          const shareData = {
            url: `data:image/jpeg;base64,${base64}`,
            message:
              'Sent from the Neend app. Download it from here: https://play.google.com/store/apps/details?id=com.neend',
          };
          Share.open(shareData);

          analytics.trackEvent('quotes_share', {
            action_source: 'quotes_card',
            subcategory: activeCategory,
            current_quotes_image: shareableData.shareArtwork,
            current_quotes_message: shareableData.message,
            id: shareableData.id,
          });

          dispatch(toggleActivityModal(false));
          return fs.unlink(imagePath);
        })
        .catch(error => {
          dispatch(toggleActivityModal(false));
        });
    }
  };

  return (
    <View style={style.trackCardMainView}>
      <View style={style.trackCardImageView}>
        <ImageBackground
          imageStyle={style.imageStyle}
          style={style.trackCardImage}
          source={{ uri: BaseURL + data.thumbnailArtwork }}
        />
        <TouchableOpacity
          style={style.cardBottom}
          onPress={() => {
            convertToBase64(data);
          }}>
          <Image
            source={whatsAppIcon}
            style={{
              width: scaledValue(23),
              height: scaledValue(23),
              marginRight: scaledValue(5),
            }}
          />
          <Text style={style.cardText}>Share with friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ZenSparkCard;

const style = StyleSheet.create({
  cardBottom: {
    flexDirection: 'row',
    marginTop: scaledValue(10),
    marginBottom: scaledValue(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  trackCardMainView: {
    width: scaledValue(312),
    height: scaledValue(245),
    paddingTop: scaledValue(5),
    paddingBottom: scaledValue(3.28),
    marginBottom: scaledValue(12),
    backgroundColor: '#1F265E',
    borderRadius: scaledValue(8),
    marginHorizontal: scaledValue(24),
  },
  flex: {
    flexDirection: 'row',
  },

  trackCardImageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackCardImage: {
    width: scaledValue(300),
    marginTop: scaledValue(20),
    height: scaledValue(190),
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackCardInfoView: {
    paddingLeft: scaledValue(9.31),
    paddingVertical: scaledValue(14),
  },
  imageStyle: {
    borderRadius: scaledValue(8),
  },
  cardText: {
    fontSize: scaledValue(16),
    letterSpacing: 0.8,
    color: '#fff',
    fontWeight: '400',
  },
  whatsAppIcon: {
    width: scaledValue(24),
    height: scaledValue(24),
    marginRight: scaledValue(6),
  },
});
