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
        textAlign: 'center'
    },

    botaoFinalizar:{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.green,
        backgroundColor: 'rgba(57, 255, 20, 0.05)',
        borderWidth: 3,
        borderRadius: 6,
        
        
    },

    textoFinalizar:{
        marginLeft: 10,
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
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
    },

    itemContainer:{
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

    comandaView:{
        height: 70, 
        width: 70, 
        borderRadius: 70/2, 
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

    comandaImage:{
        width: 68,
        height: 68,
        borderRadius: 68/2
        

    },

    productName:{
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary,
        fontFamily: 'Century Gothic',
        marginBottom: 5,
        

    },

    productQtd:{
        borderTopWidth: 1,
        paddingTop: 5,
        borderColor: Colors.primary,
        textAlign: 'center',
        fontSize: 15,
        color: Colors.primary,
        fontFamily: 'Century Gothic',

    }
})