import React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Input, Icon, Stack, Button } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesCommon } from '../../constants/stylesCommon';
import { useAccountState } from '../../atoms/account';

export const LoginScreen = () => {
  const { goBack } = useNavigation();
  const [isLogin, setLogin] = React.useState(false);
  const [account, setAccount] = useAccountState();
  const [info, setInfo] = React.useState({
    show: false,
  });

  const handleLogin = async () => {
    setLogin(true);
    setTimeout(async () => {
      await AsyncStorage.setItem('login', 'token');
      setAccount({ ...account, token: 'token' });
      setLogin(false);
      goBack();
    }, 2000);
  };

  const handleShowPass = () => {
    setInfo({ ...info, show: !info.show });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack
        direction="column"
        mb="2.5"
        space={4}
        alignItems="center"
        justifyContent="center"
        flex={1}>
        <FastImage
          source={require('../../assets/social-media.gif')}
          style={styles.logo}
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          value={account.username}
          onChangeText={text => setAccount({ ...account, username: text })}
          InputLeftElement={
            <Icon
              as={<AntDesign name="user" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="username"
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          value={account.password}
          onChangeText={text => setAccount({ ...account, password: text })}
          type={info.show ? 'text' : 'password'}
          InputLeftElement={
            <Icon
              as={<AntDesign name="lock" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="password"
          InputRightElement={
            <TouchableOpacity style={styles.eye} onPress={handleShowPass}>
              <Entypo name={info.show ? 'eye' : 'eye-with-line'} size={20} />
            </TouchableOpacity>
          }
        />
        <Button
          onPress={handleLogin}
          isLoading={isLogin}
          variant="outline"
          isLoadingText="Đang đăng nhập">
          Đăng nhập
        </Button>
        <Button variant="link" colorScheme="red">
          Tôi chưa có tài khoản.
        </Button>
      </Stack>
      <TouchableOpacity style={styles.back} onPress={() => goBack()}>
        <AntDesign name="arrowleft" size={25} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  back: {
    marginTop: 30,
    padding: 10,
    position: 'absolute',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: '10%',
  },
  eye: {
    marginRight: 15,
  },
});
