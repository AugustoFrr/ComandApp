import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, Modal, TextInput, ToastAndroid } from 'react-native';
import styles from './Styles'
import mainStyles from '../../MainStyles'
import firebaseApp from '../../FirebaseConnection'


export default class Login extends Component {

    login() {
        firebaseApp.auth().setPersistence(firebaseApp.auth.Auth.Persistence.LOCAL).then(() => {
            return firebaseApp.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.senha.trim()).then(() => {
                if (firebaseApp.auth().currentUser.emailVerified) {
                    this.props.navigation.replace("Main")
                } else {
                    this.props.navigation.replace("EmailVerification")
                }
            })
        }).catch((error) => {
            let errorMessage = "";
            switch (error.code) {
                case "auth/user-disabled":
                    errorMessage = "Este usuário está desativado!"
                    break;
                case "auth/invalid-email":
                    errorMessage = "O e-mail inserido não é válido!"
                    break;
                case "auth/user-not-found":
                    errorMessage = "Não existe uma conta associada a este e-mail!"
                    break;
                case "auth/wrong-password":
                    errorMessage = "Senha incorreta!"
                    break;
                default:
                    errorMessage = "Parece que temos um problema interno, tente novamente em alguns instantes!"
            }

            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        })
    }

    resetPassword() {
        firebaseApp.auth().sendPasswordResetEmail(this.state.email).then(() => {
            ToastAndroid.show("E-mail de recuperação enviado", ToastAndroid.LONG);
        }).catch((error) => {
            if (error.code == "auth/invalid-email") {
                ToastAndroid.show("E-mail inválido", ToastAndroid.LONG);

            } else if (error.code == "auth/user-not-found") {
                ToastAndroid.show("E-mail de recuperação enviado", ToastAndroid.LONG);

            } else {
                ToastAndroid.show("Parece que temos um problema interno, tente novamente em alguns instantes!", ToastAndroid.LONG);
            }
        })
    }

    state = {
        email: "",
        senha: ""
    }

    render() {
        return (
            <View style={mainStyles.container}>
                <TextInput style={mainStyles.input} keyboardType="email-address" placeholder="E-mail" onChangeText={email => this.setState({ email })} />
                <TextInput style={mainStyles.input} secureTextEntry={true} placeholder="Senha" onChangeText={senha => this.setState({ senha })} />
                <TouchableOpacity onPress={() => this.login()}>
                    <Text>
                        Entrar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.resetPassword()}>
                    <Text>
                        Esqueceu sua senha?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("Register")
                }}>
                    <Text>
                        Não possui uma conta? Cadastre-se aqui!
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}