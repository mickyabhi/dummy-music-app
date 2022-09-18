import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedZensparksData } from '~/store/ZensparkSlice';
import { analytics } from '~/utils/analytics';
import { style } from '../AppScreens/style';
import ZenSparkCard from './Components/ZensparkCard';
import { useIsFocused } from '@react-navigation/native';
import {
  setCategoryRefresh,
  setIsQuote,
  setPrevCategory,
  setPrevSubCategory,
} from '~/store/UiSlice';
import { convertCase } from '~/utils/common.utils';
import SkeletonUi from './Components/SkeletonZenspark';
import CategoryTab from '~/components/CategoryTab';
import { ScreenHeader } from '~/components/ScreenHeader';

const ZenSparkScreen = () => {
  const scrollQuotes = useRef();
  const zensparksData = useSelector(fetchedZensparksData);
  const zensparkCategories = Object.keys(zensparksData);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const status = useSelector(state => state.zensparks.load);
  const prevSubCat = useSelector(state => state.ui.prevSubCategory);
  const [activeCategory, setActiveCategory] = useState(zensparkCategories[0]);
  const isQuote = useSelector(state => state.ui.isQuote);
  const categoryRefresh = useSelector(state => state.ui.categoryRefresh);
  const prevCat = useSelector(state => state.ui.prevCategory);
  useEffect(() => {
    if (isQuote) {
      dispatch(setIsQuote(false));
    } else {
      dispatch(setIsQuote(true));
    }
    if (categoryRefresh) {
      setActiveCategory(zensparkCategories[0]);
      dispatch(setCategoryRefresh(false));
    }
    if (isFocused && prevCat !== 'quotes') {
      analytics.trackEvent('tab_view', {
        current_tab: 'quotes',
        prev_tab: prevCat,
      });
      dispatch(setPrevCategory('quotes'));
    }
  }, [isFocused]);

  useEffect(() => {
    setActiveCategory(zensparkCategories[0]);
  }, [zensparksData]);

  const subCategoryHandler = category => {
    analytics.trackEvent('sub_category_tab_view', {
      current_tab: 'quotes',
      current_subcategory: category,
      prev_subcategory: prevSubCat,
    });
    dispatch(setPrevSubCategory(category));
    setActiveCategory(category);
    scrollQuotes.current.scrollToOffset({ animated: false, offset: 0 });
  };
  return (
    <>
      <ScreenHeader />
      <View style={style.ZenSparksCategories}>
        {!status && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={zensparkCategories}
            renderItem={({ item }) => (
              <CategoryTab
                onPress={() => subCategoryHandler(item)}
                category={item}
                activeTab={activeCategory}
              />
            )}
          />
        )}
      </View>
      <FlatList
        ref={scrollQuotes}
        data={zensparksData[activeCategory?.toLowerCase()]}
        renderItem={({ item, index }) => (
          <ZenSparkCard
            key={item?.id}
            data={item}
            index={index}
            type="zensparks"
            activeCategory={convertCase(activeCategory)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      {status && <SkeletonUi />}
    </>
  );
};
export default ZenSparkScreen;
