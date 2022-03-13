import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

const accountState = atom({
  key: 'ACCOUNT_STATE',
  default: {
    username: 'test1@gmail.com',
    password: '12345678',
    token: null,
  },
});

export const useAccountState = () => {
  return useRecoilState(accountState);
};

export const useAccountStateValue = () => {
  return useRecoilValue(accountState);
};

export const useSetAccountState = () => {
  return useSetRecoilState(accountState);
};