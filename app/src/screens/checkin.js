import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';





export default function Checkin() {
    const navigation = useNavigation();
  
    
   
    return (
        <View style={styles.container}>
           
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: '#2A2E31'
    },
    header: {
        height: '55%',
        width: '100%',
        marginTop: '-5%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});