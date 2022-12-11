import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


export default function RoomNavigationItem({ title, active, style, ...otherProps }) {
    return (
        <TouchableWithoutFeedback style={{  ...style }} {...otherProps}>
            <View style={{
                alignItems: 'center',
                paddingHorizontal: 18,
            }}>
                <Text style={{
                    color: active ? Colors.black : Colors.muted,
                    fontWeight: 'bold'
                }}>{title}</Text>
                <FontAwesomeIcon style={{ marginTop: 6 }} icon={faCircle} size={7} color={active ? Colors.black : Colors.transparent}></FontAwesomeIcon>
            </View>
        </TouchableWithoutFeedback>)
}