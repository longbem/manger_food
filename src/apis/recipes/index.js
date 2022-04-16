import { request } from '../request';
import firestore from '@react-native-firebase/firestore';

const RECIPES = 'recipes';
const LOVE_RECIPES = 'loveRecipes';

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
    console.log('response getRecipes', response);
    let arrayRecipes = [];
    response.forEach(snapshot => {
      let data = snapshot.data();
      data.data.collectionId = snapshot.id;
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
  console.log('search', search);
  const recipes = await getRecipes();
  console.log('recipes', recipes);
  try {
    // const listRicepes = await getRecipes();
    // const search = listRicepes.map(item => {
    //   console.log('item', item.recipesName);
    //   item.recipesName == search;
    //   if (item.recipesName == search) {
    //     return item;
    //   }
    // });
    // console.log('search', search);
    const resultSearch = [];
    const response = await firestore()
      .collection(RECIPES)
      .orderBy('recipesName', 'asc')
      .startAt(search)
      .endAt(search + '\uf8ff')
      .get();

    console.log('response', response);
    response.forEach(snapshot => {
      console.log('snapshot', snapshot);
      let data = snapshot.data();
      console.log('data', data);
      // data.data.collectionId = snapshot.id;
      // resultSearch.push(data.data);
    });
    console.log('resultSearch', resultSearch);
    // return response.data().data;
  } catch (e) {
    console.log('error', e);
  }
};

export const getMyRecipes = async ({ idUser }) => {
  try {
    const response = await firestore().collection(RECIPES).get();

    let arrayRecipes = [];
    response.forEach(snapshot => {
      let data = snapshot.data();
      console.log('data', data);
      data.data.id = snapshot.id;
      arrayRecipes.push(data.data);
    });
    return arrayRecipes.filter(item => item.userId === idUser);
  } catch (e) {
    console.log('error', e);
  }
};

export const getMyLoveRecipes = async ({ idUser }) => {
  try {
    const response = await firestore().collection(LOVE_RECIPES).get();

    let arrayLoveRecipes = [];
    response.forEach(snapshot => {
      let data = snapshot.data();
      data.collectionId = snapshot.id;
      arrayLoveRecipes.push(data);
    });
    const listRicepesLove = arrayLoveRecipes.filter(
      item => item.userId === idUser,
    );
    const listRicepes = await getRecipes();
    return getMatch(listRicepes, listRicepesLove);
  } catch (e) {
    console.log('error', e);
  }
};

function getMatch(a, b) {
  var matches = [];
  for (var i = 0; i < a.length; i++) {
    for (var e = 0; e < b.length; e++) {
      if (a[i].id === b[e].recipesId) matches.push(a[i]);
    }
  }
  return matches;
}
