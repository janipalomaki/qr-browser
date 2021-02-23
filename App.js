import React from 'react';

// Omat komponentit
import Koti from "./src/components/Koti";
import Koodinlukija from "./src/components/Koodinlukija";
import Automaattipaikannin from './src/components/Automaattipaikannin';


// React Native stack navigator
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Koti">
        <Stack.Screen name="Koti" component={Koti} />
        <Stack.Screen name="Koodinlukija" component={Koodinlukija} />
        <Stack.Screen name="Automaattipaikannin" component={Automaattipaikannin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}