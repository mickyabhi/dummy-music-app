import React from 'react';
import { View, Text, Switch } from 'react-native';
import { scaledValue } from '~/utils/design.utils';
export const LanguageToggle = ({ isLanguage, toggleSwitch }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: !isLanguage.includes('hi') ? '#BDBDBD' : '#f4f3f4',
          fontWeight: 'bold',
        }}>
        हिन्दी
      </Text>
      <Switch
        trackColor={{ false: 'rgba(189, 189, 189, 0.56)', true: '#424141' }}
        thumbColor={isLanguage === 'en' ? '#F8E71C' : '#BDBDBD'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isLanguage.includes('en') && true}
      />
      <Text
        style={{
          color: isLanguage.includes('en') ? '#F8E71C' : '#BDBDBD',
          fontWeight: 'bold',
          paddingHorizontal: scaledValue(5),
          fontSize: scaledValue(10),
        }}>
        Eng
      </Text>
    </View>
  );
};
