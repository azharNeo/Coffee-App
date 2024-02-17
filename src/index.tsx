import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NativeStackParamList} from './@types/stack';
import TabNavigator from './navigators/TabNavigator';
import Details from './screens/Details';
import Payment from './screens/Payment';

const Stack = createNativeStackNavigator<NativeStackParamList>();

const RooNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export default RooNavigation;
