import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import useRequest from '@ahooksjs/use-request';
import { stylesCommon } from '../../../constants/stylesCommon';
import { getRecipes } from '../../../apis/recipes';
import { imageNull, avatarNull } from '../../../constants';
import { I18n } from '../../../utils/languages';

export const ItemNewestRecipes = ({ item }) => {
  const { navigate } = useNavigation();

  const onDetail = () => {
    navigate('detailRecipesScreen', { id: item?.collectionId });
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
            source={{ uri: item?.avatar || avatarNull }}
            style={styles.avatar}
          />
          <Text>{item?.userName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ListNewestRecipes = () => {
  const { navigate } = useNavigation();
  const { data, loading } = useRequest(getRecipes);
  if (loading || data.length <= 0) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.row, styles.spaceBetween]}>
        <Text style={styles.newestRecipes}>{I18n.t('home.latestRecipes')}</Text>
        <TouchableOpacity onPress={() => navigate('allListRecipeScreen')}>
          <Text style={styles.seeMore}>{I18n.t('home.seeAll')}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data.map((item, index) =>
          index < 5 ? <ItemNewestRecipes key={item?.id} item={item} /> : null,
        )}
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
