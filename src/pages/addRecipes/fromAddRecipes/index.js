import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Input, FormControl, Select, Button, TextArea } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useRequest from '@ahooksjs/use-request';
import { styles } from './styles';
import { postRecipes } from '../../../apis/recipes';
import { useAccountStateValue } from '../../../atoms/account';
import { I18n } from '../../../utils/languages';

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
};

export const FromAddRecipes = () => {
  const account = useAccountStateValue();
  const [isUpload, setUpload] = React.useState(false);
  const [info, setInfo] = React.useState(paramsInfo);

  const recipes = useRequest(postRecipes, {
    manual: true,
    onSuccess: response => {
      console.log('response from add recipes', response);
    },
  });
  //const _path = path.split('/').pop();
  const onSelectImage = async () => {
    const result = await launchImageLibrary();
    console.log('result', result);
    setInfo({
      ...info,
      image: result?.assets[0].uri,
      fileName: result?.assets[0].fileName,
    });
  };

  const onDeleteImage = () => {
    setInfo({ ...info, image: '' });
  };

  const handleUpload = () => {
    setUpload(true);
    info.userId = account?.id;
    info.userName = account?.username;
    console.log('info', info);
    recipes.run({ data: info });
    setTimeout(() => {
      setInfo(paramsInfo);
      setUpload(false);
      console.log('info', info);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.viewImageAdd(info.image)}
        onPress={onSelectImage}>
        <Image
          source={
            info.image
              ? { uri: info.image }
              : require('../../../assets/add-photo.png')
          }
          style={styles.image}
        />
        {info.image ? (
          <TouchableOpacity style={styles.close} onPress={onDeleteImage}>
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
          onChangeText={text => setInfo({ ...info, recipesName: text })}
        />
        <FormControl.Label mt="3">
          {I18n.t('recipes.difficulty')}
        </FormControl.Label>
        <Select
          accessibilityLabel={I18n.t('recipes.selectDifficulty')}
          placeholder={I18n.t('recipes.selectDifficulty')}
          onValueChange={value => setInfo({ ...info, difficulty: value })}>
          <Select.Item label="Dễ ràng" value="easy" />
          <Select.Item label="Trung bình" value="medium" />
          <Select.Item label="Khó" value="hard" />
        </Select>
        <FormControl.Label mt="3">
          {I18n.t('recipes.category')}
        </FormControl.Label>
        <Select
          accessibilityLabel={I18n.t('recipes.category')}
          placeholder={I18n.t('recipes.selectCategory')}
          onValueChange={value => setInfo({ ...info, category: value })}>
          <Select.Item label="Cơm" value="easy" />
          <Select.Item label="Đồ nướng" value="medium" />
          <Select.Item label="Lẩu" value="hard" />
        </Select>
        <FormControl.Label mt="3">
          {I18n.t('recipes.cuisine')}
        </FormControl.Label>
        <Select
          accessibilityLabel={I18n.t('recipes.cuisine')}
          placeholder={I18n.t('recipes.selectCuisine')}
          onValueChange={value => setInfo({ ...info, cuisine: value })}>
          <Select.Item label="Châu Á" value="chau_a" />
          <Select.Item label="Châu Âu" value="chau_au" />
          <Select.Item label="Châu Mỹ" value="chau_my" />
        </Select>
        <FormControl.Label mt="3">
          {I18n.t('recipes.ingredients')}
        </FormControl.Label>
        <TextArea
          placeholder={I18n.t('recipes.ingredients')}
          onChangeText={text => setInfo({ ...info, ingredients: text })}
        />
        <FormControl.Label mt="3">{I18n.t('recipes.steps')}</FormControl.Label>
        <TextArea
          placeholder={I18n.t('recipes.steps')}
          h={40}
          onChangeText={text => setInfo({ ...info, steps: text })}
        />
        {/* <FormControl.Label mt="3">Website URL</FormControl.Label>
        <Input placeholder="Website URL" />
        <FormControl.Label mt="3">Youtube URL</FormControl.Label>
        <Input placeholder="Youtube URL" /> */}
      </FormControl>
      <Button
        mb="20"
        onPress={handleUpload}
        leftIcon={<AntDesign name="clouduploado" size={20} color="#7BD8E8" />}
        isLoading={isUpload}
        variant="outline"
        isLoadingText={I18n.t('recipes.uploadingRecipes')}>
        {I18n.t('recipes.uploadRecipes')}
      </Button>
    </ScrollView>
  );
};
