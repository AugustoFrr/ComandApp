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
const trivial = require("../../img/trivial.png")
const suco = require("../../img/suco.png")
const strogo = require("../../img/strogo.png")
const almondegas = require("../../img/almondegas.jpg")



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

        firebaseApp.database().ref("Comanda").child(this.state.comanda).child("Produtos").on('value', (snapshot) => {
            itensComanda = Array()
            snapshot.forEach(item => {

                var key = item.key
                var nome = item.child('nome').val()
                var preco = item.child('preco').val()
                var quantidade = item.child('quantidade').val()


                let produto = { key, nome, preco, quantidade }
                itensComanda.push(produto)
            })




            if (itensComanda[0] != null) {
                this.setState({ comandaVazia: false, listaProdutos: itensComanda })
            } else {

                this.setState({ comandaVazia: true, listaProdutos: Array() })
            }

        })


    }


    createConta() {
        var idComanda = this.state.comanda
        const comanda = {
            comandApp: '3',
            idComanda
        }

        return JSON.stringify(comanda);

    }

    goToPayment() {
        this.setState({ modalVisible: false })
        this.props.navigation.navigate("Payment", {comanda: this.state.comanda})
    }




    state = {
        mesa: this.props.route.params.tableNumber,
        name: this.props.route.params.name,
        comandaAberta: false,
        comanda: "none",
        comandaVazia: true,
        listaProdutos: Array(),
        modalVisible: false,
    }

    renderImage(name, number = 1){
        var image;
        if(name == "Macarrão Bolonhesa"){
            image = macarrao;
        } else if (name == "Trivial Paulista") {
            image = trivial;
        } else if (name == "Strogonoff de Frango"){
            image = strogo;
        } else if (name == "Almondegas de Carne"){
            image = almondegas;
        } else if (name == "Suco de Laranja"){
            image = suco;
        }

        return <Image source={image} style={number == 1 ? styles.comandaImage : styles.comandaImage2} resizeMethod='resize' />
    }




    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>
                <View style={styles.container2}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}

                        onRequestClose={() => {
                            this.setState({ modalVisible: false })
                        }}>

                        <View style={styles.modalContainer}>

                            <View style={{ flex: 1 }}></View>
                            <View style={styles.viewCard}>

                                <View style={styles.viewSuperior}>

                                    <Text style={[styles.titulo, { textAlign: 'center' }]}>Apresente este QRCode a um funcionário ou pague pelo app!</Text>
                                </View>

                                <View style={styles.viewCentro}>
                                    <View style={styles.card}>
                                        <QRCode value={this.createConta()} size={Dimensions.get('window').width * 0.5}
                                            logo={comandico} logoSize={Dimensions.get('window').width * 0.09}
                                            logoBackgroundColor='black' />

                                    </View>
                                </View>

                                <View style={styles.viewInferior}>
                                    <View style={styles.viewButtons}>

                                        <TouchableOpacity onPress={() => { this.goToPayment() }} style={[styles.botaoConfirmar, { opacity: this.state.funcao == 0 ? 0.2 : 1 }]}>
                                            <Text style={styles.textBotaoConfirmar}>Pagar no App</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.botaoCancelar} onPress={() => { this.setState({ modalVisible: false }) }}>
                                            <Text style={styles.textBotaoCancelar}>Fechar</Text>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                            </View>


                            <View style={{ flex: 1 }}></View>

                        </View>


                    </Modal>

                    <View style={styles.header}>
                        <View style={{ width: "50%", }}>
                            <Text style={[styles.titulo, { color: "#FFF" }]}>
                                {this.state.name}
                            </Text>

                            <Text style={[styles.subTitulo, { alignSelf: 'flex-start', color: "#FFF" }]}>
                                Mesa: {this.state.mesa}
                            </Text>

                        </View>

                        <View style={{ width: "30%", alignItems: 'flex-end' }}>
                            {this.state.comandaAberta ? <TouchableOpacity onPress={() => { this.setState({ modalVisible: !this.state.modalVisible }) }} style={styles.botaoFinalizar}>
                                <Icon name='cash-register' size={25} color={"#FFF"} />
                                <Text style={styles.textoFinalizar}>
                                    Conta
                                </Text>
                            </TouchableOpacity> :
                                <></>}
                        </View>
                    </View>

                    {this.state.comandaAberta ?


                        <View style={[styles.middleContainer, { flex: 9, width: '100%', marginBottom: 0 }]}>
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
                                    style={{ width: '100%' }}
                                    data={this.state.listaProdutos}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (

                                        <Animated.View style={styles.itemContainer}>
                                            <TouchableOpacity style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={styles.comandaView}>
                                                        {this.renderImage(item.nome)}

                                                    </View>
                                                </View>

                                                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={styles.productName}>{item.nome}</Text>

                                                    <Text style={styles.productQtd}>Qtd.: {item.quantidade}</Text>

                                                </View>

                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={[styles.productQtd, { borderTopWidth: 0, fontSize: 18 }]}>{item.preco}</Text>
                                                </View>

                                            </TouchableOpacity>
                                        </Animated.View>

                                    )}
                                />


                            }
                        </View>

                        :


                        <View style={[styles.middleContainer, { borderBottomEndRadius: 20, borderBottomStartRadius: 20 }]}>
                            <Text style={styles.textInfo}>Apresente este QRCode para um funcionário e inicie sua comanda!</Text>

                            <QRCode value={this.generateCode()} size={Dimensions.get('window').width * 0.5}
                                logo={comandico} logoSize={Dimensions.get('window').width * 0.09}
                                logoBackgroundColor='black' />
                        </View>


                    }

                    {this.state.comandaAberta ?

                        <></>
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
