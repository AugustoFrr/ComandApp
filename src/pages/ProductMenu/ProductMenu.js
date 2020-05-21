import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid, ImageBackground, Dimensions, FlatList, Animated } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import QRCode from 'react-native-qrcode-svg'
import styles from './Styles'
import Colors from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const backgroundImage = require("../../img/background.png")

const comandico = require("../../img/white-comandico.png")
const macarrao = require("../../img/macarrao.jpg")


export default class ProductMenu extends Component {



    componentDidMount() {
        let ref = firebaseApp.database().ref("Users").child(firebaseApp.auth().currentUser.uid).child("Comanda");
        const listener = ref.on('value', async (snapshot) => {
            var comandaValue = await snapshot.val();
            this.setState({ comandaAberta: comandaValue == "none" ? false : true, comanda: comandaValue })
            if (this.state.comanda != "none") {

                ref.off('value', listener, this)
                this.createCardapio();

            }
        })

    }

    componentWillUnmount() {

    }

    generateCode() {
        return `${firebaseApp.auth().currentUser.uid}?t${this.state.mesa}`
    }

    createCardapio() {
        var idEmpresa = ""
        let arrayProdutos;

        firebaseApp.database().ref("Comandas").child(this.state.comanda).child("Empresa").once('value', (snapshot) => {
            idEmpresa = snapshot.val()
        }).then(() => {
            firebaseApp.database().ref("Empresa").child(idEmpresa).child("Produtos").once("value", (snapshot) => {
                arrayProdutos = Array();
                snapshot.forEach(item => {
                    var key = item.key;
                    var nome = item.child("Nome").val()
                    var preco = item.child("Preço").val()
                    var descricao = item.child("Descrição").val()

                    let produto = { key, nome, preco, descricao }

                    arrayProdutos.push(produto)


                })

                if (arrayProdutos[0] != null) {
                    this.setState({ listaProdutosVazia: false, listaProdutos: arrayProdutos })

                }
            })


        })








    }




    state = {
        comandaAberta: false,
        comanda: "none",
        listaProdutosVazia: true,
        listaProdutos: Array(),

    }




    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>
                <View style={styles.container2}>

                    <View style={styles.header}>
                        <View style={{ width: "50%", }}>
                            <Text style={styles.titulo}>
                                Cardápio
                            </Text>


                        </View>

                        <View style={{ width: "50%", alignItems: 'flex-end' }}>
                            <TouchableOpacity style={styles.botaoFinalizar}>
                                <Icon name='cart-arrow-right' size={25} color={Colors.primary} />
                                <Text style={styles.textoFinalizar}>
                                    Carrinho
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {this.state.comandaAberta ?


                        <View style={[styles.middleContainer, { flex: 9, width: '90%' }]}>


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


                                            </View>

                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={[styles.productQtd, { borderTopWidth: 0, fontSize: 18 }]}>{item.preco}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    </Animated.View>

                                )}
                            />



                        </View>

                        :


                        <View style={[styles.middleContainer, { paddingHorizontal: 20 }]}>
                            <Text style={styles.textInfo}>Valide sua comanda antes de adicionar produtos!</Text>


                        </View>


                    }





                </View>
            </ImageBackground>
        )
    }

}
