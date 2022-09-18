import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import ProductCard from '~/components/ProductCard';
import CartModal from '~/components/CartModal';
import { setCartCount, setLoading, setPrevCategory } from '~/store/UiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromAsyncStorage, setItemInAsyncStorage } from '~/storage';
import { styles } from './styles';
import ProductBanner from '~/components/ProductBanner';
import { analytics } from '~/utils/analytics';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import FastImage from 'react-native-fast-image';
import dot from '../../../assets/images/dot.png';
import pause from '../../../assets/images/pause.png';
import drawerIcon from '../../../assets/images/drawerIcon.png';
import play from '../../../assets/images/play.png';
import emptyCart from '../../../assets/images/empty_cart.png';
import { getBannerData } from '~/store/ProductBannerSlice';
import { ScreenHeader } from '~/components/ScreenHeader';
import { findOnlyNumeric } from '~/utils/common.utils';

const ProductListing = () => {
  const isFocused = useIsFocused();
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [storeProducts, setStoreProducts] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartModalProduct, setCartModalProduct] = useState(null);
  const [cartValue, setCartValue] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [timeOutId, setTimeOutId] = useState(null);
  const [videoPlayPause, setVideoPlayPause] = useState(true);
  const user = useSelector(state => state.userInfo);
  const shopClient = useSelector(state => state.ui.shopifyClient);
  const cartCount = useSelector(state => state.ui.cartCount);
  const client = useSelector(state => state.ui.shopifyClient);
  const prevCat = useSelector(state => state.ui.prevCategory);
  const productBannerData = useSelector(state => state?.bannerData?.bannerData);
  const shippingAddress = {
    firstName: user.username,
    phone: user.phoneNumber || '',
  };
  const cartValueArray = [];
  const getStoreProducts = () => {
    client.product.fetchAll().then(products => {
      setStoreProducts(products);
      products.forEach(async product => {
        let count = 0;
        let productCount = await getItemFromAsyncStorage(product.title);
        productCount = JSON.parse(productCount);

        if (
          productCount !== null &&
          productCount !== 0 &&
          productCount !== ''
        ) {
          cartValueArray.push(productCount);
          count += cartValueArray.reduce((a, b) => a + b, 0);
          dispatch(setCartCount(count));
        }
      });
    });
  };

  useEffect(() => {
    if (!videoPlayPause) {
      clearTimeout(timeOutId);
    }
  }, [videoPlayPause, timeOutId]);

  useEffect(() => {
    clearTimeout(timeOutId);
    if (productBannerData?.length === 0 || productBannerData?.length === 1) {
      return;
    }
    if (productBannerData?.length) {
      const id = setTimeout(() => {
        scrollRef?.current?.scrollToIndex({
          animated: true,
          index:
            productBannerData?.length === bannerIndex + 1 ? 0 : bannerIndex + 1,
        });
      }, 5000);
      setTimeOutId(id);
    }
  }, [bannerIndex, productBannerData?.length]);

  const onViewRef = useRef(viewableItems => {
    setBannerIndex(viewableItems?.viewableItems[0]?.index);
    setVideoPlayPause(true);
  });

  useEffect(() => {
    if (isFocused && prevCat !== 'shop') {
      analytics.trackEvent('tab_view', {
        current_tab: 'shop',
        prev_tab: prevCat,
      });
      dispatch(setPrevCategory('shop'));
    }
    getStoreProducts();
    setVideoPlayPause(true);
  }, [isFocused]);

  useEffect(() => {
    dispatch(getBannerData());
  }, []);

  const handleCardPress = product => {
    findOnlyNumeric(product?.variants[0]?.id);

    navigation.navigate('ProductDetail', {
      product: product,
      client: shopClient,
      productUrl: product?.onlineStoreUrl,
    });

    analytics.trackEvent('shop_screen', {
      CTA: 'open_product',
      ProductName: product?.title,
    });
  };

  const modalCheckOutHandler = async () => {
    setShowCartModal(false);
    dispatch(setLoading(true));
    let quantityValue = await getItemFromAsyncStorage(
      cartModalProduct?.productName,
    );
    quantityValue = JSON.parse(quantityValue);
    dispatch(setCartCount(cartCount - quantityValue));
    shopClient.checkout
      .create()
      .then(checkout => {
        const lineItemsToAdd = [
          {
            variantId: cartModalProduct.id,
            quantity: quantityValue,
          },
        ];
        AppEventsLogger.logPurchase(cartValue, checkout.currencyCode);
        shopClient.checkout
          .addLineItems(checkout.id, lineItemsToAdd)
          .catch(err => console.log('addLineItems.err', err));
        shopClient.checkout
          .updateShippingAddress(checkout.id, shippingAddress)
          .then(updatedAddress => {
            setItemInAsyncStorage(cartModalProduct.productName, 0);
            navigation.navigate('CheckOut', {
              checkOutLink: updatedAddress.webUrl,
            });
          });
      })
      .catch(err => console.log('create.err', err));
    analytics.trackEvent('shop_screen', {
      CTA: 'checkout',
      Source: 'modal',
      ProductName: cartModalProduct?.productName,
    });
    AppEventsLogger.logEvent('initiate_checkout', {
      CTA: 'Initiate Checkout',
      ProductName: cartModalProduct?.productName,
    });
  };

  const zecpeCheckOutHandler = async () => {
    setShowCartModal(false);
    let quantityValue = await getItemFromAsyncStorage(
      cartModalProduct?.productName,
    );
    quantityValue = JSON.parse(quantityValue);
    dispatch(setCartCount(cartCount - quantityValue));
    let id = findOnlyNumeric(cartModalProduct.id);
    navigation.navigate('CheckOut', {
      checkOutLink: `https://shop.neend.app/cart?products=${id}:${quantityValue}&initiated_by=zecpe`,
    });
    setItemInAsyncStorage(cartModalProduct.productName, 0);
  };

  return (
    <>
      <ScreenHeader
        headerTitle="Shop"
        drawerIcon={drawerIcon}
        emptyCart={emptyCart}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.productListingPageView}>
        <FlatList
          data={productBannerData}
          horizontal
          ref={scrollRef}
          renderItem={({ item, index }) => (
            <ProductBanner
              img={item.imgUrl}
              isPause={videoPlayPause ? true : bannerIndex !== index}
              type={item.type}
              url={item.mediaUrl}
              playPauseControlIcon={videoPlayPause ? pause : play}
              toggle={() => setVideoPlayPause(!videoPlayPause)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          keyExtractor={(_, index) => index.toString()}
        />
        <View style={styles.dotView}>
          <FlatList
            data={productBannerData}
            horizontal
            renderItem={({ index }) => (
              <FastImage
                tintColor={bannerIndex === index ? '#fff' : '#8F93A4'}
                style={styles.dot}
                source={dot}
              />
            )}
          />
        </View>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={storeProducts.sort((a, b) => b.title.localeCompare(a.title))}
          renderItem={({ item }) => (
            <ProductCard
              onPress={() => handleCardPress(item)}
              id={item.variants[0].id}
              productPrice={item.variants[0].compareAtPrice}
              productSellingPrice={item.variants[0].price}
              productName={item.title}
              productImage={item.images[0].src}
              setShowCartModal={setShowCartModal}
              setCartModalProduct={setCartModalProduct}
              setCartValue={setCartValue}
            />
          )}
        />
        {cartModalProduct && (
          <CartModal
            visible={showCartModal}
            hideModal={() => setShowCartModal(false)}
            productImage={cartModalProduct?.productImage}
            productName={cartModalProduct?.productName}
            cartValue={cartValue}
            viewMyCartHandler={() => {
              navigation.navigate('ProductCart');
              setShowCartModal(false);
              analytics.trackEvent('shop_screen', {
                CTA: 'view_my_cart',
                Source: 'modal',
                ProductName: cartModalProduct?.productName,
              });
              dispatch(setLoading(true));
            }}
            checkOutHandler={modalCheckOutHandler}
            zecpeCheckOutHandler={zecpeCheckOutHandler}
          />
        )}
      </ScrollView>
    </>
  );
};

export default ProductListing;
