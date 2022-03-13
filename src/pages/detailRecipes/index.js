import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Button } from 'native-base';
import FastImage from 'react-native-fast-image';
import { useRoute, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useRequest from '@ahooksjs/use-request';
import { stylesCommon } from '../../constants/stylesCommon';
import { detailRecipes } from '../../apis/recipes';

export const DetailRecipesScreen = () => {
  const route = useRoute();
  const { goBack } = useNavigation();
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

  if (loading) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView bounces={false}>
        <FastImage source={{ uri: data.image }} style={styles.image} />
        <View style={styles.viewContent}>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.nameRecipes}>{data?.nameRecipes}</Text>
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
            <FastImage source={{ uri: data.image }} style={styles.avatar} />
            <Text>{data?.nameUser}</Text>
          </View>
          <Text style={styles.commentLabel}>Nhận xét:</Text>
          <TextInput
            placeholder="Viết nhận xét của bạn...!"
            multiline
            style={styles.input}
          />
          <Button mt="5" variant="outline" isLoadingText="Đang thêm nhận xét">
            Thêm nhận xét
          </Button>
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
