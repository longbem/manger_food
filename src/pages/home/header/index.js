import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import { stylesCommon } from '../../../constants/stylesCommon';
import { useAccountStateValue } from '../../../atoms/account';

const avatarNull =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTbAztm0T--l3uXW1xUGhbrZerEhU-JFaKDRQYrMusGzjQGjKkIdrG79S4_tYio-abW5Q&usqp=CAU';

export const HomeHeader = () => {
  const account = useAccountStateValue();
  const hours = dayjs().hour();

  return (
    <View style={[styles.row, styles.spaceBetween, styles.container]}>
      <View>
        <Text>
          {hours < 12
            ? 'Good Morning'
            : hours < 18
            ? 'Good Afternoon'
            : 'Good Evening'}
        </Text>
        {account?.token ? <Text style={styles.name}>BEM</Text> : null}
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
