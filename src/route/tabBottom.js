import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AccountStack } from './accountStack';
import { HomeStack } from './homeStack';
import { AddRecipesScreen } from '../pages/addRecipes';

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
          title: 'Thêm Công Thức',
          tabBarLabel: 'Thêm',
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
          tabBarLabel: 'Tài khoản',
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
