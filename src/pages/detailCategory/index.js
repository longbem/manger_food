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
import { useNavigation, useRoute } from '@react-navigation/native';
import useRequest from '@ahooksjs/use-request';
import { getRecipesByCategory } from '../../apis/recipes';
import { I18n } from '../../utils/languages';

const ItemNewestRecipes = ({ item }) => {
  const { navigate } = useNavigation();

  const onDetail = () => {
    navigate('detailRecipesScreen', { id: item?.collectionId, data: item });
  };

  return (
    <TouchableOpacity
      style={[styles.row, styles.viewItem]}
      key={item?.id}
      onPress={onDetail}>
      <FastImage source={{ uri: item?.image }} style={styles.img} />
      <View>
        <Text>{item?.recipesName}</Text>
        <View style={[styles.row, styles.aliCenter]}>
          <FastImage source={{ uri: item?.image }} style={styles.avatar} />
          <Text>{item?.userName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const DetailCategoryScreen = () => {
  const route = useRoute();

  const { data, loading } = useRequest(getRecipesByCategory, {
    defaultParams: [{ category: route.params.category }],
  });
  if (loading) {
    return <View />;
  }

  if (data?.length === 0) {
    return (
      <View style={styles.notResultContainer}>
        <FastImage
          source={require('../../assets/recipe-book.gif')}
          style={styles.imgNotResult}
        />
        <Text style={styles.recipes}>{I18n.t('search.searchNoResult')}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <ScrollView bounces={false}>
        {data?.map(item => (
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
  imgNotResult: {
    width: 200,
    height: 200,
  },
  notResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
