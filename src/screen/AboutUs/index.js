import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import Header from '~/components/Header';
import { styles } from './styles';
import { scaledValue } from '~/utils/design.utils';

const AboutUs = () => {
  const navigation = useNavigation();


  return (
    <ScrollView style={styles.aboutUsView}>
      <Header
        onPress={() => navigation.goBack()}
        headerTitle="About Us"
        fontSize={scaledValue(16)}
      />
      <View style={styles.aboutUsMainView}>
        <View style={styles.logoView}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.neendLogo}
          />
        </View>
        <Text style={styles.aboutAppText}>
          We are Neend - India’s first and only free app that uses stories in
          regional language along with music to help you fall asleep sooner, and
          sleep better. From helping millions discover the benefits of Yog Nidra
          to introducing Indians to launching sleep-aid products like Sleep
          Gummies that help you relax and sleep better, Neend effortlessly fuses
          the latest tech with homegrown ancient science.
        </Text>
        <Text style={styles.aboutAppText}>
          On digital front, we are reimagining bedtime stories. Carefully
          crafted and built for adults, our stories feature soothing narration
          from India’s best storytellers. We also offer music-based meditation
          along with white noise, ASMR, and Yog Nidra. We already have bedtime
          stories in Hindi, and English. And, are soon dropping soothing stories
          in regional languages like Marathi, Tamil, and Telugu.
        </Text>
        <Text style={styles.aboutAppText}>
          Our sleep aid products use scientifically proven methods to help you
          rest easily, and sleep peacefully.
        </Text>
        <Text style={styles.aboutAppText}>
          With our digital and offline offerings, you can count on us to provide
          everything you need to sleep better.
        </Text>
        <Text style={styles.allRightText}>
          &copy; All Rights Reserved. Purple Bot Technologies Pvt. Ltd.
        </Text>
      </View>
    </ScrollView>
  );
};
export default AboutUs;
