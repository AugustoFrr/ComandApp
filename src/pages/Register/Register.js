import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection'


export default class Register extends Component {
  

    register() {
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password.trim()).then(() => {
            firebaseApp.auth().currentUser.sendEmailVerification();
            firebaseApp.database().ref("Users").child(firebaseApp.auth().currentUser.uid).child("Name").set((this.state.name).trim());
            this.props.navigation.replace("EmailVerification")
            this.props.navigation.reset({index: 0, routes: [{name: "EmailVerification"}]});

        }).catch((error) => {
            let errorMessage = "";
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "O e-mail inserido já está em uso!"
                    break;
                case "auth/invalid-email":
                    errorMessage = "O e-mail inserido não é válido!"
                    break;
                case "auth/operation-not-allowed":
                    errorMessage = "Ocorreu um erro interno, tente novamente em alguns instantes!"
                    break;
                case "auth/weak-password":
                    errorMessage = "A senha deve conter no mínimo 6 caracteres!"
                    break;
                default:
                    errorMessage = "Parece que temos um problema interno, tente novamente em alguns instantes!"
            }

            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        })
    }

    state = {
        name: "",
        email: "",
        password: ""
    }

    render() {
        return (
            <View style={mainStyles.container}>
                <TextInput style={mainStyles.input} placeholder="Nome Completo" onChangeText={name => this.setState({ name })} />
                <TextInput style={mainStyles.input} keyboardType="email-address" placeholder="E-mail" onChangeText={email => this.setState({ email })} />
                <TextInput style={mainStyles.input} secureTextEntry={true} placeholder="Senha" onChangeText={password => this.setState({ password })} />
                <TouchableOpacity onPress={() => this.register()}>
                    <Text>
                        Cadastrar
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}