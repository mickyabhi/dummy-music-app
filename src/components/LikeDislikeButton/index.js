import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LikeDislikeButton = props => {
  return (
    <View style={style.View}>
      <TouchableOpacity
        onPress={
          props.title === 'like'
            ? () => props.onButtonPress('like')
            : () => props.onButtonPress('dislike')
        }>
        <View
          style={{
            backgroundColor: '#03174C',
            borderColor:
              props.title === props.active
                ? props.title === 'dislike'
                  ? '#FD4F4F'
                  : '#00D699'
                : '#ADB7E4',
            borderWidth: 2,
            borderRadius: 65,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {props.title === 'like' ? (
            <AntDesign
              name="like1"
              size={40}
              color={props.title === props.active ? '#00D699' : '#ADB7E4'}
            />
          ) : (
            <AntDesign
              name="dislike1"
              size={40}
              color={props.title === props.active ? '#FD4F4F' : '#ADB7E4'}
              style={{transform: [{rotateY: '180deg'}]}}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default memo(LikeDislikeButton);
const style = StyleSheet.create({
  View: {
    width: 90,
    height: 90,
    padding: 10,
  },
});
