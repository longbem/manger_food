import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountScreen } from '../pages/account';
import { RegisterScreen } from '../pages/register';

const Stack = createStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="accountScreen"
        component={AccountScreen}
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
    </Stack.Navigator>
  );
}
