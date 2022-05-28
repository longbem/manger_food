import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { getUrlImage } from '../recipes';

const USER = 'users';

export const getUser = async () => {
  try {
    const response = await firestore().collection(USER).get();
    let listUser = [];
    response.forEach(snapshot => {
      let data = snapshot.data();
      console.log('data', data);
      data.collectionId = snapshot.id;
      listUser.push(data);
    });
    return listUser;
  } catch (e) {
    console.log('error', e);
  }
};

export const updateUser = async data => {
  if (Object.keys(data.avatar).length == 0)
    return alert('Please Select any File');

  const task = storage()
    .ref(data.fileName)
    .putFile(data.avatar.replace('file://', ''));

  task.on('state_changed', taskSnapshot => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );
  });
  try {
    task
      .then(async () => {
        console.log('Image uploaded to the bucket!');
        const url = await getUrlImage(data.fileName);
        if (url) {
          firestore()
            .collection(USER)
            .doc(data.collectionId)
            .update({
              email: data.email,
              avatar: url,
            })
            .then(() => {
              return {
                error: undefined,
                status: 200,
              };
            })
            .catch(() => {
              return {
                error: 'error upload',
                status: 400,
              };
            });
        }
      })
      .catch(err => {
        console.log('err upload: ', err);
        return {
          error: 'error upload',
          status: 400,
        };
      });
  } catch (e) {
    console.log('error', e);
  }
};
export const loginUser = async data => {
  try {
    const listUser = await getUser();
    const user = listUser.find(
      item =>
        `${item.username}`.toLocaleLowerCase() ===
          `${data.username}`.toLocaleLowerCase() &&
        `${item.password}`.toString() === `${data.password}`.toString(),
    );
    console.log('user', user);
    if (user) {
      return {
        status: 200,
        message: undefined,
        data: user,
      };
    } else {
      return {
        status: 201,
        message: 'Tài khoản hoặc mật khẩu không đúng',
      };
    }
  } catch (e) {
    console.log('error', e);
  }
};

export const registerUser = async data => {
  try {
    const listUser = await getUser();
    const user = await listUser.filter(
      item =>
        `${item.username}`.toLocaleLowerCase() ===
        `${data.username}`.toLocaleLowerCase(),
    );
    if (user.length === 0) {
      await firestore().collection(USER).add(data);
      return {
        status: 200,
        message: 'Tạo tài khoản thành công',
      };
    } else {
      return {
        status: 201,
        message: 'Tài khoản đã tồn tại',
      };
    }
  } catch (e) {
    console.log('error', e);
  }
};
