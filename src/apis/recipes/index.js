import { request } from '../request';
import firestore from '@react-native-firebase/firestore';

const RECIPES = 'recipes';

export const postRecipes = async data => {
  try {
    const response = await firestore().collection(RECIPES).add(data);
    console.log('response', response);
  } catch (e) {
    console.log('error: ', e);
  }
};

export const getRecipes = async () => {
  try {
    const response = await firestore().collection(RECIPES).get();

    let arrayRecipes = [];
    response.forEach(snapshot => {
      let data = snapshot.data();
      data.data.id = snapshot.id;
      arrayRecipes.push(data.data);
    });
    return arrayRecipes;
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
    const response = await firestore().collection(RECIPES).doc(id).get();
    return response.data().data;
  } catch (e) {
    console.log('error', e);
  }
};

export const searchRecipes = async search => {
  try {
    console.log('search', search);
    const response = await firestore()
      .collection(RECIPES)
      .where('recipesName', '==', 'Món 1')
      .get();
    console.log('response', response);
    // return response.data().data;
  } catch (e) {
    console.log('error', e);
  }
};
