import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../styles/colors';

const DAYS = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]
const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export default function UserInfo({ name, ...otherProps }) {
    let time = new Date();
    return (<View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexGrow: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hi, {name}</Text>
            <Text style={{ fontSize: 12, color: Colors.muted }}>{DAYS[time.getDay()]}, {time.getDate()} {MONTHS[time.getMonth()]}</Text>
        </View>
        <Image
            style={{ flexShrink: 0, borderRadius: 1000, width: 42, height: 42, resizeMode: 'contain' }}
            source={require('../assets/images/avatar-placeholder.png')}
        />
        <Image
        ></Image>
    </View>)
}