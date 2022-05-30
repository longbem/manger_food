import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NotLogged } from './notLogged';
import { stylesCommon } from '../../constants/stylesCommon';
import { FromAddRecipes } from './fromAddRecipes';
import { useAccountStateValue } from '../../atoms/account';

export const AddRecipesScreen = () => {
  const account = useAccountStateValue();
  return (
    <View style={styles.container}>
      {account?.token ? <FromAddRecipes /> : <NotLogged />}
    </View>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 100,
    height: 100,
  },
});
