import { request } from '../request';

const RECIPES = '/9114e74b-3cf7-43d4-96a9-dfc460e0fe4b';

export const postRecipes = () => {
  return request()
    .post()
    .then(response => {
      console.log('response', response);
    })
    .catch(error => console.log('error', error));
};

export const getRecipes = async () => {
  try {
    return await request().get(RECIPES);
  } catch (e) {
    console.log('error', e);
  }
};

export const putRecipes = () => {
  return;
};

export const deleteRecipes = () => {
  return;
};

export const detailRecipes = async ({ id }) => {
  try {
    const data = await getRecipes();
    let detail = {};
    if (data.length) {
      detail = data.find(item => item.id === id);
    }
    return detail;
  } catch (e) {
    console.log('error', e);
  }
};
