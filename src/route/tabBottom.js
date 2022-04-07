import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AccountStack } from './accountStack';
import { HomeStack } from './homeStack';
import { AddRecipesScreen } from '../pages/addRecipes';
import { I18n } from '../utils/languages';

const Tab = createBottomTabNavigator();

export function MyBottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="homeBottom"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="appstore-o"
              size={25}
              color={focused ? '#4195FB' : '#CAD3DD'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="addRecipesScreen"
        super
        component={AddRecipesScreen}
        options={{
          title: I18n.t('recipes.addRecipes'),
          tabBarLabel: I18n.t('stack.add'),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="plussquare"
              size={25}
              color={focused ? '#4195FB' : '#CAD3DD'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="accountBottom"
        component={AccountStack}
        options={{
          headerShown: false,
          tabBarLabel: I18n.t('stack.account'),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={25}
              color={focused ? '#4195FB' : '#CAD3DD'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
