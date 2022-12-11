import { View, Text, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../styles/colors';


export default function SuperButton({ text, color, style, onPress, ...otherProps }) {
    return (<Pressable
        onPress={onPress}
        style={{ alignItems: 'center', padding: 15, borderRadius: 15, backgroundColor: color, ...style }}
        android_ripple={{
            color: Colors.white,
        }}
        {...otherProps}>
        <Text style={{ color: Colors.white, fontWeight: '600', fontSize: 14 }}>{text}</Text>
    </Pressable >)
}