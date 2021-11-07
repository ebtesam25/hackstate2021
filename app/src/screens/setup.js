
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { theme } from '../theme';
import { Poppins_100Thin, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';





export default function Setup() {
    const navigation = useNavigation();
    const disabilities = [{'img':require('../assets/deaf.png'),'name':'Hearing Disability','key':1},
    {'img':require('../assets/blind.png'),'name':'Visually Imapired','key':2},
    {'img':require('../assets/mobility.png'),'name':'Mobility Imapired','key':3},
    {'img':require('../assets/photophobia.png'),'name':'Photophobia','key':4},
    ]
    const allergies  = [{'img':require('../assets/mold.png'),'name':'Mold','key':1},
    {'img':require('../assets/dust.png'),'name':'Dust','key':2},
    ]
    const conditions  = [{'img':require('../assets/emphysema.png'),'name':'Emphysema','key':1},
    {'img':require('../assets/asthma.png'),'name':'Asthma','key':2},
    {'img':require('../assets/headache.png'),'name':'Migraine','key':3},
    ]

    const [d, setD] = useState([false,false,false,false])
    const [m, setM] = useState([false,false,false])
    const [a, setA] = useState([false,false])


    const disabilitieschoices = disabilities.map((data) => {
        
        return (
            <TouchableOpacity  onPress={()=>_updateSelect(d, data.key-1)}><View style={{height:150, width:150, borderColor:'#EAEAEA', borderWidth:1, alignContent:'center', margin:5, borderRadius:30, padding:'2.5%', backgroundColor:d[data.key-1] ? theme.black : theme.white}}>
                <Image source={data.img} style={{alignSelf:'center',marginTop:'10%', height:50, width:50, resizeMode:'contain'}} tintColor={d[data.key-1] ? theme.white : theme.black}></Image>
                <Text style={{fontFamily:'Poppins_400Regular', fontSize:15, textAlign:'center', width:'70%', alignSelf:'center', lineHeight:18, marginTop:'5%', color:d[data.key-1] ? theme.white : theme.black}}>{data.name}</Text>
                
            </View></TouchableOpacity>
        )}
        );


    const allergiesconditions = allergies.map((data) => {
    
        return (
            <TouchableOpacity onPress={()=>_updateSelect(a, data.key-1)}><View style={{height:150, width:150, borderColor:'#EAEAEA', borderWidth:1, alignContent:'center', margin:5, borderRadius:30, padding:'2.5%', backgroundColor:a[data.key-1] ? theme.black : theme.white }}>
                <Image source={data.img} style={{alignSelf:'center',marginTop:'10%', height:50, width:50, resizeMode:'contain'}}  tintColor={a[data.key-1] ? theme.white : theme.black}></Image>
                <Text style={{fontFamily:'Poppins_400Regular', fontSize:15, textAlign:'center', width:'70%', alignSelf:'center', lineHeight:18, marginTop:'5%', color:a[data.key-1] ? theme.white : theme.black}}>{data.name}</Text>
                
            </View></TouchableOpacity>
        )}
        );


        const conditionslist = conditions.map((data) => {
    
            return (
                <TouchableOpacity onPress={()=>_updateSelect(m, data.key-1)}><View style={{height:150, width:150, borderColor:'#EAEAEA', borderWidth:1, alignContent:'center', margin:5, borderRadius:30, padding:'2.5%', backgroundColor:m[data.key-1] ? theme.black : theme.white}}>
                <Image source={data.img} style={{alignSelf:'center',marginTop:'10%', height:50, width:50, resizeMode:'contain'}} tintColor={m[data.key-1] ? theme.white : theme.black}></Image>
                <Text style={{fontFamily:'Poppins_400Regular', fontSize:15, textAlign:'center', width:'70%', alignSelf:'center', lineHeight:18,  marginTop:'5%', color:m[data.key-1] ? theme.white : theme.black}}>{data.name}</Text>
                
            </View></TouchableOpacity>
            )}
            );

        console.log(m[3])

        const _updateSelect = (x, key) => {

            var i = 0;
            var y = [];
            for(i=0;i<x.length;i++){
                y.push(x[i]);
            }

            y[key] = !y[key];
            console.log(y);
            if(x==a){
                setA(y)
                console.log("a",a);
            }
            else if(x==m){
                setM(y)
                console.log("m",m);
            }
            else if(x==d){
                setD(y)
                console.log("d",d);
            }


        }

        const _completeSetup = () => {
            
        }
  
    
   
    return (
        <SafeAreaView>
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Icon name="arrow-left" type="feather" color={theme.black} style={{textAlignVertical:'center', fontSize:20}}></Icon>
                <Text style={{fontFamily:'Poppins_400Regular', fontSize:20, textAlign:'center', marginLeft:'2.5%', textAlignVertical:'center'}}>Set Up</Text>
            </View> 
        <Text style={{fontFamily:'Poppins_100Thin'}}>Please select any disabilities, medical conditions and allergies you have</Text>
            <View style={{marginTop:'5%'}}>
                <Text style={{fontFamily:'Poppins_500Medium'}}>Disabilities</Text>
                <View>
                    <ScrollView style={{width:340, height:170}} horizontal={true}>
                    {disabilitieschoices}
                    </ScrollView>
                </View>
                <Text style={{fontFamily:'Poppins_500Medium'}}>Medical Conditions</Text>
                <View>
                    <ScrollView style={{width:340, height:170}} contentContainerStyle={{marginRight:100}} horizontal={true}>
                    {conditionslist}
                    </ScrollView>
                </View>
                <Text style={{fontFamily:'Poppins_500Medium'}}>Allergies</Text>
                <View>
                    <ScrollView style={{width:340, height:170}} contentContainerStyle={{marginRight:100}} horizontal={true}>
                    {allergiesconditions}
                    </ScrollView>
                </View>
                
            </View>
            <View style={{marginTop:'15%'}}></View>
            <View>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')}><View style={{width:'70%', backgroundColor:theme.black, borderRadius:30, padding:10, alignSelf:'center'}}>
                    <Text style={{fontFamily:'Poppins_600SemiBold', color:theme.white, textAlign:'center'}}>Complete Setup</Text>
                </View></TouchableOpacity>
            </View>
          
        </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: theme.white,
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