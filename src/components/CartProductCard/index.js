import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import deleteIcon from '../../../assets/images/deleteIcon.png';
import { getItemFromAsyncStorage, setItemInAsyncStorage } from '~/storage';
import { scaledValue } from '~/utils/design.utils';
import CounterButton from '../CounterButton';
import { Divider, IconButton } from 'react-native-paper';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { setCartCount } from '~/store/UiSlice';
import { analytics } from '~/utils/analytics';

const CartProductCard = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [counterValue, setCounterValue] = useState(0);
  const totalProductValue = eval(counterValue * props?.productPrice);

  const loadCounterValue = async () => {
    let value = await getItemFromAsyncStorage(props.productName);
    value = JSON.parse(value);
    setCounterValue(value);
  };
  useEffect(() => {
    loadCounterValue();
  }, [isFocused]);

  const increaseQuantityHandler = () => {
    setItemInAsyncStorage(props.productName, counterValue + 1);
    setCounterValue(counterValue + 1);
    props.refreshCart();
    analytics.trackEvent('product_cart', {
      CTA: 'Product qty change',
    });
  };

  const decreaseQuantityHandler = () => {
    if (counterValue === 1) {
      dispatch(setCartCount(0));
    }
    setItemInAsyncStorage(props.productName, counterValue - 1);
    setCounterValue(counterValue - 1);
    props.refreshCart();
    analytics.trackEvent('product_cart', {
      CTA: 'Product qty change',
    });
  };

  return (
    <>
      {counterValue > 0 && (
        <View style={styles.card}>
          <View style={styles.cartProductCard}>
            <Image
              style={styles.productImage}
              source={{ uri: props.productImage }}
            />
            <View style={styles.productDetail}>
              <Text style={styles.productName}>{props.productName}</Text>
              <View style={styles.productRate}>
                <Text style={styles.rateText}>
                  Rs {props.productPrice || '0.0'}
                </Text>
                <IconButton
                  icon={deleteIcon}
                  color="#937DE2"
                  size={scaledValue(12)}
                  onPress={() => {
                    setItemInAsyncStorage(props.productName, 0);
                    loadCounterValue();
                    props.refreshCart();
                    dispatch(setCartCount(0));
                    analytics.trackEvent('product_cart', {
                      CTA: 'Delete button',
                      ProductName: props.productName,
                    });
                  }}
                />
              </View>
              <View style={styles.cardButton}>
                <CounterButton
                  touchableDisable={false}
                  quantity={counterValue}
                  width={scaledValue(98)}
                  height={scaledValue(32)}
                  increaseQuantity={increaseQuantityHandler}
                  decreaseQuantity={decreaseQuantityHandler}
                />
                <Text style={styles.productPrice}>
                  Rs {totalProductValue?.toFixed(2) || '0.0'}
                </Text>
              </View>
            </View>
          </View>
          <Divider style={styles.productDivider} />
        </View>
      )}
    </>
  );
};

export default CartProductCard;
