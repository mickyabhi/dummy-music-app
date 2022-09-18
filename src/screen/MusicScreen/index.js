import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedMusicsData } from '~/store/MusicsSlice';
import { scaledValue } from '../../utils/design.utils';
import MusicCard from './Components/MusicCard';
import {
  setIsMusic,
  setPrevCategory,
  setPrevSubCategory,
} from '~/store/UiSlice';
import { analytics } from '~/utils/analytics';
import SkeletonUi from './Components/MusicSkeleton';
import CategoryTab from '~/components/CategoryTab';
import { ScreenHeader } from '~/components/ScreenHeader';
import SeriesCard from '~/components/SeriesCard';

const MusicScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const scrollRef = useRef();
  const categoryScrollRef = useRef();
  const dispatch = useDispatch();
  const musicsData = useSelector(fetchedMusicsData);
  const musicCategories = useSelector(state => state.musics.categories);
  const series = useSelector(state => state.musics.series);
  const status = useSelector(state => state.musics.load);
  const isMusic = useSelector(state => state.ui.isMusic);
  const prevCat = useSelector(state => state.ui.prevCategory);
  const prevSubCat = useSelector(state => state.ui.prevSubCategory);
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    if (musicCategories?.length > 0) {
      setCurrentTab(musicCategories[0]?.category);
    }
  }, [musicCategories]);

  const filterData = () => {
    if (currentTab === 'All') {
      return musicsData?.filter(item => !item?.isAllNegative);
    } else {
      return musicsData?.filter(element =>
        element?.categories?.includes(currentTab),
      );
    }
  };

  const filteredSeries = () => {
    if (currentTab !== 'All') {
      return series?.filter(item => item?.categories?.includes(currentTab));
    } else {
      return series;
    }
  };

  useEffect(() => {
    if (isFocused && prevCat !== 'music') {
      analytics.trackEvent('tab_view', {
        current_tab: 'music',
        prev_tab: prevCat,
      });
      dispatch(setPrevCategory('music'));
    }
    if (isMusic) {
      dispatch(setIsMusic(false));
    } else {
      dispatch(setIsMusic(true));
    }
  }, [isFocused]);

  const subCategoryHandler = (item, index) => {
    setCurrentTab(item);
    analytics.trackEvent('sub_category_tab_view', {
      current_tab: 'music',
      current_subcategory: item,
      prev_subcategory: prevSubCat,
    });
    dispatch(setPrevSubCategory(item));
    scrollRef.current.scrollToOffset({ animated: false, offset: 0 });
    categoryScrollRef.current.scrollToIndex({ animated: true, index });
  };
  return (
    <>
      <ScreenHeader />
      {currentTab === '' && <SkeletonUi />}
      <View>
        {!status && (
          <FlatList
            ref={categoryScrollRef}
            data={musicCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <CategoryTab
                category={item?.category}
                activeTab={currentTab}
                onPress={() => subCategoryHandler(item?.category, index)}
              />
            )}
          />
        )}
      </View>
      <FlatList
        ref={scrollRef}
        data={filterData()}
        ListHeaderComponent={
          <>
            {/* {filteredSeries()?.length > 0 && (
              <HeadingTitle
                title="Playlist"
                marginHorizontal={scaledValue(14)}
                more="MORE"
                onPress={() => {
                  navigation.navigate('SeriesCollection', {
                    series: series,
                    title: 'Playlist',
                    currentTab: currentTab,
                  });
                }}
              />
            )} */}
            <View style={styles.seriesView}>
              <FlatList
                data={filteredSeries()}
                horizontal
                renderItem={({ item, index }) => (
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
            {/* <HeadingTitle
              title="More Music"
              marginHorizontal={scaledValue(14)}
            /> */}
          </>
        }
        numColumns={2}
        initialNumToRender={8}
        renderItem={({ item, index }) => (
          <MusicCard
            key={item?.id}
            data={item}
            index={index}
            tag={item?.tag}
            currentTab={currentTab}
            type="music"
          />
        )}
        keyExtractor={item => item?.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: scaledValue(10),
          // marginVertical: scaledValue(10),
        }}
      />
    </>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({
  seriesView: {
    marginLeft: scaledValue(14),
  },
});
