import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { Button } from 'native-base';
import FastImage from 'react-native-fast-image';
import { useRoute, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useRequest from '@ahooksjs/use-request';
import { stylesCommon } from '../../constants/stylesCommon';
import {
  detailRecipes,
  deleteRecipes,
  postLove,
  commentRecipe,
} from '../../apis/recipes';
import { imageNull, avatarNull } from '../../constants';
import { I18n } from '../../utils/languages';
import { useAccountStateValue } from '../../atoms/account';
import { useRecipeState } from '../../atoms/recipes';

export const DetailRecipesScreen = () => {
  const route = useRoute();
  const account = useAccountStateValue();
  const { goBack, navigate } = useNavigation();
  const [love, setLove] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [recipe, setRecipe] = useRecipeState();

  const _recipes = useRequest(deleteRecipes, {
    manual: true,
  });
  const _love = useRequest(postLove, {
    manual: true,
  });
  const _comment = useRequest(commentRecipe, {
    manual: true,
  });

  const { loading } = useRequest(detailRecipes, {
    defaultParams: [{ id: route.params.id }],
    onSuccess: res => {
      console.log('res', res);
      setRecipe(res);
    },
  });

  const handleBack = () => {
    goBack();
  };

  const handleLove = () => {
    setLove(!love);
    _love.run({
      createAt: new Date(),
      recipesId: recipe?.id,
      userId: account?.id,
    });
  };

  const handleEdit = () => {
    navigate('editRecipesScreen', {
      edit: true,
      collectionId: route.params.id,
    });
  };

  const onDelete = () => {
    _recipes.run({ id: route.params.id });
  };

  const handleDelete = () => {
    Alert.alert('Delete Recipes', 'Bạn có muốn xoá công thức này không?', [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          onDelete();
          goBack();
          goBack();
        },
      },
    ]);
  };

  const onComment = () => {
    const listComment = [];
    listComment.push({
      content: comment,
      userId: account.id,
      avatar: account.avatar,
      username: account.username,
    });
    setRecipe({ ...recipe, comment: [...listComment, ...recipe.comment] });
    setTimeout(() => {
      _comment.run({
        collectionId: route.params.id,
        data: {
          ...recipe,
          comment: [...listComment, ...recipe.comment],
        },
      });
    }, 1000);
  };

  const renderCategory = type => {
    switch (type) {
      case 'breakfast':
        return 'Bữa sáng';
      case 'lunch':
        return 'Bữa trưa';
      case 'dinner':
        return 'Bữa tối';
      case 'pasta':
        return 'Mỳ ống';
      case 'seafood':
        return 'Hải sản';
      case 'bake':
        return 'Nướng';
      default:
        return 'Salads';
    }
  };

  const renderDifficulty = type => {
    switch (type) {
      case 'easy':
        return 'Dễ ràng';
      case 'medium':
        return 'Trung bình';
      case 'hard':
        return 'Khó';
    }
  };

  const renderCuisine = type => {
    switch (type) {
      case 'chau_a':
        return 'Châu Á';
      case 'chau_au':
        return 'Châu Âu';
      case 'chau_my':
        return 'Châu Mỹ';
    }
  };

  if (loading) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView bounces={false}>
        <FastImage
          source={{ uri: recipe?.image || imageNull }}
          style={styles.image}
        />
        <View style={styles.viewContent}>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.nameRecipes}>{recipe?.recipesName}</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.btnAction}>
                <AntDesign name="sharealt" size={20} color="#CAD3DD" />
              </TouchableOpacity>
              {account?.token ? (
                <TouchableOpacity onPress={handleLove}>
                  <AntDesign
                    name="hearto"
                    size={20}
                    color={love ? 'red' : '#CAD3DD'}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={[styles.row, styles.aliCenter, styles.viewAvatar]}>
            <FastImage
              source={{ uri: recipe?.avatar || avatarNull }}
              style={styles.avatar}
            />
            <Text>{recipe?.userName}</Text>
          </View>
          <Text style={styles.commentLabel}>
            {I18n.t('recipes.ingredients')}:
          </Text>
          <Text>{recipe?.ingredients}</Text>
          <Text style={styles.commentLabel}>
            {I18n.t('recipes.category')}: {renderCategory(recipe?.category)}
          </Text>
          <Text style={styles.commentLabel}>
            {I18n.t('recipes.difficulty')}:{' '}
            {renderDifficulty(recipe?.difficulty)}
          </Text>
          <Text style={styles.commentLabel}>
            {I18n.t('recipes.cuisine')}: {renderCuisine(recipe?.cuisine)}
          </Text>
          <Text style={styles.commentLabel}>{I18n.t('recipes.steps')}:</Text>
          <Text>{recipe?.steps}</Text>

          {recipe?.comment.length > 0 && (
            <View style={{ marginVertical: 30 }}>
              <Text
                style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 18 }}>
                {I18n.t('recipes.comment')}
              </Text>
              {recipe?.comment.map(item => {
                return (
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Image
                      source={{ uri: item.avatar || avatarNull }}
                      style={styles.avatar}
                    />
                    <View>
                      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                        {item.username}
                      </Text>
                      <Text>{item.content}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          <Text style={styles.commentLabel}>
            {I18n.t('recipes.ingredients')}:
          </Text>
          <TextInput
            placeholder="Viết nhận xét của bạn...!"
            multiline
            style={styles.input}
            onChangeText={text => setComment(text)}
          />
          <Button
            onPress={onComment}
            mt="5"
            variant="outline"
            isLoadingText={I18n.t('recipes.addingComments')}>
            {I18n.t('recipes.addComment')}
          </Button>
          {recipe?.userId == account?.id ? (
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
