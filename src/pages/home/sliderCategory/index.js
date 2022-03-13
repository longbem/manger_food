import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import { stylesCommon } from '../../../constants/stylesCommon';

const images = [
  'https://www.naturallygood.de/wp-content/uploads/2018/01/HirseSalat_3225.jpg',
  'https://kienthucmoi.net/img/2021/07/22/cach-tang-suc-de-khang-151.jpg',
  'https://kienthucmoi.net/img/2021/07/22/cach-tang-suc-de-khang-3.jpg',
];

const { width } = Dimensions.get('window');

export const SliderCategory = () => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.label}>Công thức nấu ăn được sưu tầm nhiều nhất</Text>
      <SliderBox
        ImageComponent={FastImage}
        images={images}
        autoplay
        circleLoop
        parentWidth={width - 40}
        inactiveDotColor="#90A4AE"
        dotColor="#FFEE58"
        dotStyle={styles.dot}
        ImageComponentStyle={styles.imageSlider}
        imageLoadingColor={'red'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  container: {
    marginHorizontal: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  imageSlider: {
    borderRadius: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
});
