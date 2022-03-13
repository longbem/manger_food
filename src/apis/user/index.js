import { request } from '../request';

const USER = 'user';

export const postUser = async () => {
  try {
    return await request().get(USER);
  } catch (e) {
    console.log('error', e);
  }
};

export const getUser = async () => {
  try {
    return await request().get(USER);
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
