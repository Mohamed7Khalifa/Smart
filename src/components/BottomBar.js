import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faChartPie, faCirclePlus, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';

export default function BottomBar({ onAddPressed, style, ...otherProps }) {
    return (<View {...otherProps}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', ...style }} >
            <TouchableOpacity>
                <FontAwesomeIcon icon={faChartPie} color={Colors.black} size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faCirclePlus} color={Colors.black} size={34} style={{ borderRadius: 1000 }} />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faMicrophone} color={Colors.black} size={24} />
            </TouchableOpacity>
        </View>
    </View>);
}