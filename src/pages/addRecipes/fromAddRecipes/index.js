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
import { styles } from './styles';

export const FromAddRecipes = () => {
  const [isUpload, setUpload] = React.useState(false);
  const [info, setInfo] = React.useState({
    image: '',
    nameRecipes: '',
    category: '',
    difficulty: '',
    cuisine: '',
    ingredients: '',
    steps: '',
  });

  const onSelectImage = async () => {
    const result = await launchImageLibrary();
    setInfo({ ...info, image: result?.assets[0].uri });
  };

  const onDeleteImage = () => {
    setInfo({ ...info, image: '' });
  };

  const handleUpload = () => {
    console.log('info', info);
    setUpload(true);
    setTimeout(() => {
      setUpload(false);
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
        <FormControl.Label mt="3">Tên món ăn</FormControl.Label>
        <Input
          placeholder="Tên món ăn"
          onChangeText={text => setInfo({ ...info, nameRecipes: text })}
        />
        <FormControl.Label mt="3">Độ khó</FormControl.Label>
        <Select
          accessibilityLabel="Chọn độ khó món ăn"
          placeholder="Chọn độ khó món ăn"
          onValueChange={text => setInfo({ ...info, difficulty: text })}>
          <Select.Item label="Dễ ràng" value="easy" />
          <Select.Item label="Trung bình" value="medium" />
          <Select.Item label="Khó" value="hard" />
        </Select>
        <FormControl.Label mt="3">Thể loại</FormControl.Label>
        <Select
          accessibilityLabel="Chọn thể loại"
          placeholder="Chọn thể loại"
          onValueChange={text => setInfo({ ...info, category: text })}>
          <Select.Item label="Cơm" value="easy" />
          <Select.Item label="Đồ nướng" value="medium" />
          <Select.Item label="Lẩu" value="hard" />
        </Select>
        <FormControl.Label mt="3">Loại ẩm thực</FormControl.Label>
        <Select
          accessibilityLabel="Chọn loại ẩm thực"
          placeholder="Chọn loại ẩm thực"
          onValueChange={text => setInfo({ ...info, cuisine: text })}>
          <Select.Item label="Châu Á" value="chau_a" />
          <Select.Item label="Châu Âu" value="chau_au" />
          <Select.Item label="Châu Mỹ" value="chau_my" />
        </Select>
        <FormControl.Label mt="3">Nguyên liệu</FormControl.Label>
        <TextArea
          placeholder="Nguyên Liệu"
          onChangeText={text => setInfo({ ...info, ingredients: text })}
        />
        <FormControl.Label mt="3">Các bước thực hiện</FormControl.Label>
        <TextArea
          placeholder="Các bước thực hiện"
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
        isLoadingText="Đang úp công thức">
        Úp công thức
      </Button>
    </ScrollView>
  );
};
