import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../styles/colors';
import RoomNavigationItem from './RoomNavigationItem';
import handleError from '../util/errors';

export default function RoomNavigationBar({ titles, onNavigation, style, ...otherProps }) {

    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        onNavigation(activeIndex);
    }, [activeIndex, onNavigation]);
    return (<ScrollView
        style={{ flexShrink: 0, flexGrow: 0, ...style }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...otherProps}>
        {titles.map((title, index) => (<RoomNavigationItem key={index} active={activeIndex === index} title={title}
            onPress={() => {
                if (activeIndex !== index) {
                    setActiveIndex(index);
                }
            }} />))}
    </ScrollView>)
}