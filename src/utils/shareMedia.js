import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import { Alert } from 'react-native';

const shareMedia = (
  currentTrack,
  mediaType,
  languagePref,
  availableLanguages,
) => {
  let imagePath = null;
  const fs = RNFetchBlob.fs;
  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', currentTrack.artwork)
    .then(resp => {
      imagePath = resp.path();
      return resp.readFile('base64');
    })
    .then(base64 => {
      switch (mediaType) {
        case 'story':
          {
            const shareData = {
              url: `data:image/jpeg;base64,${base64}`,
              message: `Hey, Check out this ${
                languagePref === 'hi' ? 'really calming' : 'awesome'
              } bedtime story "${currentTrack.title}" in ${
                availableLanguages[languagePref]
              }. I fell asleep listening to on the Neend app: https://neend.app/trackplayer/story/${languagePref}/${currentTrack.title
                ?.split(' ')
                ?.join('-')}/${currentTrack.id} Highly recommended!`,
            };
            Share.open(shareData);
          }
          break;
        case 'music':
          {
            const shareData = {
              url: `data:image/jpeg;base64,${base64}`,
              message: `Hey, Whenever you have trouble falling asleep, listen to this really soothing music "${
                currentTrack.title
              }" on the Neend app: https://neend.app/trackplayer/music/title/${currentTrack.title
                ?.split(' ')
                ?.join('-')}/${currentTrack.id} It is pure gold!`,
            };
            Share.open(shareData);
          }
          break;
        case 'meditation':
          {
            const shareData = {
              url: `data:image/jpeg;base64,${base64}`,
              message: `Hey, I stumbled on this ${
                availableLanguages[languagePref]
              } guided meditation "${
                currentTrack.title
              }" on the Neend app, and it is so relaxing. You should really give it a shot: https://neend.app/trackplayer/meditation/${languagePref}/${currentTrack.title
                ?.split(' ')
                ?.join('-')}/${currentTrack.id}`,
            };
            Share.open(shareData);
          }
          break;
        default:
          break;
      }
      return fs.unlink(imagePath);
    })
    .catch(error => {
      console.log('FAILED_TO_SHARE', error);
      Alert.alert(error.message);
    });
};
export default shareMedia;
