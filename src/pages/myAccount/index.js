import React from 'react';
import { TouchableOpacity, Image, ScrollView } from 'react-native';
import { Input, FormControl, Button } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useRequest from '@ahooksjs/use-request';
import { useAccountState } from '../../atoms/account';
import { styles } from './styles';

const paramsInfo = {
  image: '',
};

export const MyAccountScreen = () => {
  const [isUpload, setUpload] = React.useState(false);
  const [info, setInfo] = React.useState(paramsInfo);
  const [account, setAccount] = useAccountState();

  // const recipes = useRequest(postRecipes, {
  //   manual: true,
  //   onSuccess: response => {
  //     console.log('response from add recipes', response);
  //   },
  // });

  const onSelectImage = async () => {
    const result = await launchImageLibrary();
    setInfo({ ...info, image: result?.assets[0].uri });
  };

  const onDeleteImage = () => {
    setInfo({ ...info, image: '' });
  };

  const handleUpload = () => {
    setUpload(true);
    // recipes.run({ data: info });
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
              : require('../../assets/add-photo.png')
          }
          style={styles.image}
        />
        {info.image ? (
          <TouchableOpacity style={styles.close} onPress={onDeleteImage}>
            <AntDesign name="close" size={20} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      <FormControl mt="10" mb="10">
        <FormControl.Label mt="3">Tên người dùng</FormControl.Label>
        <Input
          placeholder="Username"
          // onChangeText={text => setInfo({ ...info, recipesName: text })}
          value={account?.username}
          isDisabled={account?.username}
        />
        <FormControl.Label mt="3">Email</FormControl.Label>
        <Input
          placeholder="Email"
          // onChangeText={text => setInfo({ ...info, recipesName: text })}
          value={account?.email}
          isDisabled={true}
        />
      </FormControl>
      <Button
        mb="20"
        onPress={handleUpload}
        leftIcon={<AntDesign name="clouduploado" size={20} color="#7BD8E8" />}
        isLoading={isUpload}
        variant="outline"
        isLoadingText="Đang cập nhật">
        Cập nhật
      </Button>
    </ScrollView>
  );
};
