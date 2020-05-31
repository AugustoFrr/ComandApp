import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/colors'


export default styles = StyleSheet.create({


    container: {
        backgroundColor: '#F6F6F6',
        flex: 1,
        width: "100%",
        alignItems: 'center',
        height: Dimensions.get('window').height

    },
    container2: {
        backgroundColor: 'rgba(46, 47, 49,0.05)',
        flex: 1,
        width: "100%",
        alignItems: 'center',
        height: Dimensions.get('window').height

    },

    header: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: Colors.primary,

    },

    titulo: {
        fontSize: 24,
        color: Colors.primary,
        fontFamily: 'Century Gothic',

    },

    subTitulo: {
        fontSize: 18,
        color: Colors.primary,
        fontFamily: 'Century Gothic',
        textAlign: 'center'
    },

    botaoFinalizar: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.blue,
        backgroundColor: 'rgba(0, 204, 255, 0.05)',
        borderWidth: 3,
        borderRadius: 6,


    },

    textoFinalizar: {
        marginLeft: 10,
        color: "#FFF",
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Century Gothic'
    },

    textInfo: {
        color: Colors.primary,
        fontSize: 20,
        fontFamily: 'Century Gothic',
        textAlign: 'center'
    },

    textFooter: {
        color: Colors.primary,
        marginBottom: 20,
        fontSize: 18,
        fontFamily: 'Century Gothic'
    },

    middleContainer: {
        backgroundColor: '#ffffff',
        width: '80%',
        flex: 6,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        margin: -25,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        padding: 15

    },

    itemContainer: {
        width: '90%',
        height: 90,
        alignSelf: 'center',
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        padding: 10
    },

    comandaView: {
        height: 70,
        width: 70,
        borderRadius: 70 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        padding: 10
    },

    comandaImage: {
        width: 68,
        height: 68,
        borderRadius: 68 / 2


    },

    comandaImage2: {
        width: 130,
        height: 130,
        borderRadius: 130 / 2


    },

    productName: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary,
        fontFamily: 'Century Gothic',
        marginBottom: 5,


    },

    productQtd: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderColor: Colors.primary,
        textAlign: 'center',
        fontSize: 15,
        color: Colors.primary,
        fontFamily: 'Century Gothic',

    },


    modalContainer: {
        flex: 1,
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: "100%",


    },

    viewSuperior: {
        width: '100%',
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    },

    viewCentro: {
        width: '100%',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'

    },
    viewInferior: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        flex: 2,

    },
    viewButtons: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    viewCard: {
        flex: 9,
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: "90%",
        backgroundColor: '#f6f6f6',
        borderRadius: 20,
        borderRadius: 15,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,

    },
    card: {
        width: '80%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        borderRadius: 15,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,

    },

    botaoConfirmar: {
        backgroundColor: Colors.blue,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        margin: 5
    },

    botaoCancelar: {
        borderWidth: 3,
        borderColor: Colors.red,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        margin: 5



    },

    textBotaoConfirmar: {
        color: Colors.primary,
        fontSize: 19,
        margin: 15,
        fontFamily: 'Century Gothic'
    },

    textBotaoCancelar: {
        color: Colors.red,
        fontSize: 18,
        margin: 15,
        fontFamily: 'Century Gothic'
    },
})