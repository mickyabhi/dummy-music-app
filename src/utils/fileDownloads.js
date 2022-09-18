import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import { BaseURL } from '~/constants';

const filePermission = async () => {
  try {
    const isGranted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      isGranted['android.permission.READ_EXTERNAL_STORAGE'] &&
      isGranted['android.permission.WRITE_EXTERNAL_STORAGE']
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Failed to get permission', error.message);
    return false;
  }
};

export async function handleFileDownload({ fileType, fileName, songMetadata }) {
  const isAllowedToDownload = await filePermission();

  if (!isAllowedToDownload) {
    return ToastAndroid.show(
      'Cannot download file, please allow storage permission to download the file.',
      ToastAndroid.SHORT,
    );
  }

  const CONFIG = {
    fileCache: true,

    addAndroidDownloads: {
      description: 'Neend - Downloading',
      notification: true,
      mediaScannable: false,
      useDownloadManager: true,
      path: `${RNFetchBlob.fs.dirs.DownloadDir}/Neend/${fileType}/${fileName}.NEEND_MEDIA_FILE`,
    },

    indicator: true,
    title: songMetadata.title,
  };

  console.log('->>>>> The file to be saved', {
    CONFIG,
    fileName,
    fileType,
    cacheDIr: RNFetchBlob.fs.dirs.DownloadDir,
  });

  const DOWNLOAD_URL = BaseURL + songMetadata.url;

  RNFetchBlob.config(CONFIG)
    .fetch('GET', DOWNLOAD_URL)
    .progress({ count: 10 }, (received, total) => {
      console.log(`progress: ${received} / ${total}`);
    })
    .then(res => {
      // maintain the record file JSON.
      return Toast.show({
        text1: 'Downloading...',
        type: 'success',
        position: 'bottom',
        duration: 2000,
      });
    })
    .catch(error => {
      console.log('Failed to download file', error);

      return Toast.show({
        text1: 'Failed to download file.',
        text2:
          'Please check your internet connection or contact support@neend.app',
        type: 'error',
        position: 'bottom',
        duration: 2000,
      });
    });
}
