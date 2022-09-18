import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';
import languageIcon from '~assets/images/language.png';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import Chip from '~/components/ChipButton';
import Header from '~/components/Header';
import { useNavigation } from '@react-navigation/native';

const Language = props => {
  const navigation = useNavigation();
  const availableLanguages = useSelector(state => state.ui.availableLanguages);

  const handleBackNavigation = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.languageContainer}>
      {!props?.route?.params?.inAppLanguagePicker && (
        <StatusBar backgroundColor="#0B173C" />
      )}
      {props?.route?.params?.inAppLanguagePicker && (
        <Header onPress={handleBackNavigation} />
      )}
      <View style={styles.container(props?.route?.params?.inAppLanguagePicker)}>
        <FastImage
          style={styles.imageStyles}
          source={languageIcon}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.boldText}>
            Choose your preferred {'\n'}
            <Text style={styles.yellowText}>audio language</Text>
          </Text>
          <View style={styles.languageButtonContainer}>
            {Object.keys(availableLanguages).map(x => {
              return <Chip key={x} label={availableLanguages[x]} value={x} />;
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
export default Language;
