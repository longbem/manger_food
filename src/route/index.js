import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { MyBottomTabs } from './tabBottom';
import { DetailRecipesScreen } from '../pages/detailRecipes';
import { LoginScreen } from '../pages/login';
import { RegisterScreen } from '../pages/register';
import { LanguageScreen } from '../pages/language';
import { CategoryScreen } from '../pages/category';
import { DetailCategoryScreen } from '../pages/detailCategory';
import { SearchScreen } from '../pages/searchProducts';
import { FavouriteRecipesScreen } from '../pages/favouriteRecipes';
import { MyRecipesScreen } from '../pages/myRecipes';
import { MyAccountScreen } from '../pages/myAccount';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="myBottomTabs"
        component={MyBottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detailRecipesScreen"
        component={DetailRecipesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="loginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="registerScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="languageScreen"
        component={LanguageScreen}
        options={{
          title: 'Languages',
        }}
      />
      <Stack.Screen
        name="categoryScreen"
        component={CategoryScreen}
        options={{
          title: 'Thể loại',
        }}
      />
      <Stack.Screen
        name="detailCategoryScreen"
        component={DetailCategoryScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="searchScreen"
        component={SearchScreen}
        options={{
          title: 'Tìm kiếm công thức',
        }}
      />
      <Stack.Screen
        name="FavouriteRecipesScreen"
        component={FavouriteRecipesScreen}
        options={{
          title: 'Yêu thích',
        }}
      />
      <Stack.Screen
        name="myRecipesScreen"
        component={MyRecipesScreen}
        options={{
          title: 'Công thức của tôi',
        }}
      />
      <Stack.Screen
        name="myAccountScreen"
        component={MyAccountScreen}
        options={{
          title: 'Công thức của tôi',
        }}
      />
    </Stack.Navigator>
  );
};

export function AppContainer({ navigation }) {
  return (
    <NavigationContainer>
      <RecoilRoot>
        <NativeBaseProvider>
          <MainStack />
        </NativeBaseProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}
