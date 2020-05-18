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

    modalContainer: {
        flex: 1,
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: "100%",


    },

    viewSuperior:{
        width: '100%',
        flex:1,
        justifyContent: "flex-end",
        alignItems: 'center'
    },

    viewCentro:{
        width: '100%',
        flex:2,
        alignItems: 'center',
        justifyContent: 'center'

    },
    viewInferior:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        flex:1,

    },
    viewButtons:{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    viewCard:{
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
    card:{
        width: '70%',
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

    botaoConfirmar:{
        backgroundColor: Colors.green,
        width: '40%',
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
    },

    botaoCancelar:{
        borderWidth: 3,
        borderColor: Colors.red,
        width: '40%',
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


    },

    textBotaoConfirmar:{
        color: Colors.primary,
        fontSize: 18,
        margin: 15,
        fontFamily: 'Century Gothic'
    },

    textBotaoCancelar:{
        color: Colors.red,
        fontSize: 18,
        margin: 15,
        fontFamily: 'Century Gothic'
    },

    titulo:{
        color: Colors.primary,
        fontSize: 30,
        margin: 15,
        fontFamily: 'Century Gothic',
        textAlign: 'center'
    },
    subTitulo:{
        color: Colors.primary,
        fontSize: 22,
        fontFamily: 'Century Gothic',
        textAlign: 'center'
    },
    imageIcon:{
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#FFF',
        
    },

    imageView:{
        width: 100,
        height: 100,
        borderRadius: 100/2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },

    name:{
        color: Colors.primary,
        fontSize: 18,
        fontFamily: 'Century Gothic',
        textAlign: 'center'
    }

})