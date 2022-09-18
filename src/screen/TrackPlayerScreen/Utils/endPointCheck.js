const urlEndPointCheck = track => {
  var endpoint = '';

  if (track?.type === 'story') {
    endpoint = `content/${track?.language}/stories_${track?.language}.json`;
    return endpoint;
  }
  if (track?.type === 'music') {
    endpoint = 'musics_app_content_test.json';
    return endpoint;
  }
  if (track?.type === 'meditation') {
    if (track?.language === 'hi') {
      endpoint = 'meditation_app_content_test.json';
      return endpoint;
    } else {
      endpoint = `meditation_content/${track?.language}/meditation_content_${track?.language}.json`;
      return endpoint;
    }
  }
};
export default urlEndPointCheck;
