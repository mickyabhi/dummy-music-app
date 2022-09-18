import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './styles';

const ProductDetailsCard = props => {
  return (
    <View style={styles.productDetailsCardView}>
      <View>
        {props.cardIcon && (
          <Image
            style={
              props.category === 'Ingredients'
                ? styles.ingredientIcon
                : styles.cardIcon
            }
            source={props.cardIcon}
          />
        )}
      </View>
      <View
        style={
          props.cardIcon
            ? styles.productDetailsCardRightView
            : styles.InActiveProductDetailsCardRightView
        }>
        {props.cardTitle && (
          <Text style={styles.cardTitle}>{props.cardTitle}</Text>
        )}
        <Text
          style={
            props.category === 'Dosage'
              ? styles.dosageDescription
              : styles.cardDescription
          }>
          {props.cardDescription}
        </Text>
      </View>
    </View>
  );
};

export default ProductDetailsCard;
