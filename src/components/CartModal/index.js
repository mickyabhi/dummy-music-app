import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import { FONTS } from '~/constants';
import { scaledValue } from '~/utils/design.utils';
import cancelIcon from '../../../assets/images/playerBarCross.png';
import Button from '../Button';
import { styles } from './styles';
const CartModal = props => {
  return (
    <Modal
      animationType="slide"
      backdropOpacity={0.72}
      backdropColor={'#0B173C'}
      hasBackdrop={true}
      isVisible={props.visible}
      onBackdropPress={props.hideModal}
      style={styles.containerStyle}>
      <View style={styles.cancelIconView}>
        <Text style={styles.titleText}>1 item added to your cart</Text>
        <TouchableOpacity onPress={() => props.hideModal()}>
          <FastImage
            source={cancelIcon}
            style={styles.cancelIcon}
            tintColor="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.itemCardView}>
        <Image
          style={styles.productImage}
          source={{ uri: props.productImage }}
        />
        <Text style={styles.productName}>{props.productName}</Text>
      </View>
      <Text style={styles.upiDiscountText}>*Extra 5% off on UPI</Text>

      <Button
        onPress={props.zecpeCheckOutHandler}
        title="Pay via UPI/cash on delivery"
        width={scaledValue(272)}
        marginTop={0}
        fontSize={scaledValue(14)}
        backgroundColor="#937DE2"
        borderColor="#937DE2"
        fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
      />
      <Button
        onPress={props.checkOutHandler}
        title="Pay with card/wallet"
        width={scaledValue(272)}
        marginTop={6}
        fontSize={scaledValue(14)}
        backgroundColor="#937DE2"
        borderColor="#937DE2"
        fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
      />
      <Button
        onPress={props.viewMyCartHandler}
        title={`View my cart (${props.cartValue})`}
        width={scaledValue(272)}
        marginTop={14}
        borderColor="#937DE2"
        borderWidth={scaledValue(1)}
        fontSize={scaledValue(14)}
        fontFamily={FONTS.OPEN_SANS_SEMIBOLD}
        marginBottom={scaledValue(15)}
      />
      {/* <TouchableOpacity onPress={() => props.hideModal()}>
        <Text style={styles.continueShoppingText}>Continue shopping</Text>
      </TouchableOpacity> */}
    </Modal>
  );
};

export default CartModal;
