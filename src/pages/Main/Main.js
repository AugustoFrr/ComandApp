import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection';


export default class Main extends Component {

    componentDidMount() {
        
    }

    logout() {
        firebaseApp.auth().signOut().then(()=>{
            this.props.navigation.replace("Login")
        })

    }

    render() {
        return (
            <View>
                <Text>MAIN</Text>
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>
                        Sair
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}