import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/colors'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F6F6',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    texto:{
        fontSize: 36
    }, 
    imageStyle: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        
    },

    textStyle: {
        fontSize: 24,
        color: Colors.primary,
        fontFamily: 'Century Gothic',
        
        
        
    },

    viewLogo:{
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        flexDirection: 'row'
    }
})