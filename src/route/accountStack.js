import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountScreen } from '../pages/account';

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
    </Stack.Navigator>
  );
}
