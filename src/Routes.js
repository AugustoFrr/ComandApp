import React from 'react'

import Main from './pages/Main/Main'
import Splash from './pages/Splash/Splash'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import EmailVerification from './pages/EmailVerification/EmailVerification'
import Profile from './pages/Profile/Profile'
import Comanda from './pages/Comanda/Comanda'
import Scanner from './pages/Scanner/Scanner'
import ProductMenu from './pages/ProductMenu/ProductMenu'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Scanner" component={Scanner} />
            <Stack.Screen name="TabRoutes" component={TabRoutes} />            
        </Stack.Navigator>
    )
}

function TabRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Comanda" component={Comanda} />
            <Tab.Screen name="ProductMenu" component={ProductMenu} />
        </Tab.Navigator>
    )
}


