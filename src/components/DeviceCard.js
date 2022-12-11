import React, { useState, useEffect } from 'react';
import api from '../api/shs-api';
import handleError from '../util/errors';
import { Text, Switch, FlatList, View, TouchableOpacity, ToastAndroid } from 'react-native';
import Colors from '../styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV, faExclamationTriangle, faFan, faListDots, faMicrochip, faPlug, faToggleOff, faBattery, faBatteryThreeQuarters, faBatteryCar, faTableCells, faTemperature0 } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import CardIcon from './CardIcon';
import DeviceProperties from './DeviceProperties';

export default function DeviceCard({ invalidate, roomId, id, style, givenName, modelNumber, baseAddress, ...otherProps }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)
    const [info, setInfo] = useState({});
    const [isMenuVisible, setMenuVisibilty] = useState(false);
    const hideMenu = () => setMenuVisibilty(false);
    const showMenu = () => setMenuVisibilty(true);
    const iconType = () => {
        if (info.icon === "fontawesome.faToggleOff") {
            return faToggleOff;
        }
        else if (info.icon === "fontawesome.faMicrochip") {
            return faMicrochip;
        }
        else {
            return faExclamationTriangle;
        }
    };

    useEffect(() => {
        api.getModelInfo(modelNumber).then(res => {
            if (res.error)
                throw new Error(res);
            setInfo(res);
        }).catch(res => {
            if (res.error === "NOT_FOUND") {
                ToastAndroid.showWithGravityAndOffset('The room is not exist no more', ToastAndroid.LONG, ToastAndroid.BOTTOM, 100, 100);
            }
            else if (res.error === 'REQUEST_TIMEOUT') {
                ToastAndroid.showWithGravityAndOffset('The server is down', ToastAndroid.LONG, ToastAndroid.BOTTOM, 100, 100);
            }
            else if (res.error === 'NEXT_HOP_UNREACHABLE') {
                ToastAndroid.showWithGravityAndOffset('The server is down', ToastAndroid.LONG, ToastAndroid.BOTTOM, 100, 100);
            }
        })
    }, [modelNumber]);
    return (<Card color={Colors.light} style={{ flex: 1, margin: 5, ...style }} {...otherProps}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <CardIcon icon={iconType()} color={Colors.black} backgroundColor={Colors.gray100} />
            {/* <Menu
                visible={isMenuVisible}
                anchor={<TouchableOpacity onPress={showMenu}>
                    <FontAwesomeIcon icon={faEllipsisV} color={Colors.black} size={18} />
                </TouchableOpacity>}
                onRequestClose={hideMenu}
            >
                <MenuItem onPress={() => {
                    hideMenu();
                    navigation.navigate('AddDeviceScreen', { title: 'Name The Device', data: { roomTitle: route.params.data.roomTitle, roomFunction: "edit", ...data } })
                }
                }>Edit</MenuItem>
                <MenuDivider />
                <MenuItem onPress={hideMenu}>Delete</MenuItem>
            </Menu> */}
        </View>
        <View style={{ flex: 1, marginVertical: 18 }}>
            <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '600' }}>{givenName}</Text>
            {/* <Text style={{ color: Colors.black }} >{info.model}</Text> */}
        </View>

        <DeviceProperties invalidate={invalidate} properties={info.properties} roomId={roomId} deviceId={id}></DeviceProperties>
    </Card>)
}

