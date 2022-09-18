import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '~/components/Header';
import { scaledValue } from '~/utils/design.utils';
import CategoryTab from '~/components/CategoryTab';
import SeriesCard from '~/components/SeriesCard';

const SeriesCollection = props => {
  const navigation = useNavigation();
  const categoryScrollRef = useRef();
  const [storyCategories, setStoryCategories] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const params = props?.route?.params?.series;

  const filterCategory = () => {
    let catArray = [];
    params?.filter(item => item?.categories?.map(obj => catArray?.push(obj)));
    const categorySet = [...new Set(catArray)];
    setUniqueCategory(categorySet);
  };

  useEffect(() => {
    filterCategory();
  }, [params]);

  useEffect(() => {
    if (storyCategories?.length === 0 || storyCategories === undefined) {
      setStoryCategories(props?.route?.params.currentTab);
    }
  }, [uniqueCategory]);

  const filteredSeries = () => {
    if (storyCategories !== 'All') {
      return params?.filter(item =>
        item?.categories?.includes(storyCategories),
      );
    } else {
      return params;
    }
  };

  return (
    <View>
      <Header
        onPress={() => navigation.goBack()}
        headerTitle={props?.route?.params?.title}
        fontSize={scaledValue(16)}
      />

      <FlatList
        data={uniqueCategory}
        horizontal
        ref={categoryScrollRef}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryTab
            onPress={() => {
              setStoryCategories(item);
              categoryScrollRef.current.scrollToIndex({
                animated: true,
                index,
              });
            }}
            category={item}
            activeTab={storyCategories}
          />
        )}
      />
      <View style={styles.seriesMainContainer}>
        <FlatList
          data={filteredSeries()}
          numColumns={2}
          initialNumToRender={8}
          renderItem={({ item, index }) => (
            <SeriesCard
              seriesTitle={item?.seriesTitle}
              seriesCount={item?.seriesCount}
              artwork={item?.seriesArtwork}
              marginRight={scaledValue(28)}
              onPress={() => {
                navigation.navigate('SeriesPart', item);
              }}
            />
          )}
        />
      </View>
    </View>
  );
};
export default SeriesCollection;
const styles = StyleSheet.create({
  seriesMainContainer: {
    marginHorizontal: scaledValue(33),
    marginTop: scaledValue(10),
  },
});
