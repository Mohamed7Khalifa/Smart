import React, { useState, useEffect } from 'react';
import api from '../api/shs-api';
import { Text, Switch, FlatList, View, TouchableOpacity } from 'react-native';
import Colors from '../styles/colors';
import DeviceCard from './DeviceCard';

export default function DevicesList({ roomId, style, ...otherProps }) {
    const [room, setRoom] = useState({ devices: [] });

    useEffect(() => {
        if (roomId === undefined) return;
        api.getRoom(roomId).then(res => {
            if (res.error)
                throw new Error(res.error);
            setRoom(res);
        }).catch(handleError);
    }, [roomId]);
    console.log('room.devices',room.devices);
    return (
        <FlatList
            data={room.devices}
            renderItem={({ item, index, separators }) => (<DeviceCard key={index} {...item}/>)}
            numColumns={2}
            style={{flex: 1, ...style}}
            {...otherProps}
        />)
}

