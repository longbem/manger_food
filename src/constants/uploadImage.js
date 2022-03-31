import { Platform } from 'react-native';

export const getFileName = (name, path) => {
  if (name != null) {
    return name;
  }

  if (Platform.OS === 'ios') {
    path = '~' + path.substring(path.indexOf('/Documents'));
  }
  return path.split('/').pop();
};

/**
 * Get platform specific value from response
 */
export const getPlatformPath = ({ path, uri }) => {
  return Platform.select({
    android: { value: path },
    ios: { value: uri },
  });
};

export const getPlatformURI = imagePath => {
  let imgSource = imagePath;
  if (isNaN(imagePath)) {
    imgSource = { uri: this.state.imagePath };
    if (Platform.OS == 'android') {
      imgSource.uri = 'file:///' + imgSource.uri;
    }
  }
  return imgSource;
};
