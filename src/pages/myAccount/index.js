import React from 'react';
import { TouchableOpacity, Image, ScrollView } from 'react-native';
import { Input, FormControl, Button } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useRequest from '@ahooksjs/use-request';
import { useAccountState } from '../../atoms/account';
import { styles } from './styles';
import { I18n } from '../../utils/languages';
import { updateUser } from '../../apis/user';

const paramsInfo = {
  avatar: '',
  username: '',
};

export const MyAccountScreen = () => {
  const [isUpload, setUpload] = React.useState(false);
  const [account, setAccount] = useAccountState();

  const update = useRequest(updateUser, {
    manual: true,
    onSuccess: response => {
      console.log('response from add recipes', response);
    },
  });

  const onSelectImage = async () => {
    const result = await launchImageLibrary();
    console.log('result', result);
    setAccount({
      ...account,
      avatar: result?.assets[0].uri,
      fileName: result?.assets[0].fileName,
    });
  };

  const onDeleteImage = () => {
    setAccount({ ...account, avatar: '' });
  };

  const handleUpload = () => {
    setUpload(true);
    update.run(account);
    setTimeout(() => {
      setAccount({ ...account });
      setUpload(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.viewImageAdd(account.avatar)}
        onPress={onSelectImage}>
        <Image
          source={
            account?.avatar
              ? { uri: account?.avatar }
              : require('../../assets/add-photo.png')
          }
          style={styles.image}
        />
        {account?.avatar ? (
          <TouchableOpacity style={styles.close} onPress={onDeleteImage}>
            <AntDesign name="close" size={20} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      <FormControl mt="10" mb="10">
        <FormControl.Label mt="3">{I18n.t('login.username')}</FormControl.Label>
        <Input
          placeholder="Username"
          // onChangeText={text => setAccount({ ...account, username: text })}
          value={account?.username}
          // isDisabled={account?.username}
        />
        <FormControl.Label mt="3">{I18n.t('account.email')}</FormControl.Label>
        <Input
          placeholder="Email"
          value={account?.email}
          isDisabled={account?.email}
          onChangeText={text => setAccount({ ...account, email: text })}
        />
      </FormControl>
      <Button
        mb="20"
        onPress={handleUpload}
        leftIcon={<AntDesign name="clouduploado" size={20} color="#7BD8E8" />}
        isLoading={isUpload}
        variant="outline"
        isLoadingText={I18n.t('account.updating')}>
        {I18n.t('account.update')}
      </Button>
    </ScrollView>
  );
};
