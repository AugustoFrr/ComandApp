import React from 'react'
import {Text} from 'react-native'

import Main from './pages/Main/Main'
import Splash from './pages/Splash/Splash'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import EmailVerification from './pages/EmailVerification/EmailVerification'
import Profile from './pages/Profile/Profile'
import Comanda from './pages/Comanda/Comanda'
import Scanner from './pages/Scanner/Scanner'
import ProductMenu from './pages/ProductMenu/ProductMenu'
import MainSearch from './pages/MainSearch/MainSearch'
import MainUserQR from './pages/MainUserQR/MainUserQR'
import Friends from './pages/Friends/Friends'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from './styles/colors'


import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Main" component={mainTabRoutes} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
      <Stack.Screen name="Friends" component={Friends} />
    </Stack.Navigator>
  )
}

function TabRoutes() {
  return (
    <Tab.Navigator backBehavior={"none"}>
      <Tab.Screen name="Comanda" component={Comanda} />
      <Tab.Screen name="ProductMenu" component={ProductMenu} />
    </Tab.Navigator>
  )
}

function mainTabRoutes() {
  return (
    <Tab.Navigator 
      backBehavior={"none"}

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'qrcode-scan' : 'qrcode-scan';
            color = focused ? Colors.red : "#FFF";

          } else if (route.name === 'Buscar') {
            iconName = focused ? 'feature-search' : 'feature-search';
            color = focused ? Colors.green : "#FFF";


          } else if (route.name === 'Perfil') {
            iconName = focused ? 'qrcode' : 'qrcode';
            color = focused ? Colors.blue : "#FFF";

          }


          return <Icon name={iconName} size={size} color={color} />;
        }, 

        tabBarLabel: ({color, focused})=>{
          let labelName;
          

          if (route.name === 'Home') {
            labelName = 'Home'
            color = focused ? Colors.red : "#FFF";

          } else if (route.name === 'Buscar') {
            labelName = 'Buscar';
            color = focused ? Colors.green : "#FFF";


          } else if (route.name === 'Perfil') {
            labelName = 'Perfil';
            color = focused ? Colors.blue : "#FFF";

          }

          return <Text style={{color: color, fontFamily: 'Century Gothic'}}>{labelName}</Text>
        }
        
      })}

      tabBarOptions={{
        activeTintColor: Colors.red,
  
        inactiveTintColor: "#FFF",
        activeBackgroundColor: Colors.primary,
        inactiveBackgroundColor: Colors.primary,
      }}

    >
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Buscar" component={MainSearch} />
      <Tab.Screen name="Perfil" component={MainUserQR} />
    </Tab.Navigator>
  )
}


