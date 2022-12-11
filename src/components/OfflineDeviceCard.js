import React, { useState, useEffect } from 'react';
import api from '../api/shs-api';
import { Text, Switch, FlatList, View, TouchableOpacity } from 'react-native';
import Colors from '../styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV, faExclamationTriangle, faMicrochip,  faLinkSlash, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import CardIcon from './CardIcon';
import handleError from '../util/errors';

export default function OfflineDeviceCard({ id, style, givenName, modelNumber, ...otherProps}) {
    const [info, setInfo] = useState({ givenName: 'Untitled', model: 'Unknown' });
    const [isMenuVisible, setMenuVisibilty] = useState(false);
    const hideMenu = () => setMenuVisibilty(false);
    const showMenu = () => setMenuVisibilty(true);
    const iconType = ()=>{
        if(info.icon === "fontawesome.faToggleOff"){
            return faToggleOff;
        }
        else if (info.icon === "fontawesome.faMicrochip"){
            return faMicrochip;
        }
        else{
            return faExclamationTriangle;
        }
    };
    useEffect(() => {
        api.getModelInfo(modelNumber).then(res => {
            if (res.error)
                throw new Error(res);
            setInfo(res);
        }).catch(console.error);
    }, [id]);
    return (<Card color={Colors.light} style={{ flex: 1, margin: 5 , ...style}} {...otherProps}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <CardIcon icon={iconType()} color={Colors.black} backgroundColor={Colors.gray100} />
            <Menu
                visible={isMenuVisible}
                anchor={<TouchableOpacity onPress={showMenu}>
                    <FontAwesomeIcon icon={faEllipsisV} color={Colors.black} size={18} />
                </TouchableOpacity>}
                onRequestClose={hideMenu}
            >
                <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
                <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
                <MenuItem disabled>Disabled item</MenuItem>
                <MenuDivider />
                <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
            </Menu>
        </View>
        <View style={{ flex: 1, marginVertical: 18 }}>
            <Text style={{ color: Colors.black, fontSize: 18, fontWeight: '600' }}>{info.givenName}</Text>
            {/* <Text style={{ color: Colors.black }} >{info.model}</Text> */}
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{marginRight:15,color:Colors.muted,fontSize:15,fontWeight:"600"}}>Offline</Text>
            <FontAwesomeIcon  icon={faLinkSlash} style={{color:Colors.muted}} size={26} />
        </View>
    </Card>)
}


