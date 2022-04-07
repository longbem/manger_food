import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { stylesCommon } from '../../../constants/stylesCommon';
import { useNavigation } from '@react-navigation/native';
import { I18n } from '../../../utils/languages';

export const Search = () => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate('searchScreen')}
      style={[styles.row, styles.spaceBetween, styles.container]}>
      <Text>{I18n.t('search.enterTheNameOfTheDish')}</Text>
      <AntDesign name="search1" size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  container: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#CAD3DD',
    padding: 10,
    borderRadius: 10,
  },
});
