import React, { useState, useEffect } from "react";
import { Text, Switch, FlatList, View, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import api from "../api/shs-api";
import handleError from '../util/errors';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FormsStyleSheet from "../styles/forms";
import { faComputer, faEllipsis, faHeartCircleBolt } from "@fortawesome/free-solid-svg-icons";
import Colors from "../styles/colors";
import SuperButton from "../components/SuperButton";
import ContainersStyleSheet from "../styles/containers";
export default function AddDeviceScreen({ navigation, route }) {
    const [text, setText] = useState('');
    const { id, baseAddress, modelNumber, roomId } = route.params.data;
    const submit = () => {
        if (route.params.roomFunction != "edit") {
            api.addDevice(roomId, modelNumber, id, baseAddress, text).then(res => {
                if (res.error)
                    throw res;
                navigation.navigate('RoomScreen', { title: route.params.data.roomTitle, roomId: route.params.data.roomId });
                console.log(route.params.data, text);
            }).catch(handleError)
        }
        else{

        }
    }


    return (
        <View style={[ContainersStyleSheet.fluid, { justifyContent: 'space-between' }]}>
            <View>
                <View>
                    <FontAwesomeIcon
                        icon={faHeartCircleBolt}
                        color={Colors.black}
                        size={150}
                        style={styles.icon}
                    />
                </View>
                <View>
                    <Text style={FormsStyleSheet.inputTitle}>Device Name</Text>
                    <TextInput style={FormsStyleSheet.textInput} placeholder="HERE!!" onChangeText={setText} />
                </View>
            </View>
            <SuperButton text={"Done"} color={Colors.primary} onPress={submit} />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.white,
        alignContent: "center"
    },
    icon: {
        alignSelf: "center",
    },
    DoneButton: {
        width: "60%",
        height: "5%",
        alignSelf: "center",
        backgroundColor: "#34C759"
    },
});
