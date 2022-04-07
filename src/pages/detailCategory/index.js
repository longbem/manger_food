import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { stylesCommon } from '../../constants/stylesCommon';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: 1,
    nameRecipes: 'Cong thuc ABC',
    username: 'Bem',
    image:
      'https://www.naturallygood.de/wp-content/uploads/2018/01/HirseSalat_3225.jpg',
  },
  {
    id: 2,
    nameRecipes: 'Cong thuc ABC',
    username: 'Bem',
    image:
      'https://kienthucmoi.net/img/2021/07/22/cach-tang-suc-de-khang-151.jpg',
  },
  {
    id: 3,
    nameRecipes: 'Cong thuc ABC',
    username: 'Bem',
    image:
      'https://kienthucmoi.net/img/2021/07/22/cach-tang-suc-de-khang-3.jpg',
  },
];

const ItemNewestRecipes = ({ item }) => {
  const { navigate } = useNavigation();

  const onDetail = () => {
    navigate('detailRecipesScreen', { id: item?.id, data: item });
  };

  return (
    <TouchableOpacity
      style={[styles.row, styles.viewItem]}
      key={item?.id}
      onPress={onDetail}>
      <FastImage source={{ uri: item?.image }} style={styles.img} />
      <View>
        <Text>{item?.nameRecipes}</Text>
        <View style={[styles.row, styles.aliCenter]}>
          <FastImage source={{ uri: item?.image }} style={styles.avatar} />
          <Text>{item?.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const DetailCategoryScreen = () => {
  return (
    <View style={[styles.container]}>
      <ScrollView bounces={false}>
        {data.map(item => (
          <ItemNewestRecipes key={item?.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  newestRecipes: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  viewItem: {
    marginVertical: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 5,
  },
});
