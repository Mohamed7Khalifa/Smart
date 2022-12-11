import React from 'react';
import { View, Pressable } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function CardIcon({ style, icon, color, backgroundColor, children, ...otherProps }) {
    return (<FontAwesomeIcon icon={icon} color={color} size={24} style={{ padding: 10, backgroundColor: backgroundColor, borderRadius: 1000, ...style }} {...otherProps} />)
}