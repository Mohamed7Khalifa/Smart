import React, { useState, useEffect } from 'react';
import api from '../api/shs-api';
import handleError from '../util/errors';
import { Text, Switch, FlatList, View, TouchableOpacity, Pressable } from 'react-native';
import Colors from '../styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV, faListDots, faMicrochip, faPlug } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import CardIcon from './CardIcon';

export default function RoomCard({ navigation, route ,room, onPress, style, height, ...otherProps }) {
    const [isMenuVisible, setMenuVisibilty] = useState(false);
    const hideMenu = () => setMenuVisibilty(false);
    const showMenu = () => setMenuVisibilty(true);
    return (<Card
        pressable={true}
        color={Colors.light} style={{ flex: 1, margin: 5, ...style }}
        onPress={() => navigation.navigate('RoomScreen', { title: room.title, roomId: room._id })}
        android_ripple={{
            color: Colors.primary,
        }}
        {...otherProps}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <CardIcon icon={faMicrochip} color={Colors.black} backgroundColor={Colors.gray100} />
            {/* <Menu
                visible={isMenuVisible}
                anchor={<TouchableOpacity onPress={showMenu}>
                    <FontAwesomeIcon icon={faEllipsisV} color={Colors.black} size={18} />
                </TouchableOpacity>}
                onRequestClose={hideMenu}
            >
                <MenuItem onPress={() => {
                    hideMenu();
                    navigation.navigate('EditRoomScreen', { title: 'Room ' + room.title, room: room });
                }}>Edit</MenuItem>
                <MenuItem 
                onPress={() => navigation.navigate('QR', { title: 'Add Device to ' + room.title, data: { roomId: room._id,roomTitle:room.title } })}
                >Add Device</MenuItem>
                <MenuDivider />
                <MenuItem onPress={hideMenu}>Delete</MenuItem>
            </Menu> */}
        </View>
        <View style={{ marginVertical: 18 }}>
            <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '600' }}>{room.title}</Text>
            <Text style={{ color: Colors.gray600 }} >{room.devices.length} devices</Text>
        </View>
    </Card>)
}

