import React from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import useRequest from '@ahooksjs/use-request';
import { stylesCommon } from '../../constants/stylesCommon';
import { searchRecipes } from '../../apis/recipes';

const SearchEmpty = () => {
  return (
    <View style={styles.containerEmpty}>
      <FastImage
        source={require('../../assets/recipe-book.gif')}
        style={styles.imageEmpty}
      />
      <Text style={styles.notFoundRecipes}>Không tìm thấy món ăn này.</Text>
    </View>
  );
};
export const SearchScreen = () => {
  const [search, setSearch] = React.useState('');
  const recipes = useRequest(searchRecipes, { manual: true });
  const data = [];

  const onEndEditing = () => {
    recipes.run(search);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.viewInput, styles.row]}>
        <AntDesign name="search1" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập tên món ăn....!"
          onEndEditing={onEndEditing}
          onChangeText={text => setSearch(text)}
        />
      </View>
      {data.length ? <FlatList /> : <SearchEmpty />}
    </View>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  viewInput: {
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 7,
    justifyContent: 'center',
    // padding: 7,
    height: 40,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  imageEmpty: {
    width: 150,
    height: 150,
  },
  notFoundRecipes: {
    color: '#cdcdcd',
  },
  icon: {
    marginLeft: 10,
  },
});
