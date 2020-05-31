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


    createCardapio() {
        var idEmpresa = ""
        let arrayProdutos;

        firebaseApp.database().ref("Comanda").child(this.state.comanda).child("Empresa").once('value', (snapshot) => {
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

    addCarrinho(key, nome, preco, quantidade) {

        firebaseApp.database().ref("Comanda").child(this.state.comanda).child("Carrinho").push()
            .set({ key, nome, preco, quantidade })

        this.closeModel()
        ToastAndroid.show("Item adicionado ao carrinho", ToastAndroid.SHORT)

    }

    closeModel() {
        this.setState({ itemModalVisible: false, quantidade: 1 })
    }

    createCarrinho() {
        var itensCarrinho;
        firebaseApp.database().ref("Comanda").child(this.state.comanda).child("Carrinho").on('value', (snapshot) => {
            itensCarrinho = Array()
            snapshot.forEach(item => {

                var nome = item.child("nome").val()
                var quantidade = item.child("quantidade").val()
                var key = item.key;

                var produto = { key, nome, quantidade }
                itensCarrinho.push(produto)
            })

            if (itensCarrinho[0] != null) {

                this.setState({ listaCarrinho: itensCarrinho })
            }
        })
    }

    changeQuantidade(botao) {
        if (botao == 'minus') {
            if (this.state.quantidade > 1) {
                this.setState({ quantidade: this.state.quantidade - 1 })
            }


        } else {
            this.setState({ quantidade: this.state.quantidade + 1 })

        }
    }

    removeFromCart(key) {
        firebaseApp.database().ref("Comanda").child(this.state.comanda).child("Carrinho").child(key).remove().then(() => {
            ToastAndroid.show("Item removido!", ToastAndroid.LONG)
        })
    }

    addToComanda() {
        firebaseApp.database().ref("Comanda").child(this.state.comanda).child("Carrinho").once('value', (snapshot) => {
            snapshot.forEach((item) => {

                firebaseApp.database().ref("Comanda").child(this.state.comanda).child("Produtos").push().set(item.val());
                firebaseApp.database().ref("Comanda").child(this.state.comanda).child("Carrinho").child(item.key).remove();
            })
        })

        this.setState({ cartModalVisible: false, listaCarrinho: Array() })
        this.props.navigation.navigate("comandaTabs", {screen: "Comanda"})
        ToastAndroid.show("Comanda Atualizada!", ToastAndroid.SHORT)
    }


    state = {
        comandaAberta: false,
        comanda: "none",
        listaProdutosVazia: true,
        listaProdutos: Array(),
        itemModalVisible: false,
        itemSelecionado: "",
        keyItemSelecionado: "",
        precoSelecionado: "",
        cartModalVisible: false,
        listaCarrinho: Array(),
        quantidade: 1

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
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container} >
                <View style={styles.container2}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.itemModalVisible}

                        onRequestClose={() => {
                            this.closeModel()
                        }}>

                        <View style={styles.modalContainer}>

                            <View style={{ flex: 1 }}></View>
                            <View style={styles.viewCard}>

                                <View style={styles.viewSuperior}>

                                    <Text style={[styles.titulo, { textAlign: 'center' }]}>{this.state.itemSelecionado}</Text>
                                </View>

                                <View style={styles.viewCentro}>
                                    <View style={styles.card}>
                                        {this.renderImage(this.state.itemSelecionado, 2)}
                                        <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => { this.changeQuantidade('minus') }}>
                                                <Icon name='minus-circle-outline' size={30} color={Colors.primary} />

                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 25, fontFamily: 'Century Gothic', color: Colors.primary }}>{this.state.quantidade}</Text>
                                            <TouchableOpacity onPress={() => { this.changeQuantidade('plus') }}>
                                                <Icon name='plus-circle-outline' size={30} color={Colors.primary} />

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.viewInferior}>
                                    <View style={styles.viewButtons}>

                                        <TouchableOpacity onPress={() => { this.addCarrinho(this.state.keyItemSelecionado, this.state.itemSelecionado, this.state.precoSelecionado, this.state.quantidade) }} style={[styles.botaoConfirmar, { opacity: this.state.funcao == 0 ? 0.2 : 1 }]}>
                                            <Text style={styles.textBotaoConfirmar}>Adicionar ao carrinho</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.botaoCancelar} onPress={() => { this.closeModel() }}>
                                            <Text style={styles.textBotaoCancelar}>Fechar</Text>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                            </View>


                            <View style={{ flex: 1 }}></View>

                        </View>


                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.cartModalVisible}

                        onRequestClose={() => {
                            this.setState({ cartModalVisible: false })
                        }}>

                        <View style={styles.modalContainer}>

                            <View style={{ flex: 1 }}></View>
                            <View style={styles.viewCard}>

                                <View style={styles.viewSuperior}>

                                    <Text style={[styles.titulo, { textAlign: 'center' }]}>Itens no carrinho</Text>
                                </View>

                                <View style={styles.viewCentro}>
                                    <View style={[styles.card]}>
                                        <FlatList
                                            style={{ width: '100%' }}
                                            data={this.state.listaCarrinho}
                                            contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({ item }) => (

                                                <TouchableOpacity onPress={() => { ToastAndroid.show("Clique e segure para remover o item!", ToastAndroid.SHORT) }}
                                                    onLongPress={() => { this.removeFromCart(item.key) }}>

                                                    <View style={{
                                                        paddingHorizontal: 10, borderBottomWidth: 1, marginBottom: 5, flexDirection: 'row',
                                                        alignItems: 'center', justifyContent: 'space-between', height: 40
                                                    }}>
                                                        <Text style={styles.subTitulo}>{item.nome}</Text>
                                                        <Text style={styles.subTitulo}>{item.quantidade}</Text>
                                                    </View>
                                                </TouchableOpacity>



                                            )} />

                                    </View>
                                </View>

                                <View style={styles.viewInferior}>
                                    <View style={styles.viewButtons}>

                                        <TouchableOpacity onPress={() => { this.addToComanda() }} style={[styles.botaoConfirmar, { opacity: this.state.funcao == 0 ? 0.2 : 1 }]}>
                                            <Text style={styles.textBotaoConfirmar}>Fazer pedido</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.botaoCancelar} onPress={() => { this.setState({ cartModalVisible: false }) }}>
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
                                Cardápio
                            </Text>


                        </View>

                        <View style={{ width: "50%", alignItems: 'flex-end' }}>
                            {this.state.comandaAberta ? <TouchableOpacity onPress={() => { this.setState({ cartModalVisible: true }), this.createCarrinho() }} style={styles.botaoFinalizar}>
                                <Icon name='cart-arrow-right' size={25} color={"#FFF"} />
                                <Text style={styles.textoFinalizar}>
                                    Carrinho
                                </Text>
                            </TouchableOpacity> : <></>}
                        </View>
                    </View>

                    {this.state.comandaAberta ?


                        <View style={[styles.middleContainer, { flex: 9, width: '100%', marginBottom: 0 }]}>


                            <FlatList
                                style={{ width: '100%' }}
                                data={this.state.listaProdutos}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (

                                    <Animated.View style={styles.itemContainer}>
                                        <TouchableOpacity onPress={() => { this.setState({ itemSelecionado: item.nome, keyItemSelecionado: item.key, itemModalVisible: true, precoSelecionado: item.preco }) }} style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={styles.comandaView}>
                                                    
                                                    {this.renderImage(item.nome)}

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


                        <View style={[styles.middleContainer, { borderBottomEndRadius: 20, borderBottomStartRadius: 20 }]}>
                            <Text style={styles.textInfo}>Valide sua comanda antes de adicionar produtos!</Text>


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
