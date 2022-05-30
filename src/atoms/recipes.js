import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

const recipeState = atom({
  key: 'RECIPE_STATE',
  default: {
    image: '',
    fileName: '',
    recipesName: '',
    category: '',
    difficulty: '',
    cuisine: '',
    ingredients: '',
    steps: '',
    avatar: '',
    userId: '',
    userName: '',
    createAt: new Date(),
    updateAt: '',
    comment: [],
  },
});

export const useRecipeState = () => {
  return useRecoilState(recipeState);
};

export const useRecipeStateValue = () => {
  return useRecoilValue(recipeState);
};

export const useSetRecipeState = () => {
  return useSetRecoilState(recipeState);
};
