import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection'
import mainStyles from '../../MainStyles'


export default class Profile extends Component {



    componentDidMount() {

        this.getData()
        

    }

    async getData() {
        let name, email, phone, cpf, birth;
        let userId = firebaseApp.auth().currentUser.uid
        await firebaseApp.database().ref("Users").child(userId).once("value", (snapshot) => {
            name = snapshot.child("Name").val() ? snapshot.child("Name").val() : ""
            email = snapshot.child("Email").val() ? snapshot.child("Email").val() : ""
            phone = snapshot.child("Phone").val() ? snapshot.child("Phone").val() : ""
            cpf = snapshot.child("CPF").val() ? snapshot.child("CPF").val() : ""
            birth = snapshot.child("Birth").val() ? snapshot.child("Birth").val() : ""
        })

        this.setState({ name, email, phone, cpf, birth })
    }

    updateUser() {
        if (this.state.personalButtonText == "Alterar dados pessoais") {
            this.setState({ editableField: true })
            this.setState({ personalButtonText: "Concluir" })
        } else {
            let userId = firebaseApp.auth().currentUser.uid
            firebaseApp.database().ref("Users").child(userId).update({
                "Name": this.state.name,
                "Email": this.state.email,
                "Phone": this.state.phone,
                "CPF": this.state.cpf,
                "Birth": this.state.birth,
                "ImcompleteProfile": false
            }).then(() => {
                this.setState({ personalButtonText: "Alterar dados pessoais" })
                this.setState({ editableField: false })
            })
        }
    }

    updateCredentials() {
        if (this.state.buttonText == "Alterar e-mail de cadastro") {

            this.setState({ changeEmail: true })
            this.setState({ buttonText: "Concluir" })
        } else {
            let user = firebaseApp.auth().currentUser;
            let credential = firebaseApp.auth.EmailAuthProvider.credential(
                user.email, this.state.password
            )

            user.reauthenticateWithCredential(credential).then(() => {
                user.verifyBeforeUpdateEmail(this.state.newEmail).then(() => {

                    ToastAndroid.show("Enviamos um e-mail de confirmação para esse endereço, clique no link para validar!", ToastAndroid.LONG)

                    firebaseApp.auth().signOut().then(()=>{
                        this.props.navigation.replace("Login")
                        this.props.navigation.reset({index: 0, routes: [{name: "Login"}]});
                    })


                    // this.setState({ changeEmail: false })
                    // this.setState({ buttonText: "Alterar e-mail de cadastro" })

                    

                    // let newEmail = this.state.newEmail;
                    // firebaseApp.database().ref("Users").child(user.uid).child("Email").set(newEmail)


                }).catch((error) => {
                    let errorMessage = ""
                    if (error.code == "auth/invalid-email") {
                        errorMessage = "O e-mail inserido não é válido!"

                    } else if (error.code = "auth/email-already-in-use") {
                        errorMessage = "O e-mail inserido já está em uso!"

                    } else {
                        errorMessage = "Parece que temos um problema interno, tente novamente em alguns instantes!"

                    }
                    ToastAndroid.show(errorMessage, ToastAndroid.LONG)
                })

            }).catch((error) => {
                if (error.code == "auth/wrong-password") {
                    ToastAndroid.show("Senha inválida, tente novamente!", ToastAndroid.LONG);
                } else {
                    ToastAndroid.show("Ocorreu um erro de validação, tente novamente!", ToastAndroid.LONG);

                }
            })
        }
    }


    state = {
        name: "",
        email: "",
        phone: "",
        cpf: "",
        birth: "",
        personalButtonText: "Alterar dados pessoais",
        buttonText: "Alterar e-mail de cadastro",
        editableField: false,
        changeEmail: false,
        newEmail: "",
        password: ""
    }

    render() {
        return (
            <View>
                <Text>
                    Perfil
                </Text>


                <TextInput style={mainStyles.input} editable={this.state.editableField} value={this.state.name} placeholder="Nome Completo" onChangeText={name => this.setState({ name })} />
                <TextInput style={mainStyles.input} editable={this.state.editableField} value={this.state.phone} keyboardType="phone-pad" placeholder="Telefone" onChangeText={phone => this.setState({ phone })} />
                <TextInput style={mainStyles.input} editable={this.state.editableField} value={this.state.cpf} keyboardType="number-pad" placeholder="CPF (somente números)" onChangeText={cpf => this.setState({ cpf })} />
                <TextInput style={mainStyles.input} editable={this.state.editableField} value={this.state.birth} keyboardType="number-pad" placeholder="Data de Nascimento (dd/mm/aaaa)" onChangeText={birth => this.setState({ birth })} />
                <TouchableOpacity onPress={() => this.updateUser()}>
                    <Text>
                        {this.state.personalButtonText}
                    </Text>
                </TouchableOpacity>

                <Text>E-mail atual:{"\n" + this.state.email}</Text>
                <Text>{firebaseApp.auth().currentUser.emailVerified ? "Verificado" : "Não verificado"}</Text>

                {this.state.changeEmail ?
                    <View>
                        <TextInput style={mainStyles.input} keyboardType="email-address" placeholder="Novo e-mail" onChangeText={newEmail => this.setState({ newEmail })} />
                        <TextInput style={mainStyles.input} secureTextEntry={true} placeholder="Insira sua senha para confirmação" onChangeText={password => this.setState({ password })} />
                    </View>
                    :
                    null
                }



                <TouchableOpacity onPress={() => this.updateCredentials()}>
                    <Text>
                        {this.state.buttonText}
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }
}