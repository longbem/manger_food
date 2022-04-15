import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import useRequest from '@ahooksjs/use-request';
import { stylesCommon } from '../../constants/stylesCommon';
import { useNavigation } from '@react-navigation/native';
import { getMyLoveRecipes } from '../../apis/recipes';
import { useAccountStateValue } from '../../atoms/account';
import { imageNull, avatarNull } from '../../constants';

const ItemNewestRecipes = ({ item }) => {
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
        <Text>{item?.recipesName}</Text>
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

export const FavouriteRecipesScreen = () => {
  const account = useAccountStateValue();
  const { data, loading } = useRequest(getMyLoveRecipes, {
    defaultParams: [{ idUser: account?.id }],
  });
  if (loading || data.length <= 0) {
    return <View />;
  }
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
