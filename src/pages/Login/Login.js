import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, Keyboard, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import styles from './Styles'
import mainStyles from '../../MainStyles'
import firebaseApp from '../../FirebaseConnection'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
const backgroundImage = require("../../img/background.png")
const comandico = require("../../img/comandico.png")
import Colors from '../../styles/colors'

export default class Login extends Component {

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    keyboardDidShow = () => {
        this.setState({ showHeader: false })
    }

    keyboardDidHide = () => { this.setState({ showHeader: true }) }



    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

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
        senha: "",
        showHeader: true
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>

                {this.state.showHeader ?
                    <View style={{ flex: 3, width: "90%" }}>

                        <View style={{ flex: 2, alignItems: "center", justifyContent: "center",  marginTop: 20 }}>

                            <Image source={comandico} style={{ width: 100, height: 70 }} />
                            <Text style={{ color: Colors.OutText, fontSize: 20, fontFamily: "Century Gothic" }}>ComandApp</Text>

                        </View>

                        <View style-={{ flex: 1 }}>

                            <Text style={styles.titulo}>
                                Olá!
                            </Text>

                            <Text style={styles.subTitulo}>
                                Faça login e aproveite nossos serviços
                            </Text>
                        </View>





                    </View> :

                    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
                        <Text style={{ color: Colors.OutText, fontSize: 20, fontFamily: "Century Gothic" }}>ComandApp</Text>
                    </View>}



                <View style={{ flex: this.state.showHeader ? 3 : 2, width: "90%", justifyContent: "flex-start" }}>

                    <View style={styles.viewInput}>
                        <Icon style={styles.iconInput} name="envelope" size={20} color={Colors.primary} />
                        <TextInput style={styles.input} keyboardType="email-address" placeholder="E-mail" onChangeText={email => this.setState({ email })} />

                    </View>

                    <View style={styles.viewInput}>
                        <Icon style={styles.iconInput} name="lock" size={20} color={Colors.primary} />
                        <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" onChangeText={senha => this.setState({ senha })} />

                    </View>


                    <TouchableOpacity onPress={() => this.resetPassword()}>
                        <Text style={styles.passwordForgotText}>
                            Esqueceu sua senha?
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: this.state.showHeader ? 1 : 2, width: "90%", alignItems: "center", justifyContent: "center"}}>
                    <TouchableOpacity style={styles.btnEntrar} onPress={() => this.login()}>
                        <Text style={styles.btnEntrarText}>
                            Entrar
                        </Text>
                    </TouchableOpacity>




                </View>

                <View style={{ flex: this.state.showHeader ? 1 : 4, width: "90%", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Register") }}>
                        <Text style={styles.registerText}>
                            Não possui uma conta? Cadastre-se aqui!
                        </Text>
                    </TouchableOpacity>
                </View>


            </ImageBackground>



        )
    }
}