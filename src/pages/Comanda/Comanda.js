import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid, ImageBackground, Dimensions, FlatList, Animated } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import QRCode from 'react-native-qrcode-svg'
import styles from './Styles'
import Colors from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const backgroundImage = require("../../img/background.png")

const comandico = require("../../img/comandico.png")
const macarrao = require("../../img/macarrao.jpg")


export default class Comanda extends Component {



    componentDidMount() {
        let ref = firebaseApp.database().ref("Users").child(firebaseApp.auth().currentUser.uid).child("Comanda");
        const listener = ref.on('value', async (snapshot) => {
            var comandaValue = await snapshot.val();
            this.setState({ comandaAberta: comandaValue == "none" ? false : true, comanda: comandaValue })
            if (this.state.comanda != "none") {

                ref.off('value', listener, this)
                this.createComanda();

            }
        })

    }

    componentWillUnmount() {

    }

    generateCode() {
        return `${firebaseApp.auth().currentUser.uid}?t${this.state.mesa}`
    }

    createComanda() {
        let itensComanda;
        firebaseApp.database().ref("Comandas").child(this.state.comanda).child("Produtos").on('value', (snapshot) => {
            itensComanda = Array()
            snapshot.forEach(item => {
                var key = item.key
                var nome = item.child('Nome').val()
                var preco = item.child('Preço').val()
                var quantidade = item.child('Quantidade').val()

                let produto = { key, nome, preco, quantidade }
                itensComanda.push(produto)
            })

            if (itensComanda[0] != null) {
                this.setState({ comandaVazia: false, listaProdutos: itensComanda })
            }

        })


    }




    state = {
        mesa: this.props.route.params.tableNumber,
        name: this.props.route.params.name,
        comandaAberta: false,
        comanda: "none",
        comandaVazia: true,
        listaProdutos: Array(),

    }




    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>
                <View style={styles.container2}>

                    <View style={styles.header}>
                        <View style={{ width: "60%", }}>
                            <Text style={styles.titulo}>
                                {this.state.name}
                            </Text>

                            <Text style={styles.subTitulo}>
                                Mesa: {this.state.mesa}
                            </Text>

                        </View>

                        <View style={{ width: "30%", alignItems: 'flex-end' }}>
                            <TouchableOpacity style={styles.botaoFinalizar}>
                                <Icon name='cash-register' size={25} color={Colors.primary} />
                                <Text style={styles.textoFinalizar}>
                                    Conta
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {this.state.comandaAberta ?


                        <View style={[styles.middleContainer, { flex: 8, width: '90%', marginBottom: 0 }]}>
                            {this.state.comandaVazia ?
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Text style={styles.titulo}>COMANDA ABERTA!</Text>
                                    </View>

                                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', padding: 5 }}>
                                        <View style={{ width: '60%', alignItems: 'flex-end' }}>
                                            <Text style={styles.subTitulo}>Adicione itens acessando o menu cardápio:</Text>

                                        </View>

                                        <View style={{ width: '40%', alignItems: 'center' }}>
                                            <Icon name='arrow-down-thick' size={50} color={Colors.primary} />
                                        </View>
                                    </View>
                                </View>
                                :
                                <FlatList
                                    style={{ width: '100%', paddingVertical: 20 }}
                                    data={this.state.listaProdutos}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (

                                        <Animated.View style={styles.itemContainer}>
                                            <TouchableOpacity style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={styles.comandaView}>
                                                        <Image source={macarrao} style={styles.comandaImage} resizeMethod='resize' />

                                                    </View>
                                                </View>

                                                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={styles.productName}>{item.nome}</Text>

                                                    <Text style={styles.productQtd}>Qtd.: {item.quantidade}</Text>

                                                </View>

                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={[styles.productQtd, {borderTopWidth: 0, fontSize: 18}]}>{item.preco}</Text>
                                                </View>

                                            </TouchableOpacity>
                                        </Animated.View>

                                    )}
                                />


                            }
                        </View>

                        :


                        <View style={styles.middleContainer}>
                            <Text style={styles.textInfo}>Apresente este QRCode para um funcionário e inicie sua comanda!</Text>

                            <QRCode value={this.generateCode()} size={Dimensions.get('window').width * 0.5}
                                logo={comandico} logoSize={Dimensions.get('window').width * 0.09}
                                logoBackgroundColor='black' />
                        </View>


                    }

                    {this.state.comandaAberta ?

                        <Text></Text>
                        :
                        <View style={{ flex: 2, justifyContent: 'flex-end' }}>

                            <Text style={styles.textFooter}>Esperando validação da Comanda...</Text>
                        </View>

                    }



                </View>
            </ImageBackground>
        )
    }

}
