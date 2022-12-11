import React, { useState, useEffect } from 'react';
import api from '../api/shs-api';
import { Text, Switch, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV, faExclamationTriangle, faFan, faListDots, faMicrochip, faPlug, faToggleOff, faBattery, faBatteryThreeQuarters, faBatteryCar, faTableCells, faTemperature0 } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import CardIcon from './CardIcon';
import DeviceProperties from './DeviceProperties';
import SuperButton from "./SuperButton";
export default function VoiceCard({ style, ...otherProps }) {

    const [results, setResults] = useState([]);
    return (<View
        style={Object.assign(styles.container, style)}
        {...otherProps}>
        <Text>{results.join(' ')}</Text>
        <SuperButton text={"Done"} color={Colors.primary} onPress={() => {
            Voice.start('en-US');
            Voice.onSpeechResults = (res) => {
                alert(JSON.stringify(res));
                setResults(res);
            };
            //api.addDevice(roomId, modelNumber, id, baseAddress, text).then(console.log).catch(console.error);
        }} />
    </View>)

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '100%',
        marginBottom: 20,
        height: 150,
        width: '100%',
        backgroundColor: 'red'
    }
});