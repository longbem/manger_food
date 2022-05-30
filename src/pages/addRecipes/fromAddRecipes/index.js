import React from 'react';
import { Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Input, FormControl, Select, Button, TextArea } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useRequest from '@ahooksjs/use-request';
import { styles } from './styles';
import { postRecipes, updateRecipe } from '../../../apis/recipes';
import { useAccountStateValue } from '../../../atoms/account';
import { I18n } from '../../../utils/languages';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRecipeState } from '../../../atoms/recipes';

const paramsInfo = {
  image: '',
  fileName: '',
  recipesName: '',
  category: '',
  difficulty: '',
  cuisine: '',
  ingredients: '',
  steps: '',
  avatar: '',
  userId: '',
  userName: '',
  createAt: new Date(),
  updateAt: '',
  comment: [],
};

export const FromAddRecipes = () => {
  const route = useRoute();
  const { goBack } = useNavigation();
  const account = useAccountStateValue();
  const [recipe, setRecipe] = useRecipeState();
  const [isUpload, setUpload] = React.useState(false);

  const _addRecipes = useRequest(postRecipes, {
    manual: true,
    onSuccess: res => {
      console.log('response from add recipes', res);
      if (res.status === 201) {
        Alert.alert('About', `${res.message}`, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
      if (res.status === 200) {
        setRecipe(paramsInfo);
      }
    },
  });

  const _updateRecipe = useRequest(updateRecipe, {
    manual: true,
    onSuccess: res => {
      console.log('response from add recipes', res);
      if (res.status === 201) {
        Alert.alert('About', `${res.message}`, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
      if (res.status === 200) {
        setRecipe(paramsInfo);
        goBack();
      }
    },
  });
  //const _path = path.split('/').pop();
  const onSelectImage = async () => {
    const result = await launchImageLibrary();
    setRecipe({
      ...recipe,
      image: result?.assets[0].uri,
      fileName: result?.assets[0].fileName,
    });
  };

  const onDeleteImage = () => {
    setRecipe({ ...recipe, image: '' });
  };

  const handleUpload = () => {
    setUpload(true);
    setRecipe({
      ...recipe,
      userId: account?.id,
      userName: account?.username,
      avatar: account?.avatar,
    });
    setTimeout(() => {
      _addRecipes.run(recipe);
      setUpload(false);
    }, 2000);
  };

  const handleEdit = () => {
    setUpload(true);
    console.log('recipe', recipe);
    setTimeout(() => {
      _updateRecipe.run({
        data: recipe,
        collectionId: route.params?.collectionId,
      });
      setUpload(false);
    }, 2000);
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.viewImageAdd(recipe.image)}
        onPress={onSelectImage}
        disabled={!!recipe.image}>
        <Image
          source={
            recipe.image
              ? { uri: recipe.image }
              : require('../../../assets/add-photo.png')
          }
          style={styles.image}
        />
        {recipe.image ? (
          <TouchableOpacity
            style={styles.close}
            onPress={onDeleteImage}
            disabled={route.params?.edit}>
            <AntDesign name="close" size={20} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      <FormControl mt="10" mb="10" isRequired>
        {/* <FormControl.Label>Ngôn ngữ</FormControl.Label>
        <Select accessibilityLabel="Chọn ngôn ngữ" placeholder="Chọn ngôn ngữ">
          <Select.Item label="Việt nam" value="vn" />
          <Select.Item label="English" value="uk" />
        </Select> */}
        <FormControl.Label mt="3">
          {I18n.t('recipes.nameRecipes')}
        </FormControl.Label>
        <Input
          placeholder={I18n.t('recipes.nameRecipes')}
          onChangeText={text => setRecipe({ ...recipe, recipesName: text })}
          value={recipe.recipesName}
        />
        <FormControl.Label mt="3">
          {I18n.t('recipes.difficulty')}
        </FormControl.Label>
        <Select
          selectedValue={recipe.difficulty}
          accessibilityLabel={I18n.t('recipes.selectDifficulty')}
          placeholder={I18n.t('recipes.selectDifficulty')}
          onValueChange={value => setRecipe({ ...recipe, difficulty: value })}>
          <Select.Item label="Dễ ràng" value="easy" />
          <Select.Item label="Trung bình" value="medium" />
          <Select.Item label="Khó" value="hard" />
        </Select>
        <FormControl.Label mt="3">
          {I18n.t('recipes.category')}
        </FormControl.Label>
        <Select
          selectedValue={recipe.category}
          accessibilityLabel={I18n.t('recipes.category')}
          placeholder={I18n.t('recipes.selectCategory')}
          onValueChange={value => setRecipe({ ...recipe, category: value })}>
          <Select.Item label="Bữa sáng" value="breakfast" />
          <Select.Item label="Bữa trưa" value="lunch" />
          <Select.Item label="Bữa tối" value="dinner" />
          <Select.Item label="Mỳ ống" value="pasta" />
          <Select.Item label="Hải sản" value="seafood" />
          <Select.Item label="Nướng" value="bake" />
          <Select.Item label="Salads" value="salads" />
        </Select>
        <FormControl.Label mt="3">
          {I18n.t('recipes.cuisine')}
        </FormControl.Label>
        <Select
          selectedValue={recipe.cuisine}
          accessibilityLabel={I18n.t('recipes.cuisine')}
          placeholder={I18n.t('recipes.selectCuisine')}
          onValueChange={value => setRecipe({ ...recipe, cuisine: value })}>
          <Select.Item label="Châu Á" value="chau_a" />
          <Select.Item label="Châu Âu" value="chau_au" />
          <Select.Item label="Châu Mỹ" value="chau_my" />
        </Select>
        <FormControl.Label mt="3">
          {I18n.t('recipes.ingredients')}
        </FormControl.Label>
        <TextArea
          placeholder={I18n.t('recipes.ingredients')}
          onChangeText={text => setRecipe({ ...recipe, ingredients: text })}
          value={recipe.ingredients}
        />
        <FormControl.Label mt="3">{I18n.t('recipes.steps')}</FormControl.Label>
        <TextArea
          placeholder={I18n.t('recipes.steps')}
          h={40}
          onChangeText={text => setRecipe({ ...recipe, steps: text })}
          value={recipe.steps}
        />
        {/* <FormControl.Label mt="3">Website URL</FormControl.Label>
        <Input placeholder="Website URL" />
        <FormControl.Label mt="3">Youtube URL</FormControl.Label>
        <Input placeholder="Youtube URL" /> */}
      </FormControl>
      <Button
        mb="20"
        onPress={route.params?.edit ? handleEdit : handleUpload}
        leftIcon={<AntDesign name="clouduploado" size={20} color="#7BD8E8" />}
        isLoading={isUpload}
        variant="outline"
        isLoadingText={I18n.t('recipes.uploadingRecipes')}>
        {route.params?.edit
          ? I18n.t('recipes.editRecipes')
          : I18n.t('recipes.uploadRecipes')}
      </Button>
    </ScrollView>
  );
};
