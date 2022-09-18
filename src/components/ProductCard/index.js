import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromAsyncStorage, setItemInAsyncStorage } from '~/storage';
import { setCartCount } from '~/store/UiSlice';
import { analytics } from '~/utils/analytics';
import { scaledValue } from '~/utils/design.utils';
import Button from '../Button';
import { styles } from './styles';

const ProductCard = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [counterValue, setCounterValue] = useState(0);
  const cartCount = useSelector(state => state.ui.cartCount);

  const loadCounterValue = async () => {
    let value = await getItemFromAsyncStorage(props?.productName);
    value = JSON.parse(value);
    setCounterValue(value);
  };
  useEffect(() => {
    loadCounterValue();
  }, [isFocused]);

  const addToCartHandler = () => {
    props.setCartModalProduct(props);
    props.setShowCartModal(true);
    setCounterValue(counterValue + 1);
    setItemInAsyncStorage(props?.productName, counterValue + 1);
    props.setCartValue(counterValue + 1);
    dispatch(setCartCount(cartCount + 1));
    ToastAndroid.show('Item added in cart', ToastAndroid.SHORT);
    analytics.trackEvent('shop_screen', {
      CTA: 'AddToCart',
      ProductName: props.productName,
    });
  };

  return (
    <TouchableRipple onPress={props.onPress} style={styles.mainContainer}>
      <View style={styles.productCard}>
        <FastImage
          style={styles.productImage}
          source={{ uri: props?.productImage }}
        />
        <View style={styles.productDetailView}>
          <Text style={styles.titleText}>{props?.productName}</Text>
          <View style={styles.mrpView}>
            <View style={styles.mrpLeftSideView}>
              <Text style={styles.priceText}>Rs. {props?.productPrice}</Text>
              <Text style={styles.minimumPriceText}>
                Rs. {props?.productSellingPrice}
              </Text>
            </View>
            <View style={styles.counterButtonView}>
              <Button
                onPress={addToCartHandler}
                marginTop={0}
                fontSize={scaledValue(14)}
                height={scaledValue(38)}
                width={scaledValue(134)}
                backgroundColor="#937DE2"
                title="+ Add to cart"
                borderColor="#937DE2"
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default ProductCard;
