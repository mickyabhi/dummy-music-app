import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import BackNavigationButton from '../BackNavigationButton';
import { useNavigation } from '@react-navigation/native';
import { scaledValue } from '~/utils/design.utils';
import { FONTS } from '~/constants';
import { IconButton } from 'react-native-paper';
import emptyCart from '../../../assets/images/empty_cart.png';
import Badge from '../../components/Badge';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/store/UiSlice';

const Header = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.headerView}>
      <StatusBar backgroundColor="#0B173C" />
      <BackNavigationButton onPress={props.onPress} title="back" size={24} />
      <Text style={styles.headerTitle(props.fontSize, props.marginLeft)}>
        {props.headerTitle}
      </Text>
      {props.icon && (
        <>
          <IconButton
            icon={emptyCart}
            color="#ffffff"
            size={24}
            onPress={() => {
              navigation.navigate('ProductCart');
              dispatch(setLoading(true));
            }}
            style={styles.cartButton}
          />
          <Badge top={scaledValue(16)} badgeCount={props.badgeCount} />
        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerTitle: (fontSize, marginLeft) => ({
    color: '#fff',
    marginLeft: marginLeft || scaledValue(16),
    fontSize: fontSize || scaledValue(16),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    lineHeight: scaledValue(34),
    fontStyle: 'normal',
  }),
  headerView: {
    height: scaledValue(56),
    paddingHorizontal: scaledValue(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    position: 'absolute',
    right: scaledValue(20),
  },
});
