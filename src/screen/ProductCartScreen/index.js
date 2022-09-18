import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import CartProductCard from '~/components/CartProductCard';
import Header from '~/components/Header';
import { scaledValue } from '~/utils/design.utils';
import { getItemFromAsyncStorage, setItemInAsyncStorage } from '~/storage';
import Button from '~/components/Button';
import { setCartCount, setLoading } from '~/store/UiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FONTS } from '~/constants';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import emptyCart from '../../../assets/images/emptyCart.png';
import FastImage from 'react-native-fast-image';
import { analytics } from '~/utils/analytics';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import { findOnlyNumeric } from '~/utils/common.utils';

const ProductCartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [storeProducts, setStoreProducts] = useState([]);
  const [checkOutArray, setCheckOutArray] = useState([]);
  const [totalCheckOut, setTotalCheckOut] = useState(0);
  const client = useSelector(state => state.ui.shopifyClient);
  const loading = useSelector(state => state.ui.loading);
  const checkoutArray = [];
  const productArray = [];
  const shippingAddress = {
    firstName: '',
    phone: '',
  };

  const loadProducts = async () => {
    await client.product
      .fetchAll()
      .then(products => {
        setStoreProducts(products);
        products?.map(async product => {
          setCheckOutArray([]);
          let productQuantity = await getItemFromAsyncStorage(product?.title);
          if (productQuantity === '') {
            dispatch(setLoading(false));
          }
          productQuantity = JSON.parse(productQuantity);
          if (productQuantity !== 0 && productQuantity !== '') {
            checkoutArray?.push({
              variantId: product?.variants[0]?.id,
              quantity: productQuantity,
            });
            productArray?.push(productQuantity * product?.variants[0]?.price);
          }
          setCheckOutArray(checkoutArray);
          dispatch(setLoading(false));
          setTotalCheckOut(
            productArray?.reduce((partialSum, a) => partialSum + a, 0),
          );
        });
      })
      .catch(() => dispatch(setLoading(false)));
  };
  const removeCart = () => {
    storeProducts?.map(async product => {
      let productQuantity = await getItemFromAsyncStorage(product?.title);
      if (productQuantity !== 0 && productQuantity !== '') {
        setItemInAsyncStorage(product?.title, 0);
        dispatch(setCartCount(0));
      }
    });
  };
  useEffect(() => {
    loadProducts();
  }, [client]);

  const handleCheckout = () => {
    dispatch(setLoading(true));
    client.checkout.create().then(checkout => {
      AppEventsLogger.logPurchase(totalCheckOut, checkout?.currencyCode);
      client.checkout
        .addLineItems(checkout?.id, checkOutArray)
        .catch(err => console.log('addLineItems.err', err));
      client.checkout
        .updateShippingAddress(checkout?.id, shippingAddress)
        .then(updatedAddress => {
          removeCart();
          navigation.navigate('CheckOut', {
            checkOutLink: updatedAddress?.webUrl,
          });
        });
    });
    analytics.trackEvent('product_cart', {
      CTA: 'checkout',
    });
  };

  const handleZecpeCheckout = () => {
    let checkOutItemsArray = checkOutArray
      .map(obj => findOnlyNumeric(obj.variantId) + ':' + obj.quantity)
      .join(',');
    navigation.navigate('CheckOut', {
      checkOutLink: `https://shop.neend.app/cart?products=${checkOutItemsArray}&initiated_by=zecpe`,
    });
    removeCart();
  };

  const footerComponent = () => (
    <>
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal: </Text>
        <Text style={styles.totalProductText}>Rs {totalCheckOut}.00</Text>
      </View>
      <Text style={styles.taxIncludedText}>
        (Tax included and shipping calculated at checkout )
      </Text>
      <Text style={styles.upiDiscountText}>*Extra 5% off on UPI</Text>
      <Button
        onPress={handleZecpeCheckout}
        title="Pay via UPI/cash on delivery"
        width={scaledValue(284)}
        marginHorizontal={scaledValue(37)}
        marginTop={scaledValue(10)}
        backgroundColor="#937DE2"
        borderColor="#937DE2"
        fontSize={scaledValue(14)}
        fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
      />
      <Button
        onPress={handleCheckout}
        title="Pay with card/wallet"
        width={scaledValue(284)}
        marginHorizontal={scaledValue(37)}
        marginTop={scaledValue(11)}
        backgroundColor="#937DE2"
        borderColor="#937DE2"
        fontSize={scaledValue(14)}
        fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
      />
      {/* <Text style={styles.likeText}>You may also like </Text>
      <View style={styles.cartCardView}>
        <FlatList
          horizontal
          data={storeProducts}
          renderItem={({ item, index }) => (
            <CartCard
              key={index}
              productImg={item?.images[0]?.src}
              productName={item?.title}
              productPrice={item?.variants[0]?.price}
              compareAtPrice={item?.variants[0]?.compareAtPrice}
              item={item}
            />
          )}
          keyExtractor={id => {
            2 * id?.toString();
          }}
        />
      </View> */}
    </>
  );

  return (
    <View style={styles.productCartView}>
      <Header
        headerTitle="My Cart"
        onPress={() => {
          navigation.goBack();
          analytics.trackEvent('product_cart', {
            CTA: 'back_from_cart',
          });
        }}
        marginLeft={scaledValue(26)}
      />
      {totalCheckOut !== 0 && (
        <View style={styles.productCartMainView}>
          <FlatList
            data={storeProducts}
            renderItem={({ item }) => (
              <CartProductCard
                productImage={item?.images[0]?.src}
                productName={item?.title}
                productPrice={item?.variants[0]?.price}
                refreshCart={() => loadProducts()}
              />
            )}
            ListFooterComponent={() => footerComponent()}
            keyExtractor={id => {
              id?.toString();
            }}
          />
        </View>
      )}

      {!loading && totalCheckOut === 0 && (
        <View style={styles.emptyCartView}>
          <FastImage
            style={styles.cartButton}
            source={emptyCart}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.emptyText}>Your cart is empty!</Text>
          <Text style={styles.addItemText}>
            Explore our range of products, which help you to sleep within 15
            mins without any side effects
          </Text>
          <Button
            width={scaledValue(284)}
            height={scaledValue(38)}
            onPress={() => {
              navigation.goBack();
              analytics.trackEvent('product_cart', {
                CTA: 'continue_shopping',
              });
            }}
            title="Continue Shopping"
            alignSelf="center"
            marginTop={scaledValue(74)}
            backgroundColor="rgba(147, 125, 226, 1)"
            borderColor="rgba(147, 125, 226, 1)"
            fontSize={scaledValue(14)}
            fontFamily={FONTS.OPEN_SANS_REGULAR}
          />
        </View>
      )}
    </View>
  );
};

export default ProductCartScreen;
