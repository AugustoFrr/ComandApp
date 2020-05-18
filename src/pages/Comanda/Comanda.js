import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid, ImageBackground, Dimensions } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import QRCode from 'react-native-qrcode-svg'
import styles from './Styles'
import Colors from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const backgroundImage = require("../../img/background.png")

const comandico = require("../../img/white-comandico.png")


export default class Comanda extends Component {

    componentDidMount() {
        firebaseApp.database().ref("Users").child(firebaseApp.auth().currentUser.uid)
            .child("Comanda").on('value', (snapshot) => {
                this.setState({ comandaAberta: snapshot.val() == "none" ? false : true, comanda: snapshot.val() })
            })
    }

    generateCode() {
        return `${firebaseApp.auth().currentUser.uid}?t${this.state.mesa}`
    }


    state = {
        mesa: this.props.route.params.tableNumber,
        name: this.props.route.params.name,
        comandaAberta: false,
        comanda: ""
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>

                <View style={styles.header}>
                    <View style={{ width: "60%", }}>
                        <Text style={styles.titulo}>
                            {this.state.name}
                        </Text>

                        <Text style={styles.subTitulo}>
                            Mesa: <Text style={{ color: Colors.red, fontWeight: 'bold' }}>{this.state.mesa}</Text>
                        </Text>

                    </View>

                    <View style={{ width: "30%", alignItems: 'flex-end' }}>
                        <TouchableOpacity style={styles.botaoFinalizar}>
                            <Icon name='exit-to-app' size={20} color={Colors.red} />
                            <Text style={styles.textoFinalizar}>
                                Finalizar
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {this.state.comandaAberta ?


                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28 }}>COMANDA ABERTA {this.state.mesa}</Text>
                    </View>

                    :


                    <View style={styles.middleContainer}>
                        <Text style={styles.textInfo}>Apresente este QRCode para um funcionário e inicie sua comanda!</Text>

                        <QRCode value={this.generateCode()} size={Dimensions.get('window').width * 0.5}
                            logo={comandico} logoSize={Dimensions.get('window').width * 0.09}
                            logoBackgroundColor='black' />
                    </View>


                }

                <View style={{ flex: 2, justifyContent: 'flex-end'}}>
                    {this.state.comandaAberta ?

                    <Text></Text>
                    : 
                    <Text style={styles.textFooter}>Esperando validação da Comanda...</Text>
                    
                    }
                </View>




            </ImageBackground>
        )
    }

}
