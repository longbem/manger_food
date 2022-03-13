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
import { stylesCommon } from '../../constants/stylesCommon';
import { useAccountState } from '../../atoms/account';

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
        <Text style={styles.label}>{label}</Text>
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
      name: 'Đăng nhập hoặc tạo một tài khoản',
      icon: 'adduser',
      onPress: () => navigate('loginScreen'),
    },
    {
      key: 'profile',
      name: 'Tài khoản của tôi',
      icon: 'user',
      onPress: () => {},
    },
    {
      key: 'language',
      name: 'Ngôn ngữ',
      icon: 'dribbble',
      onPress: () => navigate('languageScreen'),
    },
    {
      key: 'myRecipes',
      name: 'Công thức của tôi',
      icon: 'form',
      onPress: () => navigate('myRecipesScreen'),
    },
    {
      key: 'like',
      name: 'Yêu thích',
      icon: 'hearto',
      onPress: () => navigate('FavouriteRecipesScreen'),
    },
    {
      key: 'logout',
      name: 'Đăng xuất',
      icon: 'logout',
      onPress: () => handleLogout(),
    },
  ];

  const handleLogout = async () => {
    setAccount({ ...account, token: null });
    // await AsyncStorage.setItem('login', null);
  };

  console.log('account', account);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.viewUser}>
        <EvilIcons name="user" size={120} color="#CAD3DD" />
        <Text style={styles.guest}>Khách mời</Text>
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
});
