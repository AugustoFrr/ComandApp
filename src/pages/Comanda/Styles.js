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

    header:{
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        padding: 10,

    },

    titulo:{
        fontSize: 20,
        color: Colors.primary,
        fontFamily: 'Century Gothic',

    },

    subTitulo:{
        fontSize: 18,
        color: Colors.primary,
        fontFamily: 'Century Gothic',
    },

    botaoFinalizar:{
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
        
        
    },

    textoFinalizar:{
        color: Colors.primary,
        fontSize: 20,
        fontFamily: 'Century Gothic'
    },

    textInfo:{
        color: Colors.primary,
        fontSize: 20,
        fontFamily: 'Century Gothic',
        textAlign: 'center'
    },

    textFooter:{
        color: Colors.primary,
        marginBottom: 20,
        fontSize: 18,
        fontFamily: 'Century Gothic'
    },

    middleContainer:{
        backgroundColor: '#ffffff',
        width: '80%',
        flex: 6, 
        alignItems: 'center', 
        justifyContent: 'space-evenly',
        borderRadius: 20,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7, 
    }
})