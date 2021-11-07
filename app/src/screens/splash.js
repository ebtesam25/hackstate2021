import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet, Image } from 'react-native';
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_100Thin,
  } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import {theme} from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';


const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default function Splash () {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,  
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_100Thin
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/logo.png')}></Image>
        <Text style={{fontFamily:'Poppins_400Regular', color:theme.white, fontSize:25}}>AccessAble</Text>
        <View style={{marginTop:'10%'}}></View>
      <FadeInView style={{}}>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <Image source={require('../assets/s1.png')} style={{width:'50%', resizeMode:'contain'}}></Image>
        <Image source={require('../assets/s2.png')} style={{width:'70%', resizeMode:'contain', marginTop:'15%'}}></Image>
        </View>
      </FadeInView>
      <View style={{marginTop:'25%'}}></View>
      <View style={{alignSelf:'center', width:'100%'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Setup')}><View style={{width:'70%', backgroundColor:theme.white, borderRadius:20, alignContent:'center', padding:'1.5%', alignSelf:'center'}}>
              <Text style={{fontFamily:'Poppins_600SemiBold', fontSize:20, color:theme.black, textAlign:'center', textAlignVertical:'center'}}>Login</Text>
          </View></TouchableOpacity>
          <View style={{marginTop:'5%'}}></View>
          <TouchableOpacity><View style={{width:'70%', backgroundColor:theme.white, borderRadius:20, alignContent:'center', padding:'1.5%', alignSelf:'center'}}>
              <Text style={{fontFamily:'Poppins_600SemiBold', fontSize:20, color:theme.black, textAlign:'center', textAlignVertical:'center'}}>Register</Text>
          </View></TouchableOpacity>
      </View>
      <View style={{marginTop:'45%'}}></View>
    </View>
  )
}
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#2A2E31',
        paddingHorizontal:'7.5%',
        paddingVertical:'10%'
    },
    header: {
        height: '55%',
        width: '100%',
        marginTop: '-5%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});