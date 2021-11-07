
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Circle } from 'react-native-svg';
import { Icon, ThemeContext } from 'react-native-elements'
import { useFonts } from 'expo-font';
import { theme } from '../theme';
import { Poppins_100Thin, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';





export default function Home() {
    const navigation = useNavigation();
    const [name, setName] = useState('Nancy Perkins');
    const [room, setRoom] = useState('');

    const sensorValues = {
        hum
            :
            43,
        temp
            :
            23.5,
        noise
            :
            72,
        pressure
            :
            97873,
        light
            :
            50,
        alt
            :
            291.4,
        dust
            :
            482,
        time
            :
            "1636283212",
        lat
            :
            39.18921085,
        lon
            :
            -96.5768806,
        building
            :
            "collegeofbusiness",
        id
            :
            "1",
        roomid
            :
            "1"
    }

    const sensormenu = [{ 'id': 1, 'name': 'Temperature', 'img': require('../assets/temperature.png'), 'values': [sensorValues.temp, sensorValues.temp], 'unit': '°F' },
    { 'id': 2, 'name': 'Humidity', 'img': require('../assets/humidity.png'), 'values': [sensorValues.hum, sensorValues.hum + 4], 'unit': '%' },
    { 'id': 3, 'name': 'Particles', 'img': require('../assets/particles.png'), 'values': [sensorValues.dust, sensorValues.dust], 'unit': 'μg' },
    { 'id': 4, 'name': 'Light Intensity', 'img': require('../assets/light.png'), 'values': [sensorValues.light, sensorValues.light], 'unit': 'lm' },
    { 'id': 5, 'name': 'Speaker Volume', 'img': require('../assets/speaker.png'), 'values': [sensorValues.noise, sensorValues.noise], 'unit': 'db' },
    { 'id': 7, 'name': 'Vents', 'img': require('../assets/vents.png'), 'values': ['Shut', 'Open'], 'unit': '' }]

    const sensors = sensormenu.map((data) => {
        return (
            <View style={{ backgroundColor: theme.grey, paddingVertical: '5%', borderRadius: 25, paddingHorizontal: '5%', flexDirection: 'row', marginBottom: '5%' }}>
                <Image source={data.img} style={{ width: 50, height: 50 }}></Image>
                <View style={{ marginLeft: '5%' }}>
                    <Text style={{ color: theme.white, fontSize: 20, fontFamily: 'Poppins_400Regular' }}>{data.name}</Text>
                    <View style={{ borderRadius: 30, backgroundColor: theme.black, paddingLeft: '15%', flexDirection: 'row', width: 90 }}>
                        <Text style={{ color: theme.white, textAlignVertical: 'center', marginTop: '2%', fontFamily: 'Poppins_600SemiBold' }}>{data.values[0]}{data.unit}</Text>
                        <View style={{ backgroundColor: theme.white, width: 50, borderRadius: 40, marginLeft: '15%' }}>
                            <Text style={{ color: theme.black, textAlignVertical: 'center', marginTop: '10%', textAlign: 'center', fontFamily: 'Poppins_600SemiBold' }}>{data.values[1]}{data.unit}</Text></View>
                    </View>
                </View>
            </View>
        )
    }
    );



    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontFamily: 'Poppins_500Medium', color: theme.grey, fontSize: 15 }}>Welcome!</Text>
                    <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 20 }}>{name}</Text>
                </View>
                <Image source={{ uri: 'https://p.kindpng.com/picc/s/24-248442_female-user-avatar-woman-profile-member-user-profile.png' }} style={{ borderRadius: 50, height: 50, width: 50, resizeMode: 'cover' }}></Image>
            </View>

            <View style={{ marginTop: '15%' }}></View>

            {room == '' && <TouchableOpacity onPress={() => navigation.navigate('Checkin')}><View style={{ flexDirection: 'row', padding: '5%', borderColor: '#EAEAEA', borderWidth: 1, borderRadius: 25, justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 20 }}>Check-in with QR Code</Text>
                <Image source={require('../assets/checkin.png')} style={{ width: 25, height: 25 }}></Image>
            </View></TouchableOpacity>}

            {room == '' && <TouchableOpacity onPress={() => setRoom('Room 301')}><Text style={{ fontFamily: 'Poppins_400Regular', textAlign: 'center', textDecorationStyle: 'solid', textDecorationLine: 'underline' }}>I've used my RFID Tag</Text></TouchableOpacity>}
            {room != '' && <Text style={{ fontFamily: 'Poppins_600SemiBold' }}>{room}</Text>}
            {room != '' && <ScrollView>
                {sensors}
            </ScrollView>}


        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: theme.white,
        paddingHorizontal: '7.5%',
        paddingVertical: '10%'
    },
    header: {
        height: '55%',
        width: '100%',
        marginTop: '-5%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});