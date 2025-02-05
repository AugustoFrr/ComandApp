import React from 'react';
import Routes from './src/Routes';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      <Routes />
    </NavigationContainer>
  )
}