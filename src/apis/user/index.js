import firestore from '@react-native-firebase/firestore';

const USER = 'users';

export const getUser = async () => {
  try {
    const response = await firestore().collection(USER).get();
    let listUser = [];
    response.forEach(snapshot => {
      let data = snapshot.data();
      console.log('data', data);
      // data.data.collectionId = snapshot.id;
      listUser.push(data);
    });
    return listUser;
  } catch (e) {
    console.log('error', e);
  }
};

export const putUser = async ({ data }) => {
  try {
    const user = await getUser();
  } catch (e) {
    console.log('error', e);
  }
};

export const updateUser = async () => {
  try {
    const user = await getUser();
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
