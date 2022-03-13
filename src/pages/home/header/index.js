import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import { stylesCommon } from '../../../constants/stylesCommon';
const img = 'https://miro.medium.com/max/880/0*k9CL2yoHU6ELTkmi.png';

export const HomeHeader = () => {
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
        <Text style={styles.name}>BEM</Text>
      </View>
      <FastImage source={{ uri: img }} style={styles.img} />
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
  },
  name: {
    fontWeight: 'bold',
  },
});
