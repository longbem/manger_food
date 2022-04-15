import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Button } from 'native-base';
import FastImage from 'react-native-fast-image';
import { useRoute, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useRequest from '@ahooksjs/use-request';
import { stylesCommon } from '../../constants/stylesCommon';
import { detailRecipes } from '../../apis/recipes';
import { imageNull, avatarNull } from '../../constants';
import { I18n } from '../../utils/languages';
import { useAccountStateValue } from '../../atoms/account';

export const DetailRecipesScreen = () => {
  const route = useRoute();
  const account = useAccountStateValue();
  const { goBack, navigate } = useNavigation();
  const [love, setLove] = React.useState(false);

  const { data, loading } = useRequest(detailRecipes, {
    defaultParams: [{ id: route.params.id }],
  });

  const handleBack = () => {
    goBack();
  };

  const handleLove = () => {
    setLove(!love);
  };

  const handleEdit = () => {
    navigate('editRecipesScreen');
  };

  const handleDelete = () => {
    Alert.alert('Delete Recipes', 'Bạn có muốn xoá công thức này không?', [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  if (loading) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView bounces={false}>
        <FastImage
          source={{ uri: data?.image || imageNull }}
          style={styles.image}
        />
        <View style={styles.viewContent}>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.nameRecipes}>{data?.recipesName}</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.btnAction}>
                <AntDesign name="sharealt" size={20} color="#CAD3DD" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLove}>
                <AntDesign
                  name="hearto"
                  size={20}
                  color={love ? 'red' : '#CAD3DD'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row, styles.aliCenter, styles.viewAvatar]}>
            <FastImage
              source={{ uri: data?.image || avatarNull }}
              style={styles.avatar}
            />
            <Text>{data?.userName}</Text>
          </View>
          <Text style={styles.commentLabel}>
            {I18n.t('recipes.ingredients')}:
          </Text>
          <Text>{data?.ingredients}</Text>
          <Text style={styles.commentLabel}>{I18n.t('recipes.steps')}:</Text>
          <Text>{data?.steps}</Text>
          <Text style={styles.commentLabel}>
            {I18n.t('recipes.ingredients')}:
          </Text>
          <TextInput
            placeholder="Viết nhận xét của bạn...!"
            multiline
            style={styles.input}
          />
          <Button
            mt="5"
            variant="outline"
            isLoadingText={I18n.t('recipes.addingComments')}>
            {I18n.t('recipes.addComment')}
          </Button>
          {data?.userId == account?.id ? (
            <View style={[styles.row, styles.spaceBetween]}>
              <Button
                mt="5"
                width={150}
                variant="outline"
                onPress={handleEdit}
                isLoadingText={I18n.t('recipes.addingComments')}>
                {I18n.t('recipes.edit')}
              </Button>
              <Button
                mt="5"
                variant="outline"
                width={150}
                onPress={handleDelete}
                isLoadingText={I18n.t('recipes.addingComments')}>
                {I18n.t('recipes.delete')}
              </Button>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.back} onPress={handleBack}>
        <AntDesign name="arrowleft" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 300,
  },
  viewContent: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: -50,
    padding: 20,
  },
  back: {
    position: 'absolute',
    marginTop: 40,
    marginLeft: 20,
    padding: 7,
    backgroundColor: '#cdcdcd',
    borderRadius: 20,
  },
  btnAction: {
    marginHorizontal: 10,
  },
  nameRecipes: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#CAD3DD',
  },
  viewAvatar: {
    marginTop: 20,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 150,
    borderColor: '#cdcdcd',
    borderWidth: 1,
    padding: 5,
  },
});
