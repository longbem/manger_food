import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import { stylesCommon } from '../../constants/stylesCommon';
import { useAccountState } from '../../atoms/account';
import { I18n } from '../../utils/languages';

const avatarNull =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTbAztm0T--l3uXW1xUGhbrZerEhU-JFaKDRQYrMusGzjQGjKkIdrG79S4_tYio-abW5Q&usqp=CAU';

const ItemAccount = ({ label, icon, onPress, rightIcon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.row,
        styles.spaceBetween,
        styles.aliCenter,
        styles.viewItem,
      ]}>
      <View style={[styles.row, styles.aliCenter]}>
        <AntDesign name={icon} size={20} color="#CDCDCD" />
        <Text style={styles.label}>{I18n.t(label)}</Text>
      </View>
      {rightIcon ? <AntDesign name="right" color="#CDCDCD" size={17} /> : null}
    </TouchableOpacity>
  );
};

export const AccountScreen = () => {
  const { navigate } = useNavigation();
  const [account, setAccount] = useAccountState();
  const menuAccount = [
    {
      key: 'login',
      name: 'login.loginOrCreateAccount',
      icon: 'adduser',
      onPress: () => navigate('loginScreen'),
    },
    {
      key: 'profile',
      name: 'login.myAccount',
      icon: 'user',
      onPress: () => navigate('myAccountScreen'),
    },
    {
      key: 'language',
      name: 'login.language',
      icon: 'dribbble',
      onPress: () => navigate('languageScreen'),
    },
    {
      key: 'myRecipes',
      name: 'login.myRecipes',
      icon: 'form',
      onPress: () => navigate('myRecipesScreen'),
    },
    {
      key: 'like',
      name: 'login.love',
      icon: 'hearto',
      onPress: () => navigate('FavouriteRecipesScreen'),
    },
    {
      key: 'logout',
      name: 'login.logout',
      icon: 'logout',
      onPress: () => handleLogout(),
    },
  ];

  const handleLogout = async () => {
    setAccount({ ...account, token: null });
    // await AsyncStorage.setItem('login', null);
  };
  console.log('I18n', I18n.locale);
  console.log('account', account);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.viewUser}>
        <FastImage
          style={styles.avatar}
          source={{ uri: account?.avatar || avatarNull }}
        />
        <Text style={styles.guest}>
          {account?.token ? account?.username : 'Khách mời'}
        </Text>
      </View>
      {menuAccount.map(item => {
        if (
          (item?.key === 'like' ||
            item?.key === 'logout' ||
            item?.key === 'profile' ||
            item?.key === 'myRecipes') &&
          account?.token === null
        ) {
          return;
        }
        if (item?.key === 'login' && account?.token) {
          return;
        }
        return (
          <ItemAccount
            key={item?.key}
            onPress={item?.onPress}
            icon={item?.icon}
            label={item?.name}
            rightIcon={item?.key === 'logout' ? false : true}
          />
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewUser: {
    alignItems: 'center',
    margin: 30,
  },
  guest: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    marginLeft: 15,
  },
  viewItem: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#CAD3DD',
  },
});
