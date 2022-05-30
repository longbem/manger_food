import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const RECIPES = 'recipes';
const LOVE_RECIPES = 'loveRecipes';

export const postRecipes = async data => {
  if (Object.keys(data.image).length == 0)
    return alert('Please Select any File');

  const task = storage()
    .ref(data.fileName)
    .putFile(data.image.replace('file://', ''));

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
          data.image = url;
          console.log('data', data);
          firestore()
            .collection(RECIPES)
            .add(data)
            .then(() => {
              return {
                error: undefined,
                message: 'upload success',
                status: 200,
              };
            })
            .catch(() => {
              return {
                error: 'error upload',
                message: 'upload error',
                status: 400,
              };
            });
        }
      })
      .catch(err => {
        console.log('err upload: ', err);
        return {
          error: 'error upload',
          message: 'upload error',
          status: 400,
        };
      });
  } catch (e) {
    console.log('e upload image', e);
  }
};

export const getUrlImage = async url => {
  let _url = '';
  _url = await storage()
    .ref('/' + url)
    .getDownloadURL();

  return _url;
};

export const getRecipes = async () => {
  try {
    const response = await firestore().collection(RECIPES).get();
    console.log('response getRecipes', response);
    let arrayRecipes = [];
    response.forEach(snapshot => {
      let data = snapshot.data();
      data.collectionId = snapshot.id;
      arrayRecipes.push(data);
    });
    return arrayRecipes;
  } catch (e) {
    console.log('error', e);
  }
};

export const updateRecipe = async data => {
  try {
    firestore()
      .collection(RECIPES)
      .doc(data.collectionId)
      .update(data.data)
      .then(() => {
        console.log('update success');
        return {
          status: 200,
          message: 'update success',
          error: undefined,
        };
      })
      .catch(() => {
        console.log('err comment: ');
        return {
          status: 201,
          message: 'update error',
          error: true,
        };
      });
  } catch (e) {
    console.log('err update recipe', e);
  }
};

export const deleteRecipes = async ({ id }) => {
  try {
    const response = await firestore().collection(RECIPES).doc(id).delete();
    console.log('response', response);
    // return response.data().data;
  } catch (e) {
    console.log('error', e);
  }
  return;
};

export const detailRecipes = async ({ id }) => {
  try {
    const response = await firestore().collection(RECIPES).doc(id).get();
    // let listUser = [];
    // response.forEach(snapshot => {
    //   let data = snapshot.data();
    //   console.log('data', data);
    //   data.collectionId = snapshot.id;
    //   listUser.push(data);
    // });
    return response.data();
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
      data.collectionId = snapshot.id;
      arrayRecipes.push(data);
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
    const listRecipesLove = arrayLoveRecipes.filter(
      item => item.userId === idUser,
    );
    const listRecipes = await getRecipes();
    return getMatch(listRecipes, listRecipesLove);
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

export const postLove = async data => {
  try {
    const response = await firestore().collection(LOVE_RECIPES).add(data);
    console.log('response', response);
  } catch (e) {
    console.log('error', e);
  }
};

export const commentRecipe = async data => {
  try {
    firestore()
      .collection(RECIPES)
      .doc(data.collectionId)
      .update({
        comment: data.data.comment,
      })
      .then(() => {
        console.log('comment success');
      })
      .catch(err => {
        console.log('err comment: ', err);
      });
  } catch (e) {
    console.log('err commentRecipe:', e);
  }
};
