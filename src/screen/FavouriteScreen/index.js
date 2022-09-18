import { Text, Image, View, ToastAndroid, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '~/components/Header';
import noFavIcon from '../../../assets/images/no-fav-icon.png';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { Auth } from '~/firebase';
import { scaledValue } from '~/utils/design.utils';
import { useIsFocused } from '@react-navigation/native';
import { sortCategory } from '~/constants';
import { setLoading } from '~/store/UiSlice';
import { useDispatch, useSelector } from 'react-redux';
import deleteIcon from '../../../assets/images/delete-icon.png';
import { TouchableRipple } from 'react-native-paper';
import { analytics } from '~/utils/analytics';
import TrackCard from '~/components/TrackCard';
import saveIcon from '../../../assets/images/save-icon.png';

const FavouriteScreen = () => {
  const navigation = useNavigation();
  const loading = useSelector(state => state.ui.loading);
  const userIdentifier =
    Auth()?.currentUser?.phoneNumber?.replace('+', '_') ||
    Auth()?.currentUser?.email?.split('.').join('_');
  const [category, setCategory] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === '' || activeTab == null) {
      setActiveTab(category[0]);
    }
    let isActiveTab = [];
    isActiveTab = category?.filter(cat => cat === activeTab);
    if (isActiveTab?.length === 0) {
      setActiveTab(category[0]);
    }
  }, [category]);

  const fetchUserFavourite = async () => {
    if (userIdentifier) {
      let trackData = [];
      await database()
        .ref('/favourite/' + userIdentifier)
        .once('value')
        .then(resp =>
          resp?.forEach(element => {
            trackData?.push(element?.val());
          }),
        );
      filterCategory(trackData);
      setFavouriteData(trackData);
      dispatch(setLoading(false));
    }
  };
  const filterFavouriteData = () =>
    favouriteData?.filter(element => element?.type === activeTab);
  const filterCategory = items => {
    let cat = [];
    items?.forEach(elem => {
      cat?.push(elem?.type);
    });
    let uniqueCat = [...new Set(cat)];
    setCategory(sortCategory(uniqueCat)?.filter(elem => elem !== undefined));
  };

  const removeFavouriteHandler = item => {
    if (item && userIdentifier) {
      database()
        .ref('/favourite/' + userIdentifier + '/')
        .orderByChild('id')
        .equalTo(item?.id)
        .once('value', snapshot => {
          snapshot?.forEach(favourite => {
            favourite?.ref?.remove();
            fetchUserFavourite();
          });
        });
      ToastAndroid.show(
        'Removed from Saved Items',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      analytics.trackEvent('content_favourite_removed', {
        action_source: 'content_tile',
        category: item?.type,
        subcategory: item?.categories?.length ? item?.categories[0] : '',
        title: item?.title,
        artist: item?.artist,
        language: item?.language,
        id: item?.id,
      });
    }
  };

  useEffect(() => {
    fetchUserFavourite();
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <Header onPress={() => navigation.goBack()} headerTitle="Saved items" />
      {category && (
        <View style={styles.categoryContainer}>
          <FlatList
            data={category}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableRipple
                  style={styles.favFilterView}
                  rippleColor="#1F265E"
                  onPress={() => setActiveTab(item)}>
                  <Text
                    style={
                      activeTab === item
                        ? styles.categoryTextActive
                        : styles.categoryText
                    }>
                    {item}
                  </Text>
                </TouchableRipple>
              );
            }}
          />
        </View>
      )}
      {favouriteData.length !== 0 && (
        <FlatList
          data={filterFavouriteData()}
          renderItem={({ item, index }) => (
            <TrackCard
              data={item}
              index={index}
              key={item?.id}
              type={item?.type}
              deleteIcon={deleteIcon}
              tab="favourite section"
              deletePress={() => removeFavouriteHandler(item)}
              artwork={item?.artwork}
              title={item?.title}
              artist={item?.artist}
              duration={item?.duration}
              tag={item?.tag}
              keyExtractor={({ index }) => index}
              activeTab={activeTab}
            />
          )}
        />
      )}
      {!loading && category?.length === 0 && (
        <View style={{ paddingTop: scaledValue(86) }}>
          <Image source={noFavIcon} style={styles.favImage} />
          <Text style={styles.noFavText}>No Saved Items yet</Text>
          <Text style={styles.favSubText}>
            Keep track of your saved items by clicking{' '}
            <Image source={saveIcon} style={styles.saveIcon} /> icon.
          </Text>
        </View>
      )}
    </View>
  );
};

export default FavouriteScreen;
