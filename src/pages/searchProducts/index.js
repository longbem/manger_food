import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import useRequest from '@ahooksjs/use-request';
import { stylesCommon } from '../../constants/stylesCommon';
import { getRecipes } from '../../apis/recipes';
import { I18n } from '../../utils/languages';
import { useNavigation } from '@react-navigation/native';
import { avatarNull, imageNull } from '../../constants';

const SearchEmpty = () => {
  return (
    <View style={styles.containerEmpty}>
      <FastImage
        source={require('../../assets/recipe-book.gif')}
        style={styles.imageEmpty}
      />
      <Text style={styles.notFoundRecipes}>
        {I18n.t('search.searchNoResult')}
      </Text>
    </View>
  );
};

const ItemNewestRecipes = ({ item }) => {
  const { navigate } = useNavigation();

  const onDetail = () => {
    navigate('detailRecipesScreen', { id: item?.collectionId });
  };

  return (
    <TouchableOpacity
      style={[styles.row, styles.viewItem]}
      key={item?.id}
      onPress={onDetail}>
      <FastImage
        source={{ uri: item?.image || imageNull }}
        style={styles.img}
      />
      <View>
        <Text style={styles.nameRecipes}>{item?.recipesName}</Text>
        <View style={[styles.row, styles.aliCenter]}>
          <FastImage
            source={{ uri: item?.avatar || avatarNull }}
            style={styles.avatar}
          />
          <Text>{item?.userName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SearchScreen = () => {
  const [filteredDataSource, setFilteredDataSource] = React.useState([]);

  const { data, loading } = useRequest(getRecipes);

  React.useEffect(() => {}, []);

  const onChangeText = text => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.recipesName
          ? item.recipesName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource([]);
    }
  };

  if (loading || data?.length <= 0) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.viewInput, styles.row]}>
        <AntDesign name="search1" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={I18n.t('search.enterTheNameOfTheDish')}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      {filteredDataSource?.length ? (
        <FlatList
          data={filteredDataSource}
          renderItem={({ item, index }) => <ItemNewestRecipes item={item} />}
        />
      ) : (
        <SearchEmpty />
      )}
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
    marginBottom: 30,
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

  // item
  viewItem: {
    marginVertical: 10,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#CAD3DD',
  },
  nameRecipes: {
    textTransform: 'uppercase',
    marginBottom: 7,
  },
});
