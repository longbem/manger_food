import { StyleSheet } from 'react-native';
import { stylesCommon } from '../../constants/stylesCommon';

export const styles = StyleSheet.create({
  ...stylesCommon,
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  viewImageAdd: image => ({
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#CAD3DD',
    width: 150,
    height: 150,
    borderRadius: 15,
    padding: image ? 0 : 5,
    alignSelf: 'center',
  }),
  close: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#CAD3DD',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -10,
    top: -10,
  },
});
