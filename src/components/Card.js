import React from 'react';
import { View, Pressable } from 'react-native';

export default function Card({ style, color, height, children, pressable, onPress, ...otherProps }) {
    if (pressable) {
        return (<Pressable
            style={{
                backgroundColor: color,
                padding: 15,
                borderRadius: 10,
                height: height,
                ...style
            }}
            onPress={onPress}
            {...otherProps}>
            <View>
                {children}
            </View>
        </Pressable>);
    }
    return (<View
        style={{
            backgroundColor: color,
            padding: 15,
            borderRadius: 10,
            height: height,
            ...style
        }}
        {...otherProps}>
        {children}
    </View>)

}