import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection';


export default class Main extends Component {

    componentDidMount() {
        let usersRef = firebaseApp.database().ref("Users");
        usersRef.child(firebaseApp.auth().currentUser.uid).child("incompleteProfile").once("value", (snapshot)=>{
            if(snapshot.val()){
                ToastAndroid.show("Complete seu perfil para utilizar nossos serviços!", ToastAndroid.LONG)
            }
        })
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

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                    <Text>
                        Perfil
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>
                        Sair
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}