import React, { useMemo } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Input, Icon, Stack, Button } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import useRequest from '@ahooksjs/use-request';
import { useNavigation } from '@react-navigation/core';
import { stylesCommon } from '../../constants/stylesCommon';
import { I18n } from '../../utils/languages';
import { registerUser } from '../../apis/user';

export const RegisterScreen = () => {
  const { goBack } = useNavigation();
  const register = useRequest(registerUser, {
    manual: true,
    onSuccess: res => {
      console.log('res', res);
      if (res.status === 201) {
        Alert.alert('About', `${res.message}`, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
      if (res.status === 200) {
        Alert.alert('About', `${res.message}`, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
    },
  });
  const [isLogin, setLogin] = React.useState(false);
  const [info, setInfo] = React.useState({
    show: false,
    username: '',
    password: '',
    rePassword: '',
    avatar: '',
    email: '',
    createAt: new Date(),
    updateAt: '',
    id: 6,
  });

  const handleRegister = async () => {
    // setLogin(true);
    if (info.rePassword != info.password) {
      Alert.alert('About', 'Mật khẩu phải trùng nhau', [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    } else {
      register.run(info);
    }
    // setTimeout(async () => {
    //   setLogin(false);
    //   goBack();
    // }, 2000);
  };

  const isDisable = useMemo(() => {
    let enable = false;
    if (info.password === '' && info.username === '') {
      enable = true;
    }
    console.log('enable', enable);
    return enable;
  }, [info.username, info.password]);
  console.log('isDisable', isDisable);
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
          value={info.username}
          onChangeText={text => setInfo({ ...info, username: text })}
          InputLeftElement={
            <Icon
              as={<AntDesign name="user" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder={I18n.t('login.username')}
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          value={info.password}
          onChangeText={text => setInfo({ ...info, password: text })}
          type={info.show ? 'text' : 'password'}
          InputLeftElement={
            <Icon
              as={<AntDesign name="lock" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder={I18n.t('login.password')}
          InputRightElement={
            <TouchableOpacity style={styles.eye} onPress={handleShowPass}>
              <Entypo name={info.show ? 'eye' : 'eye-with-line'} size={20} />
            </TouchableOpacity>
          }
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          value={info.rePassword}
          onChangeText={text => setInfo({ ...info, rePassword: text })}
          type={info.show ? 'text' : 'password'}
          InputLeftElement={
            <Icon
              as={<AntDesign name="lock" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder={I18n.t('login.password')}
          InputRightElement={
            <TouchableOpacity style={styles.eye} onPress={handleShowPass}>
              <Entypo name={info.show ? 'eye' : 'eye-with-line'} size={20} />
            </TouchableOpacity>
          }
        />
        <Button
          disabled={isDisable}
          onPress={handleRegister}
          isLoading={isLogin}
          variant="outline"
          isLoadingText={I18n.t('login.registering')}>
          {I18n.t('login.register')}
        </Button>
        <Button variant="link">{I18n.t('login.iHaveAccount')}</Button>
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
