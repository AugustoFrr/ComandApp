import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection'
import mainStyles from '../../MainStyles'
import { TextInputMask } from 'react-native-masked-text'


export default class Profile extends Component {



    componentDidMount() {

        this.getData()


    }

    async getData() {
        let name, phone, cpf, birth;
        let userId = firebaseApp.auth().currentUser.uid
        await firebaseApp.database().ref("Users").child(userId).once("value", (snapshot) => {
            name = snapshot.child("Name").val() ? snapshot.child("Name").val() : ""

            phone = snapshot.child("Phone").val() ? snapshot.child("Phone").val() : ""
            cpf = snapshot.child("CPF").val() ? snapshot.child("CPF").val() : ""
            birth = snapshot.child("Birth").val() ? snapshot.child("Birth").val() : ""
        })

        this.setState({ name, email: firebaseApp.auth().currentUser.email, phone, cpf, birth })
    }

    updateUser() {

        if (this.state.personalButtonText == "Alterar dados pessoais") {
            this.setState({ editableField: true })
            this.setState({ personalButtonText: "Concluir" })
        } else {
            if (this.state.cpf == "" || this.cpfField.isValid()) {
                let userId = firebaseApp.auth().currentUser.uid
                firebaseApp.database().ref("Users").child(userId).update({
                    "Name": this.state.name.trim(),
                    "Phone": this.state.phone.trim(),
                    "CPF": this.state.cpf.trim(),
                    "Birth": this.state.birth.trim(),
                    "IncompleteProfile": (this.state.name == "" || this.state.phone == "" || this.state.cpf == "" || this.state.birth == "") ? true : false
                }).then(() => {
                    this.setState({ personalButtonText: "Alterar dados pessoais" })
                    this.setState({ editableField: false })
                })
            } else {
                ToastAndroid.show("CPF inválido!", ToastAndroid.LONG);
            }
        }
    }

    updateCredentials() {
        if (this.state.buttonText == "Alterar e-mail de cadastro") {

            this.setState({ changeEmail: true })
            this.setState({ buttonText: "Concluir" })
        } else {
            if (!(this.state.newEmail == "" || this.state.password == "")) {
                let user = firebaseApp.auth().currentUser;
                let credential = firebaseApp.auth.EmailAuthProvider.credential(
                    user.email, this.state.password
                )

                user.reauthenticateWithCredential(credential).then(() => {
                    user.verifyBeforeUpdateEmail(this.state.newEmail).then(() => {

                        ToastAndroid.show("Enviamos um e-mail de confirmação para esse endereço, clique no link para validar!", ToastAndroid.LONG)

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
            this.setState({ changeEmail: false })
            this.setState({ buttonText: "Alterar e-mail de cadastro" })
        }
    }

    updatePassword() {
        if (this.state.passwordButtonText == "Alterar Senha") {
            this.setState({ changePassword: true })
            this.setState({ passwordButtonText: "Concluir" })
        } else {
            if (!(this.state.password == "" || this.state.newPassword == "")) {
                let user = firebaseApp.auth().currentUser;

                let credential = firebaseApp.auth.EmailAuthProvider.credential(
                    user.email, this.state.password)

                user.reauthenticateWithCredential(credential).then(() => {
                    user.updatePassword(this.state.newPassword).then(() => {
                        ToastAndroid.show("Senha atualizada com sucesso!", ToastAndroid.LONG);
                        this.setState({ changePassword: false })
                        this.setState({ passwordButtonText: "Alterar Senha" })
                    }).catch((error) => {
                        if (error.code == "auth/weak-password") {
                            ToastAndroid.show("A nova senha deve conter no mínimo 6 caracteres!", ToastAndroid.LONG);
                        } else {
                            ToastAndroid.show("Ocorreu um erro de validação, tente novamente!", ToastAndroid.LONG);
                        }
                    })
                }).catch((error) => {
                    if (error.code == "auth/wrong-password") {
                        ToastAndroid.show("A senha atual está incorreta, tente novamente!", ToastAndroid.LONG);
                    } else {
                        ToastAndroid.show("Ocorreu um erro de validação, tente novamente!", ToastAndroid.LONG);
                    }
                })
            } else {
                this.setState({ changePassword: false })
                this.setState({ passwordButtonText: "Alterar Senha" })
            }
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
        passwordButtonText: "Alterar Senha",
        editableField: false,
        changeEmail: false,
        changePassword: false,
        newEmail: "",
        password: "",
        newPassword: "",
        validCPF: undefined,
    }

    render() {
        return (
            <View>
                <Text>
                    Perfil
                </Text>

                <TextInput style={mainStyles.input} editable={this.state.editableField} value={this.state.name}
                    placeholder="Nome Completo" onChangeText={name => this.setState({ name })} />

                <TextInputMask style={mainStyles.input} type={'cel-phone'} options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
                    editable={this.state.editableField} value={this.state.phone} keyboardType="phone-pad" placeholder="Telefone" onChangeText={phone => this.setState({ phone })} />

                <TextInputMask style={mainStyles.input} type={'cpf'} editable={this.state.editableField} value={this.state.cpf} keyboardType="number-pad"
                    placeholder="CPF (somente números)" ref={(ref) => this.cpfField = ref}
                    onChangeText={cpf => { this.setState({ cpf }) }} />

                <TextInputMask style={mainStyles.input} type={'datetime'} options={{ format: 'DD/MM/YYYY' }} editable={this.state.editableField} value={this.state.birth} keyboardType="number-pad"
                    placeholder="Data de Nascimento (dd/mm/aaaa)" onChangeText={birth => this.setState({ birth })} />

                <TouchableOpacity ref={(ref) => this.updateButton = ref} onPress={() => { this.updateUser() }}>
                    <Text>
                        {this.state.personalButtonText}
                    </Text>
                </TouchableOpacity>

                <Text>E-mail atual:{"\n" + this.state.email}</Text>

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

                {this.state.changePassword ?
                    <View>
                        <TextInput style={mainStyles.input} secureTextEntry={true} placeholder="Senha atual" onChangeText={password => this.setState({ password })} />
                        <TextInput style={mainStyles.input} secureTextEntry={true} placeholder="Nova Senha" onChangeText={newPassword => this.setState({ newPassword })} />
                    </View>
                    :
                    null
                }

                <TouchableOpacity onPress={() => this.updatePassword()}>
                    <Text>
                        {this.state.passwordButtonText}
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }
}