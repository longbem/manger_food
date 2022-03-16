import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import useRequest from '@ahooksjs/use-request';
import { stylesCommon } from '../../../constants/stylesCommon';
import { getRecipes } from '../../../apis/recipes';

const imageNull =
  'https://www.uaex.uada.edu/life-skills-wellness/food-nutrition/eating-well/EFNEP/images/Recipes-Banner.jpg';
const avatarNull =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTbAztm0T--l3uXW1xUGhbrZerEhU-JFaKDRQYrMusGzjQGjKkIdrG79S4_tYio-abW5Q&usqp=CAU';

const ItemNewestRecipes = ({ item }) => {
  const { navigate } = useNavigation();
  console.log('item', item);

  const onDetail = () => {
    navigate('detailRecipesScreen', { id: item?.id });
  };

  return (
    <TouchableOpacity
      style={[styles.row, styles.viewItem]}
      key={item?.id}
      onPress={onDetail}>
      <FastImage
        source={{ uri: item?.image || imageNull }}
        style={styles.img}
      />
      <View>
        <Text style={styles.nameRecipes}>{item?.recipesName}</Text>
        <View style={[styles.row, styles.aliCenter]}>
          <FastImage
            source={{ uri: item?.image || avatarNull }}
            style={styles.avatar}
          />
          <Text>{item?.userName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ListNewestRecipes = () => {
  const { data, loading } = useRequest(getRecipes);
  console.log('data', data);
  if (loading || data.length <= 0) {
    return <View />;
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.row, styles.spaceBetween]}>
        <Text style={styles.newestRecipes}>Công thức nấu ăn mới nhất</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
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
    margin: 20,
  },
  newestRecipes: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeMore: {
    fontSize: 13,
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
    borderWidth: 1,
    borderColor: '#CAD3DD',
  },
  nameRecipes: {
    textTransform: 'uppercase',
    marginBottom: 7,
  },
});
