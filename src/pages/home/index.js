import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { stylesCommon } from '../../constants/stylesCommon';
import { HomeHeader } from './header';
import { Search } from './search';
import { SliderCategory } from './sliderCategory';
import { ListNewestRecipes } from './listNewestRecipes';
import { Category } from './subCategory';
import { useAccountState } from '../../atoms/account';

export const HomeScreen = () => {
  const [account, setAccount] = useAccountState();
  console.log('account', account);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <HomeHeader />
        <Search />
        <Category />
        <SliderCategory />
        <ListNewestRecipes />
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
});
