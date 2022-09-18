import React, { useEffect, useRef } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { scaledValue } from '~/utils/design.utils';
import cloud_1 from '~assets/images/cloud_1.png';
import cloud_2 from '~assets/images/cloud_2.png';
import FastImage from 'react-native-fast-image';
import { FONTS } from '~/constants';
import { setPrevCategory, setPrevSubCategory } from '~/store/UiSlice';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { analytics } from '~/utils/analytics';
import { fetchMeditationData } from '~/store/MeditationSlice';
import SkeletonUi from './Components/MeditationSkeleton';
import CategoryTab from '~/components/CategoryTab';
import TrackCard from '~/components/TrackCard';
import { ScreenHeader } from '~/components/ScreenHeader';
import musicIcon from '../../../assets/images/music-lang.png';
import SeriesCard from '~/components/SeriesCard';

const MeditationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoryScrollRef = useRef();
  const meditationScrollRef = useRef();
  const isFocused = useIsFocused();
  const prevSubCat = useSelector(state => state.ui.prevSubCategory);
  const meditationData = useSelector(state => state.meditation.meditation);
  const meditationCategories = useSelector(
    state => state.meditation.categories,
  );
  const seriesData = useSelector(state => state.meditation.series);
  const status = useSelector(state => state.meditation.status);
  const languagePreference = useSelector(state => state.ui.currentLanguage);
  const availableLanguages = useSelector(state => state.ui.availableLanguages);
  const prevCat = useSelector(state => state.ui.prevCategory);
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    if (meditationCategories?.length > 0) {
      setCurrentTab(meditationCategories[0]?.category);
    }
  }, [meditationCategories]);

  const filterData = () => {
    if (currentTab !== 'All') {
      return meditationData?.filter(element =>
        element?.categories?.includes(currentTab),
      );
    } else {
      return meditationData?.filter(item => !item?.isAllNegative);
    }
  };

  const filteredSeries = () => {
    if (currentTab !== 'All') {
      return seriesData?.filter(item => item?.categories?.includes(currentTab));
    } else {
      return seriesData;
    }
  };

  useEffect(() => {
    dispatch(fetchMeditationData(languagePreference));
  }, [languagePreference]);

  useEffect(() => {
    if (isFocused && prevCat !== 'meditation') {
      analytics.trackEvent('tab_view', {
        current_tab: 'meditation',
        prev_tab: prevCat,
      });
      dispatch(setPrevCategory('meditation'));
    }
  }, [isFocused]);

  const subCategoryHandler = (item, index) => {
    setCurrentTab(item);
    analytics.trackEvent('sub_category_tab_view', {
      current_tab: 'meditation',
      current_subcategory: item,
      prev_subcategory: prevSubCat,
    });
    dispatch(setPrevSubCategory(item));
    categoryScrollRef.current.scrollToIndex({ animated: true, index });
    meditationScrollRef.current.scrollToOffset({ animated: false, offset: 0 });
  };

  return (
    <>
      <ScreenHeader musicButton={musicIcon} />
      {currentTab === '' && <SkeletonUi />}
      <View>
        {meditationCategories?.length !== 0 && (
          <FlatList
            ref={categoryScrollRef}
            data={meditationCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <CategoryTab
                onPress={() => subCategoryHandler(item?.category, index)}
                category={item?.category}
                activeTab={currentTab}
              />
            )}
          />
        )}
      </View>
      {meditationData.length !== 0 && (
        <>
          <FlatList
            ref={meditationScrollRef}
            data={filterData()}
            ListHeaderComponent={
              <>
                {/* {filteredSeries()?.length > 0 && (
                  <HeadingTitle
                    title="Meditation Course"
                    more="MORE"
                    onPress={() => {
                      navigation.navigate('SeriesCollection', {
                        series: seriesData,
                        title: 'Meditation Course',
                        currentTab: currentTab,
                      });
                    }}
                  />
                )} */}
                <View style={styles.seriesView}>
                  <FlatList
                    data={filteredSeries()}
                    horizontal
                    renderItem={({ item }) => (
                      <SeriesCard
                        seriesTitle={item?.seriesTitle}
                        seriesCount={item?.seriesCount}
                        artwork={item?.seriesArtwork}
                        marginRight={scaledValue(19)}
                        onPress={() => {
                          navigation.navigate('SeriesPart', item);
                        }}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
                {/* <HeadingTitle title="Meditations" /> */}
              </>
            }
            renderItem={({ item, index }) => (
              <TrackCard
                data={item}
                index={index}
                artwork={item?.artwork}
                title={item?.title}
                artist={item?.artist}
                duration={item?.duration}
                tag={item?.tag}
                type="meditation"
                keyExtractor={({ index }) => index}
                activeTab={currentTab}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
      {status === 'failed' && (
        <View style={styles.comingSoonView}>
          <Text style={styles.comingSoonText}>Coming Soon...</Text>
          <Text style={styles.titleText}>Guided Meditations by experts</Text>
          <Text style={styles.textLang}>
            in {availableLanguages[languagePreference]}
          </Text>
          <FastImage
            style={[styles.cloud, styles.cloud_1]}
            source={cloud_1}
            resizeMode={FastImage.resizeMode.contain}
          />
          <FastImage
            style={[styles.cloud, styles.cloud_2]}
            source={cloud_2}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  seriesView: {
    marginLeft: scaledValue(24),
  },
  cloud: {
    resizeMode: 'contain',
    width: scaledValue(500),
    height: scaledValue(50),
  },
  cloud_1: {
    top: scaledValue(70),
    left: scaledValue(70),
  },
  cloud_2: {
    top: scaledValue(70),
    right: scaledValue(70),
  },
  comingSoonView: {
    alignItems: 'center',
    marginTop: scaledValue(150),
    zIndex: 6,
  },
  titleText: {
    fontSize: scaledValue(14),
    color: '#FFFF',
    letterSpacing: scaledValue(0.8),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
    marginVertical: scaledValue(6),
  },
  comingSoonText: {
    color: 'rgb(147, 125, 226)',
    fontSize: scaledValue(20),
    fontFamily: FONTS.OPEN_SANS_REGULAR,
    marginBottom: scaledValue(12),
  },
  textLang: {
    color: '#F8E71C',
    fontSize: scaledValue(14),
    letterSpacing: scaledValue(0.8),
    fontFamily: FONTS.OPEN_SANS_SEMIBOLD,
  },
});
export default MeditationScreen;
