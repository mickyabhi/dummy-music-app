import AsyncStorage from '@react-native-async-storage/async-storage';
import { setItemInAsyncStorage } from '~/storage';
import { analytics } from './analytics';

export const formatPlayerTime = secs => {
  let minutes = Math.floor(secs / 60);
  let seconds = Math.ceil(secs - minutes * 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};
export const convertMinIntoSec = value => {
  value = value?.split(' ');
  value = value[0];
  return value * 60;
};

export const findOnlyNumeric = text => {
  var numb = text.match(/\d/g);
  return numb.join('');
};

export const isEmptyString = str => {
  return str == null || str.toString().trim() === '';
};

export const isNumeric = value => /^[0-9]*$/.test(value);

export const validateEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const generateCategories = (arr = []) => {
  let filterCat = [];

  arr.forEach(item => {
    filterCat = filterCat?.concat(item?.category);
  });

  filterCat = [...new Set(filterCat)];
  filterCat = filterCat.filter(item => item !== '');
  return filterCat;
};

export const saveFormState = async (formState, uid) => {
  return setItemInAsyncStorage(`formState-${uid}`, formState);
};

const ONE_DAY = 24 * 60 * 60 * 1000;

export const convertCase = s => {
  if (s?.toString()?.toLowerCase() === 'todays_spark') {
    return 'Quote of the Day';
  }
  return s
    ?.toString()
    ?.replace(/^[-_]*(.)/, (_, c) => c?.toUpperCase())
    ?.replace(/[-_]+(.)/g, (_, c) => ' ' + c?.toUpperCase());
};

export const processStreak = async ({ userId, streakType = 'app_visit' }) => {
  const currentStreak = await AsyncStorage.getItem(
    `${userId}-${streakType}-streak`,
  );

  analytics.trackEvent('user_streak', {
    userId,
    streakType,
    currentStreak: currentStreak ? JSON.parse(currentStreak).count : 0,
  });

  if (!currentStreak) {
    await AsyncStorage.setItem(`${userId}-${streakType}-streak`, '1');
    return 1;
  }

  if (currentStreak) {
    const currentDate = new Date();
    const currentDateStringSaved = new Date(
      JSON.parse(currentStreak.timestamp),
    );
    const isMoreThanADay = currentDate - currentDateStringSaved > ONE_DAY;

    if (!isMoreThanADay) {
      const newStreak = {
        count: parseInt(currentStreak.count, 10) + 1,
        timestamp: currentDate.toString(),
      };

      await AsyncStorage.setItem(
        `${userId}-${streakType}-streak`,
        JSON.stringify(newStreak),
      );
      return newStreak;
    } else {
      await AsyncStorage.setItem(`${userId}-${streakType}-streak`, {
        count: 1,
        timestamp: currentDate.toString(),
      });
    }
  }
};
