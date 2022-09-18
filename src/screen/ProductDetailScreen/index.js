import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ToastAndroid,
  ScrollView,
  Image,
  FlatList,
  Share,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '~/components/Button';
import CounterButton from '~/components/CounterButton';
import Header from '~/components/Header';
import { scaledValue } from '~/utils/design.utils';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getItemFromAsyncStorage, setItemInAsyncStorage } from '~/storage';
import { setCartCount, setLoading } from '~/store/UiSlice';
import whatsapp from '../../../assets/images/Whatsapp.png';
import dot from '../../../assets/images/dot.png';
import { styles } from './styles';
import productDetailData from '../../constants/productDetail';
import CategoryTab from '../../components/ProductCategoryTab';
import { Divider } from 'react-native-paper';
import ProductDetailsCard from '~/components/ProductDetailsCard';
import { FONTS } from '~/constants';
import { analytics } from '~/utils/analytics';
import { AppEventsLogger } from 'react-native-fbsdk-next';

const ProductDetail = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [product] = useState(props?.route?.params?.product);
  const [cartValue, setCartValue] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [client] = useState(props.route.params.client);
  const user = useSelector(state => state.userInfo);
  const cartCount = useSelector(state => state.ui.cartCount);
  const [itemCategory, setItemCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Benefits');

  const shippingAddress = {
    firstName: user.username || '',
    phone: user.phoneNumber || '',
  };
  const loadCounterValue = async () => {
    let value = await getItemFromAsyncStorage(product.title);
    value = JSON.parse(value);
    setCartValue(value);
  };

  useEffect(() => {
    loadCounterValue();
    setItemCategory([...new Set(productDetailData.map(item => item.category))]);
  }, [isFocused]);

  const categoryTabHandler = () => {
    return productDetailData.filter(desc => desc.category === selectedCategory);
  };

  const buyItNowHandler = () => {
    dispatch(setLoading(true));
    client.checkout.create().then(checkout => {
      const lineItemsToAdd = [
        {
          variantId: product?.variants[0].id,
          quantity: quantity,
        },
      ];
      client.checkout
        .addLineItems(checkout.id, lineItemsToAdd)
        .then(() => {
          dispatch(setQuantity(1));
          dispatch(setLoading(false));
          AppEventsLogger.logPurchase(
            product?.variants[0]?.price * quantity,
            checkout.currencyCode,
          );
        })
        .catch(err => console.log('addLineItems.err', err));
      client.checkout
        .updateShippingAddress(checkout.id, shippingAddress)
        .then(updatedAddress => {
          navigation.navigate('CheckOut', {
            checkOutLink: updatedAddress.webUrl,
          });
        });
    });
    analytics.trackEvent('product_detail', {
      CTA: 'buy_now',
      ProductName: product?.title,
      productQuantity: quantity,
    });
  };

  const addToCartHandler = () => {
    setCartValue(cartValue + quantity);
    setItemInAsyncStorage(product.title, cartValue + quantity);
    dispatch(setCartCount(cartCount + quantity));
    ToastAndroid.show('Item added in cart', ToastAndroid.SHORT);
    analytics.trackEvent('product_detail', {
      CTA: 'add_to_cart',
      ProductName: product.title,
      productQuantity: quantity,
    });
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: props.route.params.productUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
          analytics.trackEvent('product_detail', {
            CTA: 'share_product',
            ProductName: product.title,
          });
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log('error message: ', error);
    }
  };
  return (
    <ScrollView style={styles.productDetailView}>
      <Header
        onPress={() => {
          navigation.goBack();
          analytics.trackEvent('product_detail', {
            CTA: 'back_to_shop',
            ProductName: product.title,
          });
        }}
        badgeCount={cartCount}
        icon="cart-outline"
      />
      <View style={styles.productDetailMainView}>
        <FlatList
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={product.images}
          renderItem={item => (
            <FastImage
              style={styles.productImage}
              source={{ uri: item.item.src }}
            />
          )}
        />
        <FlatList
          data={product.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <FastImage tintColor="#8F93A4" style={styles.dot} source={dot} />
          )}
        />
        <Text style={styles.titleText}>{product.title}</Text>
        <View style={styles.mrpView}>
          <Text style={styles.priceText}>
            Rs. {product?.variants[0]?.compareAtPrice}
          </Text>
          <Text style={styles.minimumPriceText}>
            Rs. {product?.variants[0]?.price}
          </Text>
        </View>
        <Text style={styles.quantityText}>Quantity:</Text>
        <View style={styles.counterView}>
          <CounterButton
            touchableDisable={quantity === 1}
            quantity={quantity}
            increaseQuantity={() => setQuantity(quantity + 1)}
            decreaseQuantity={() => setQuantity(quantity - 1)}
            width={scaledValue(123)}
            height={scaledValue(38)}
          />
        </View>
        <Button
          marginTop={scaledValue(12)}
          title="+ Add to Cart"
          width={scaledValue(297)}
          borderColor="#937DE2"
          onPress={addToCartHandler}
          backgroundColor="#937DE2"
          fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
        />
        <Button
          borderWidth={scaledValue(1)}
          marginTop={scaledValue(12)}
          title="Buy Now"
          width={scaledValue(297)}
          borderColor="#937DE2"
          onPress={buyItNowHandler}
          fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
        />
      </View>
      <View style={styles.shareOnView}>
        <View style={styles.shareIcons}>
          <Text style={styles.shareText}>Share On:</Text>
          <View style={styles.allIcon}>
            <TouchableOpacity onPress={onShare}>
              <Image style={styles.socialMediaIcon} source={whatsapp} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.descriptionText}>
          Everyone deserves a good night's sleep. Try Neend gummies and get the
          sleep you need, drug-free. Neend gummies deliver a unique blend of
          ingredients that work together to calm your mind and promote restful
          sleep so you wake up feeling refreshed.
        </Text>
        <View style={styles.productCatContainer}>
          <FlatList
            data={itemCategory}
            horizontal={true}
            renderItem={({ item }) => (
              <CategoryTab
                tabName={item}
                selectedCategory={selectedCategory}
                onPress={() => setSelectedCategory(item)}
                backgroundColor={
                  selectedCategory === item ? '#937DE2' : '#0B173C'
                }
              />
            )}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.productDetailsCardView}>
          {categoryTabHandler().map(item => (
            <ProductDetailsCard
              cardTitle={item?.title}
              cardDescription={item?.description}
              cardIcon={item?.img}
              isDescription={item?.isDescription}
              category={item?.category}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
