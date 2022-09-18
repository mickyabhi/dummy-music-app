import React, { useState, useRef, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { analytics } from '~/utils/analytics';
import { useIsFocused } from '@react-navigation/native';
import { getStoriesData } from '../../store/StoriesSlice';
import {
  setPrevCategory,
  setPrevSubCategory,
  toggleRateUsModal,
} from '~/store/UiSlice';
import SkeletonUi from './Components/StoriesSkeleton';
import CategoryTab from '~/components/CategoryTab';
import TrackCard from '~/components/TrackCard';
import HighlightedCard from './Components/HighlightedCard';
import { ScreenHeader } from '~/components/ScreenHeader';
import musicIcon from '../../../assets/images/music-lang.png';
import SeriesCard from '~/components/SeriesCard';
import { scaledValue } from '~/utils/design.utils';
import { useNavigation } from '@react-navigation/native';

const StoriesScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const storyScrollRef = useRef();
  const categoryScrollRef = useRef();
  const isFocused = useIsFocused();
  const prevSubCat = useSelector(state => state.ui.prevSubCategory);
  const prevCat = useSelector(state => state.ui.prevCategory);
  const language = useSelector(state => state.ui.currentLanguage);
  const storiesData = useSelector(state => state.stories.stories);
  const series = useSelector(state => state.stories.series);
  const category = useSelector(state => state.stories.categories);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (category?.length > 0) {
      setActiveTab(category[0]?.category);
    }
  }, [category]);

  const filteredData = () => {
    if (activeTab !== 'All') {
      return storiesData?.filter(item => item?.categories?.includes(activeTab));
    } else {
      return storiesData?.filter(item => !item?.isAllNegative);
    }
  };

  const filteredSeries = () => {
    if (activeTab !== 'All') {
      return series?.filter(item => item?.categories?.includes(activeTab));
    } else {
      return series;
    }
  };

  useEffect(() => {
    dispatch(getStoriesData(language));
  }, [language]);

  useEffect(() => {
    if (props?.route?.params?.type === 'rate') {
      dispatch(toggleRateUsModal(true));
    }
  }, [props?.route?.params]);

  useEffect(() => {
    if (isFocused && prevCat !== 'story') {
      analytics.trackEvent('tab_view', {
        current_tab: 'story',
        prev_tab: prevCat === null ? 'new_session' : prevCat,
      });
      dispatch(setPrevCategory('story'));
    }
  }, [isFocused]);

  const subCategoryHandler = elem => {
    setActiveTab(elem);
    analytics.trackEvent('sub_category_tab_view', {
      current_tab: 'story',
      current_subcategory: elem,
      prev_subcategory: prevSubCat,
    });
    dispatch(setPrevSubCategory(elem));
    storyScrollRef.current.scrollToOffset({
      animated: false,
      offset: 0,
    });
  };

  const highlightCardData = () => {
    let highlightData = [];
    let highlight = [];
    if (activeTab !== 'All') {
      highlightData = storiesData?.filter(item =>
        item?.categories?.includes(activeTab),
      );
      highlight = highlightData?.filter(item => item?.highlight);
      if (highlight?.length > 0) {
        return highlight;
      }
      highlightData = [highlightData[0]];
      return highlightData;
    }
    highlightData = storiesData?.filter(item => item?.highlight);
    if (highlightData?.length > 0) {
      return highlightData;
    }

    highlightData = storiesData?.filter(item => !item?.isAllNegative);

    highlightData = [highlightData[0]];
    return highlightData;
  };
  return (
    <>
      <ScreenHeader musicButton={musicIcon} />
      <View>
        {activeTab === '' && <SkeletonUi />}

        {storiesData?.length > 0 && (
          <FlatList
            data={category}
            horizontal
            ref={categoryScrollRef}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <CategoryTab
                onPress={() => {
                  subCategoryHandler(item?.category);
                  categoryScrollRef.current.scrollToIndex({
                    animated: true,
                    index,
                  });
                }}
                category={item?.category}
                activeTab={activeTab}
              />
            )}
          />
        )}
      </View>

      <FlatList
        ref={storyScrollRef}
        data={filteredData()?.filter(item => item !== highlightCardData()[0])}
        ListHeaderComponent={
          <>
            <FlatList
              data={highlightCardData()}
              renderItem={({ item, index }) => (
                <HighlightedCard
                  data={item}
                  artwork={item?.artwork}
                  title={item?.title}
                  artist={item?.artist}
                  duration={item?.duration}
                  tag={item?.tag}
                  index={index}
                  keyExtractor={index => index}
                  activeTab={activeTab}
                  type="story"
                />
              )}
            />
            {/* {filteredSeries()?.length > 0 && (
              <HeadingTitle
                title="Sleepy Series"
                more="MORE"
                onPress={() => {
                  navigation.navigate('SeriesCollection', {
                    series: series,
                    title: 'Sleepy Series',
                    currentTab: activeTab,
                  });
                }}
              />
            )} */}
            <View style={style.seriesView}>
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
            {/* <HeadingTitle title="Sleepy Tales" /> */}
          </>
        }
        renderItem={({ item, index }) => {
          return (
            <TrackCard
              data={item}
              index={index}
              artwork={item?.artwork}
              title={item?.title}
              artist={item?.artist}
              duration={item?.duration}
              tag={item?.tag}
              type="story"
              keyExtractor={({ index }) => index}
              activeTab={activeTab}
            />
          );
        }}
        keyExtractor={item => item?.id?.toString()}
        initialNumToRender={8}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={8}
      />
    </>
  );
};
const style = StyleSheet.create({
  seriesView: {
    marginLeft: scaledValue(24),
  },
});
export default StoriesScreen;
