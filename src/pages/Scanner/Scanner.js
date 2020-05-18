import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid, ImageBackground, Dimensions } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner'
const backgroundImage = require("../../img/background-dark.png")
const comandico = require("../../img/comandico.png")
const comandicoSad = require("../../img/comandico-sad.png")
import Colors from '../../styles/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './Styles'
import firebaseApp from '../../FirebaseConnection'



export default class Scanner extends Component {

    state = {
        modalVisible: false,
        titulo: "Adicionar Amigo",
        subTitulo: "Você está prestes a adicionar:",
        name: '',
        icon: comandicoSad,
        exibirNome: true,
        funcao: 0,
        mesaParam: "",
        nameParam: ""

    }



    setModalVisible(visible) {
        this.setState({ modalVisible: visible });


    }

    reativar = () => {
        this.scanner.reactivate()
        this.setModalVisible(false)

    }

    encaminhar = () => {
        this.setModalVisible(false)
        this.props.navigation.replace("comandaTabs", { screen: "Comanda", params: { name: this.state.nameParam, tableNumber: this.state.mesaParam } })

    }

    async getCompanyData(id) {

        var child = id.substring(0, id.indexOf("?"));
        var table = id.substring(id.indexOf("?") + 2);
        var name = ""
        await firebaseApp.database().ref("Empresa").child(child).child("Dados").once('value', (snapshot) => {
            name = snapshot.child("NomeFantasia").val() ? snapshot.child("NomeFantasia").val() : ""
        }).then(() => { this.setState({ name: `${name} - Mesa: ${table}`, mesaParam: table, nameParam: name }) })

    }



    onRead = (codigo) => {
        let qrCode;

        try {
            qrCode = JSON.parse(codigo)
        } catch (exception) {
            qrCode.comandApp = "0"
        }

        switch (qrCode.comandApp) {
            case "1":
                var name = 'Augusto Ferreira';
                this.setState({ titulo: 'Adicionar Amigo', subTitulo: 'Enviar convite de amizade para:', name, exibirNome: true, funcao: 1 })
                break;

            case "2":

                this.getCompanyData(qrCode.link)


                this.setState({ titulo: 'Entrar', subTitulo: 'Você está prestes a entrar em:', exibirNome: true, funcao: 2 })
                break;

            case "3":
                this.setState({ titulo: 'Oops', subTitulo: 'Você não pode escanear a comanda de alguém!', name, exibirNome: false, funcao: 0 })
                break;
            case "0":
                this.setState({ titulo: 'Oops', subTitulo: 'O código que você escaneou não é nosso!', name, exibirNome: false, funcao: 0 })
                break;
        }

        this.setModalVisible(true)
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}

                    onRequestClose={() => {

                    }}>

                    <View style={styles.modalContainer}>

                        <View style={{ flex: 1 }}></View>
                        <View style={styles.viewCard}>

                            <View style={styles.viewSuperior}>

                                <Text style={styles.titulo}>{this.state.titulo}</Text>
                                <Text style={styles.subTitulo}>{this.state.subTitulo}</Text>
                            </View>

                            <View style={styles.viewCentro}>
                                <View style={styles.card}>
                                    <View style={styles.imageView}>
                                        <Image source={this.state.exibirNome ? comandico : comandicoSad} style={styles.imageIcon} />

                                    </View>
                                    {this.state.exibirNome ?
                                        <Text style={styles.name}>{this.state.name}</Text> :
                                        <></>}
                                </View>
                            </View>

                            <View style={styles.viewInferior}>
                                <View style={styles.viewButtons}>
                                    <TouchableOpacity style={styles.botaoCancelar} onPress={() => { this.reativar() }}>
                                        <Text style={styles.textBotaoCancelar}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { this.encaminhar() }} style={[styles.botaoConfirmar, { opacity: this.state.funcao == 0 ? 0.2 : 1 }]}>
                                        <Text style={styles.textBotaoConfirmar}>Confirmar</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        <View style={{ flex: 1 }}></View>

                    </View>


                </Modal>



                <QRCodeScanner
                    ref={(node) => { this.scanner = node }}
                    onRead={(codigo) => { this.onRead(codigo.data) }}
                    permissionDialogTitle="Abrir Câmera"
                    permissionDialogMessage="Você precisa nos dar permissão para usar a câmera do seu dispositivo."
                    buttonPositive="Permitir"
                    checkAndroid6Permissions={true}
                    showMarker={true}
                    fadeIn={true}
                />





            </ImageBackground>
        )
    }

}
