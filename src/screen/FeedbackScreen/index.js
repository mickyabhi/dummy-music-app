import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import database from '@react-native-firebase/database';
import LikeDislikeButton from '~/components/LikeDislikeButton';
import Modal from '~/components/Modal';
import { Auth } from '~/firebase';
import { style } from './style';
import { analytics } from '~/utils/analytics';
import { getDeviceId } from '~/storage';
import { useSelector } from 'react-redux';

const FeedbackScreen = props => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [dataBaseRef, setFeedbackDataBaseRef] = useState(null);
  const [userName, setUserName] = useState(null);
  const currentTrack = useSelector(state => state.ui.currentTrack);
  const [track] = useState(props.route.params.lastTrack || currentTrack);
  const mediaType = props.route?.params?.mediaType;
  const currentLanguage = useSelector(state => state.ui.currentLanguage);
  const availableLanguages = useSelector(state => state.ui.availableLanguages);

  const initialize = async currentTrack => {
    let deviceId,
      username = await getDeviceId();

    if (Auth().currentUser) {
      deviceId =
        Auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
        Auth()?.currentUser?.email?.split('.')?.join('_');
      username = Auth()?.currentUser?.displayName;
    }

    const feedbackDataBaseRef = database()?.ref(
      'feedbacks' +
        '/' +
        currentTrack?.type +
        '/' +
        currentLanguage +
        '/' +
        currentTrack?.id +
        '/' +
        deviceId,
    );
    return {
      deviceId,
      username,
      feedbackDataBaseRef,
    };
  };

  const createFeedBackPath = async () => {
    const { username, deviceId, feedbackDataBaseRef } = await initialize(track);
    setUserName(username);
    setFeedbackDataBaseRef(feedbackDataBaseRef);
    setPhoneNumber(deviceId);
  };

  useEffect(() => {
    createFeedBackPath();
  }, []);

  const submitFeedback = ({ type }) => {
    setShowModal(true);
    dataBaseRef?.push(
      {
        type: track?.type,
        id: track?.id,
        title: track?.title,
        rating: type,
        phoneNumber,
        userName,
      },
      () => {
        setShowModal(false);
        navigation.goBack();
      },
    );
  };
  return (
    <View style={style.feedbackScreenView}>
      <StatusBar backgroundColor="#03174C" />
      <View style={style.feedBackScreenMainView}>
        {track?.type === 'meditation' ? (
          <>
            <Text style={style.textLabel}>
              Did&nbsp;
              <Text style={style.storiesNameText}>{track?.title}&nbsp;</Text>
              {mediaType} help you to feel relax?
            </Text>
          </>
        ) : (
          <>
            <Text style={style.textLabel}>
              Did&nbsp;
              <Text style={style.storiesNameText}>{track?.title}&nbsp;</Text>
              {mediaType} help you sleep?
            </Text>
          </>
        )}
        <View style={style.likeDislikeButtonsView}>
          <LikeDislikeButton
            title="dislike"
            onButtonPress={() => {
              submitFeedback({ type: 'dislike' });
              analytics.trackEvent('content_feedback', {
                action_source: 'feedback',
                feedback_value: 'dislike',
                category: mediaType,
                subcategory: track?.categories?.length
                  ? track?.categories[0]
                  : '',
                title: track?.title,
                artist: track?.artist,
                language: availableLanguages[currentLanguage],
                id: track?.id,
              });
            }}
          />
          <LikeDislikeButton
            title="like"
            onButtonPress={() => {
              submitFeedback({ type: 'like' });
              analytics.trackEvent('content_feedback', {
                action_source: 'feedback',
                feedback_value: 'like',
                category: mediaType,
                subcategory: track?.categories?.length
                  ? track?.categories[0]
                  : '',
                title: track?.title,
                artist: track?.artist,
                language: availableLanguages[currentLanguage],
                id: track?.id,
              });
            }}
          />
        </View>
      </View>

      {showModal && <Modal {...props} />}
    </View>
  );
};
export default FeedbackScreen;
