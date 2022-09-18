import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { style } from '../../screen/AppScreens/style';
import { analytics } from '~/utils/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';
import { scaledValue } from '~/utils/design.utils';
import { Button } from 'react-native-paper';
import Badge from '../../components/Badge';
import { setLoading } from '~/store/UiSlice';
import drawerIcon from '../../../assets/images/drawerIcon.png';

export const ScreenHeader = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);
  const currentLanguage = useSelector(state => state.ui.currentLanguage);
  const availableLanguages = useSelector(state => state.ui.availableLanguages);
  const cartValue = useSelector(state => state.ui.cartCount);
  const drawerToggleHandle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
    analytics.trackEvent('Drawer', {
      CTA: 'OpenDrawer',
    });
  };

  return (
    <View style={styles.headerView}>
      <View style={style.drawerNdTextView}>
        <IconButton
          icon={drawerIcon}
          color="#fff"
          onPress={drawerToggleHandle}
          size={scaledValue(24)}
          style={style.drawerIconImg}
        />

        <>
          {!props?.headerTitle && (
            <Text style={style.welcomeText}>{`Hello ${
              userInfo?.username?.split(' ')[0]
            }`}</Text>
          )}

          {props?.headerTitle && (
            <Text style={style.welcomeText}>{props.headerTitle}</Text>
          )}
          {props?.musicButton && (
            <Button
              mode="outlined"
              uppercase={false}
              icon={props?.musicButton}
              onPress={() => {
                navigation.navigate('LanguagePicker', {
                  inAppLanguagePicker: true,
                });
              }}
              labelStyle={style.langButtonText}
              color="#fff"
              style={style.languageButton}>
              {availableLanguages[currentLanguage]}
            </Button>
          )}
        </>

        {props?.emptyCart && (
          <>
            <IconButton
              icon={props?.emptyCart}
              color="#ffffff"
              size={24.91}
              onPress={() => {
                navigation.navigate('ProductCart');
                analytics.trackEvent('shop_screen', {
                  CTA: 'CartButton',
                });
                dispatch(setLoading(true));
              }}
              style={style.cartButton}
            />
            <Badge top={scaledValue(16)} badgeCount={cartValue} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: scaledValue(360),
  },
});
