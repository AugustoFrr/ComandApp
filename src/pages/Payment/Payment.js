import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid, ImageBackground, Dimensions, FlatList, Animated } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import QRCode from 'react-native-qrcode-svg'
import styles from './Styles'
import Colors from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const backgroundImage = require("../../img/background.png")

const comandico = require("../../img/white-comandico.png")
const paypal = require("../../img/PayPal-Logo.png")
const cartoes = require("../../img/bandeiras_cartoes.png")



export default class Payment extends Component {

    componentDidMount() {
        this.getTotal()
    }

    async getTotal() {
        var total = 0;
        await firebaseApp.database().ref("Comanda").child(this.state.comanda).child("Produtos").once('value', (snapshot) => {
            snapshot.forEach(item => {
                total += parseFloat(item.child("preco").val()) * parseFloat(item.child("quantidade").val());
            })

            total = total.toString().replace(".", ",")
            this.setState({ total })
        })
    }

    state = {
        comanda: this.props.route.params.comanda,
        total: "",
    }

    goToPaymentApproved(){
        this.props.navigation.replace("PaymentFinished")
    }



    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>
                <View style={styles.header}>
                    <Image source={comandico} style={{ width: 70, height: 70 }} />
                    <Text style={styles.textTitulo}>Realizar Pagamento</Text>
                </View>

                <View style={styles.valor}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: "" }}>
                        <Text style={styles.textReais}>R$</Text>
                        <Text style={styles.textValor}>{this.state.total}</Text>
                    </View>

                    <View>
                        <Text style={styles.textInfo}>Este é o valor total de seu consumo, escolha a forma de pagamento abaixo:</Text>
                    </View>
                </View>

                <View style={styles.botoes}>

                    <View style={{ width: '100%', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>{this.goToPaymentApproved()}} style={styles.botaoCartao}>
                            <Icon style={{ paddingRight: 20 }} name="credit-card" size={20} color={"#fff"} />

                            <Text style={styles.textBotao}>Cartão de Crédito</Text>
                        </TouchableOpacity>



                        <View style={{ opacity: 0.5 }} >
                            <Image source={cartoes} style={{ width: 320, height: 39 }} />
                        </View>
                    </View>

                    <View style={{width: '40%', borderTopWidth: 1, borderColor: Colors.primary}}>

                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 20, width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>{this.goToPaymentApproved()}} style={[styles.botaoCartao, {backgroundColor: '#fbc439'}]}>

                            <Image source={paypal} style={{ width: 130, height: 30 }} />

                        </TouchableOpacity>

                    </View>


                </View>

                <View style={styles.rodape}>
                    <TouchableOpacity style={styles.rodapeButton}>
                        <Text style={styles.rodapeText}>Voltar</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }


}