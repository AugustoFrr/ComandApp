import React from 'react'

import Main from './pages/Main/Main'
import Splash from './pages/Splash/Splash'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import EmailVerification from './pages/EmailVerification/EmailVerification'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
        </Stack.Navigator>
    )
}