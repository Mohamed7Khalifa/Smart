import react from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faCloud, faComputer, faEllipsis, faHeartCircleBolt,
} from "@fortawesome/free-solid-svg-icons";
import Colors from '../styles/colors';
import ContainersStyleSheet from '../styles/containers';
import Card from './Card';


export default function DevicesStatusCard({ totalDevices, onlineDevices }) {
    return (
        <Card style={{ marginVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} color={Colors.light}>
            <View>
                <Text style={{ fontSize: 14, color: Colors.black, fontWeight: "700" }}>Online Devices</Text>
                <Text style={{ fontSize: 25, color: Colors.primary, fontWeight: "bold" }} >{onlineDevices}<Text style={{ fontSize: 12, color: Colors.muted }} >/{totalDevices}</Text></Text>
            </View>
            <FontAwesomeIcon icon={faCloud} color={Colors.primary} size={34} />
        </Card>


    )
}
const styles = StyleSheet.create({

    cardIcon: {

    }

});