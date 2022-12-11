import React, { useState, useEffect } from 'react';
import api from '../api/shs-api';
import handleError from '../util/errors';
import { Text, Switch, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../styles/colors';
import Card from './Card';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import CardIcon from './CardIcon';
import Slider from '@react-native-community/slider';
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function DeviceProperties({ invalidate, properties, deviceId, roomId }) {

    const [deviceState, setDeviceState] = useState({});
    useEffect(() => {
        api.getDeviceState(roomId, deviceId).then(res => {
            console.log(res);
            if (res.error && res.error === 'DESTINATION_UNREACHABLE') {
            } else if (res.error) {
                throw res;
            } else
                setDeviceState(res);
        }).catch(handleError);
    }, [deviceId, invalidate]);
    // read device state
    if (!properties) return (<View>
        <Text>loading</Text>
    </View>);

    if (deviceState === undefined || !deviceState.isOnline) {
        return (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginRight: 15, color: Colors.muted, fontSize: 15, fontWeight: "600" }}>Offline</Text>
            <FontAwesomeIcon icon={faLinkSlash} style={{ color: Colors.muted }} size={26} />
        </View>);
    }

    let slideTimeout = 0;
    const onSlide = (propertyId, value) => {
        clearTimeout(slideTimeout);
        slideTimeout = setTimeout(() => {
            api.setDeviceProperty(roomId, deviceId, propertyId, Math.round(value * 255)).then(state => {
                setDeviceState(state);
            }).catch(console.error)
        }, 200);
    }

    return (
        <View>
            {properties.map((property, index) => {
                if (property.type == "shs.properties.OnOff") {
                    return (<View key={index}>
                        <Text style={styles.label}>{property.synonym}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: Colors.black }}>On</Text>
                            <Switch
                                trackColor={{ false: Colors.muted, true: Colors.primary }}
                                thumbColor={Colors.white}
                                onValueChange={(value) => {
                                    api.setDeviceProperty(roomId, deviceId, property.id, value ? 1 : 0).then(state => {
                                        setDeviceState(state);
                                    }).catch(console.error)
                                }}
                                value={deviceState[property.id] !== 0}
                            />
                        </View>
                    </View>)
                } else if (property.type == "shs.properties.EnergyStorage") {
                    return (<View key={index}>
                        <Text style={styles.label}>{property.synonym}</Text>
                        <Text>{Math.round(deviceState[property.id] ? deviceState[property.id] / 255 * 100 : 0)}%</Text>
                    </View>)
                } else if (property.type === 'shs.properties.Brightness') {

                    return (<View key={index}>
                        <Text style={styles.label}>{property.synonym}</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={Colors.primary}
                            maximumTrackTintColor={Colors.muted}
                            thumbTintColor={Colors.primary}
                            onValueChange={(value) => onSlide(property.id, value)}
                            value={deviceState[property.id] ? deviceState[property.id] / 255 : 0}
                        />
                    </View>)
                } else {
                    return (<View key={index}>
                        <Text style={styles.label}>{property.synonym}</Text>
                        <Text>Unknown</Text>
                    </View>)
                }
            })}
        </View>
    )

    // batterylevel = property / 255 *100 %

}
const styles = StyleSheet.create({
    label: {
        fontSize: 13.69,
        color: Colors.prettyGray
    }
});
