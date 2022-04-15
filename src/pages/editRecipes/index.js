import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NotLogged } from './notLogged';
import { stylesCommon } from '../../constants/stylesCommon';
import { FromAddRecipes } from '../addRecipes/fromAddRecipes';
import { useAccountStateValue } from '../../atoms/account';

export const EditRecipesScreen = () => {
  return (
    <View style={styles.container}>
      <FromAddRecipes />
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
