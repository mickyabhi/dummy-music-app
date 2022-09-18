import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import { analytics } from '~/utils/analytics';

const CartCard = props => {
  const navigation = useNavigation();
  const shopClient = useSelector(state => state.ui.shopifyClient);

  const onNavigate = product => {
    navigation.navigate('ProductDetail', {
      product: product,
      client: shopClient,
      productUrl: product?.onlineStoreUrl,
    });
  };
  return (
    <TouchableOpacity
      style={styles.mainView}
      onPress={() => {
        onNavigate(props.item);
        analytics.trackEvent('product_cart_screen', {
          CTA: 'CartCard',
          ProductName: props.item,
        });
      }}>
      <Image source={{ uri: props.productImg }} style={styles.productImg} />
      <Text style={styles.productName} numberOfLines={2}>
        {props.productName}
      </Text>
      <View style={styles.priceView}>
        <Text style={styles.compareAtPrice}>Rs {props.compareAtPrice}</Text>
        <Text style={styles.productPrice}>Rs {props.productPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartCard;
