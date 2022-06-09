import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { stylesCommon } from '../../constants/stylesCommon';
import { Search } from '../home/search';
import useRequest from '@ahooksjs/use-request';
import { getRecipes } from '../../apis/recipes';
import { ItemNewestRecipes } from '../home/listNewestRecipes';

export const AllListRecipeScreen = () => {
  const { data, loading } = useRequest(getRecipes);
  if (loading || data.length <= 0) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <Search />
        {data.map(item => (
          <View style={styles.box}>
            <ItemNewestRecipes key={item?.id} item={item} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  box: {
    paddingHorizontal: 20,
  },
});
