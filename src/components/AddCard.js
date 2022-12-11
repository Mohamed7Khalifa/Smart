import React, { useState, useEffect } from 'react';
import api from '../api/shs-api';
import { Text, Switch, FlatList, View, TouchableOpacity } from 'react-native';
import Colors from '../styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV, faListDots, faMicrochip, faPlug, faPlus } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';

export default function AddCard({ onPress, style, ...otherProps }) {

    return (<Card style={{ flex: 1, margin: 5, height: 100, borderStyle: 'dashed', borderWidth: 2, borderColor: Colors.muted, ...style }}  {...otherProps}>
        <TouchableOpacity style={{ width: '100%', height: '100%', alignItems: 'center' }} onPress={onPress}>
            <FontAwesomeIcon icon={faPlus} color={Colors.muted} size={48} style={{ borderRadius: 100, backgroundColor: Colors.light, padding: 15 }} />
        </TouchableOpacity>
    </Card>)
}
