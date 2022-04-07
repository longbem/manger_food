import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import { stylesCommon } from '../../../constants/stylesCommon';
import { useAccountStateValue } from '../../../atoms/account';
import { I18n } from '../../../utils/languages';
import { avatarNull } from '../../../constants';

export const HomeHeader = () => {
  const account = useAccountStateValue();
  const hours = dayjs().hour();
  console.log(I18n.locale, 'dkm');
  return (
    <View style={[styles.row, styles.spaceBetween, styles.container]}>
      <View>
        <Text>
          {hours < 12
            ? I18n.t('home.goodMorning')
            : hours < 18
            ? I18n.t('home.goodAfternoon')
            : I18n.t('home.goodEvening')}
        </Text>
        {account?.token ? (
          <Text style={styles.name}>{account?.username}</Text>
        ) : null}
      </View>
      <FastImage
        source={{ uri: account?.avatar || avatarNull }}
        style={styles.img}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  container: {
    margin: 20,
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#CAD3DD',
  },
  name: {
    fontWeight: 'bold',
  },
});
