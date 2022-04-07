import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import { stylesCommon } from '../../constants/stylesCommon';
import { changeLanguage } from '../../utils/languages';
import { I18n } from '../../utils/languages';

const ItemAccount = ({ label, source, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.row, styles.aliCenter, styles.viewItem]}>
      <FastImage source={source} style={styles.image} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export const LanguageScreen = () => {
  const { goBack } = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const onSelectLanguage = languagesKey => {
    setLoading(true);
    changeLanguage(languagesKey);
    setTimeout(() => {
      console.log('I18n', I18n.locale);
      goBack();
      setLoading(false);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.selectLanguage}>
        {I18n.t('login.selectLanguage')}
      </Text>
      <ItemAccount
        source={require('../../assets/vietnam.png')}
        label="Vietnamese"
        onPress={() => onSelectLanguage('vn')}
      />
      <ItemAccount
        source={require('../../assets/english.png')}
        label="English"
        onPress={() => onSelectLanguage('en')}
      />
      {loading && <ActivityIndicator size="large" animating />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...stylesCommon,
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  selectLanguage: {
    margin: 20,
    fontSize: 16,
    lineHeight: 20,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  viewItem: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
