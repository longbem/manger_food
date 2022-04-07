import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { stylesCommon } from '../../../constants/stylesCommon';
import { I18n } from '../../../utils/languages';

export const NotLogged = () => {
  const { navigate } = useNavigation();

  const onLogin = () => {
    navigate('loginScreen');
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={require('../../../assets/recipe-book.gif')}
        style={styles.image}
      />
      <Text style={styles.recipes}>
        {I18n.t('login.loginOrCreateAccountToAddRecipes')}
      </Text>
      <TouchableOpacity style={styles.btnLogin} onPress={onLogin}>
        <Text style={styles.login}>{I18n.t('login.loginOrCreateAccount')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  btnLogin: {
    backgroundColor: '#178909',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  login: {
    color: '#FFFFFF',
  },
  recipes: {
    marginVertical: 20,
    marginHorizontal: 30,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
});
