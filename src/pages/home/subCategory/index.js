import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/core';
import { stylesCommon } from '../../../constants/stylesCommon';

export const Category = () => {
  const { navigate } = useNavigation();

  const onDetailCategory = item => {
    navigate('detailCategoryScreen', { title: item?.name });
  };

  const onMore = () => {
    navigate('categoryScreen');
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.row, styles.spaceBetween]}>
        <Text style={styles.labelCategory}>Thể loại</Text>
        <TouchableOpacity onPress={onMore}>
          <Text style={styles.seeMore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {category.map(item => {
          return (
            <TouchableOpacity
              key={item?.key}
              onPress={() => onDetailCategory(item)}
              style={[styles.aliCenter, styles.viewCategory]}>
              <FastImage source={{ uri: item?.image }} style={styles.image} />
              <Text>{item?.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const category = [
  {
    key: 'breakfast',
    name: 'Bữa sáng',
    image:
      'https://iamafoodblog.b-cdn.net/wp-content/uploads/2019/02/full-english-7342.webp',
  },
  {
    key: 'lunch',
    name: 'Bữa trưa',
    image:
      'https://www.naturallygood.de/wp-content/uploads/2018/01/HirseSalat_3225.jpg',
  },
  {
    key: 'dinner',
    name: 'Bữa tối',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2021/09/Healthy-roast-dinner-8757ce1.jpg?quality=90&resize=556,505',
  },
  {
    key: 'pasta',
    name: 'Mỳ ống',
    image:
      'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/38/1474395998-ghk-0216-comfortfoodcover-meatballs.jpg?crop=1.00xw:0.334xh;0,0.534xh&resize=980:*',
  },
  {
    key: 'seafood',
    name: 'Hải sản',
    image:
      'https://realfood.tesco.com/media/images/1400x919-OneTrayRoastDinner-17b80fd0-8071-474e-84e5-f19eb03da1b5-0-1400x919.jpg',
  },
  {
    key: 'bake',
    name: 'Nướng',
    image:
      'https://kienthucmoi.net/img/2021/07/22/cach-tang-suc-de-khang-151.jpg',
  },
  {
    key: 'salads',
    name: 'Salads',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2021%2F02%2F04%2Fwatercress-salad-honey-Balsamic-tofu-2000.jpg',
  },
];

const styles = StyleSheet.create({
  ...stylesCommon,
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  seeMore: {
    fontSize: 13,
  },
  labelCategory: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginBottom: 10,
  },
  viewCategory: {
    marginRight: 10,
  },
});
