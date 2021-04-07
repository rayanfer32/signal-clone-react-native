import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from "./components/Text"
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppLoading from 'expo-app-loading';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';


const Stack = createStackNavigator();

const colorPrimary = '#0ca4fb'

const globalScreenOptions = {
  headerStyle: {backgroundColor: colorPrimary },
  headerTitleStyle: { color: 'white'},
  headerTintColor: 'white'
}

export default function App() {
  let [fontsLoaded] = useFonts({
    'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-Regular.otf?v=3.12',
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } 
  else {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

