import React from 'react';
import Routes from './src/Routes';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
console.disableYellowBox = true
export default function App() {
  return (

    <NavigationContainer>
      <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
      <Routes />
    </NavigationContainer>
  )
}