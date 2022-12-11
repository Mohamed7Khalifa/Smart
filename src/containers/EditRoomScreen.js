import { View, Text, FlatList, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../styles/colors';
import FormsStyleSheet from '../styles/forms';
import ContainersStyleSheet from '../styles/containers';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBed, faCouch, faKitchenSet, faShower, faStairs, faTree, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import SuperButton from '../components/SuperButton';
import api from '../api/shs-api';
import handleError from '../util/errors';
const icons = [faCouch,faBed,faWarehouse,faKitchenSet,faTree,faShower,faStairs];

function SelectableIcon({ name, icon, selected, onPress }) {
    return <TouchableOpacity onPress={onPress} style={{ flexGrow: 0, margin: 10, backgroundColor: selected ? Colors.primary : Colors.gray300, padding: 15, borderRadius: 1000 }}>
        <FontAwesomeIcon icon={icon} color={selected ? Colors.white : Colors.black} size={30} />
    </TouchableOpacity>
}
function EditRoomScreen({ navigation, route, ...otherProps }) {
    const { room } = route.params ? route.params : { room: undefined };
    const [selectedIcon, selectIcon] = useState(0);
    const [title, setTitle] = useState(room ? room.title : '');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const submit = () => {
        if (room === undefined) { // creating new room
            api.addRoom(title).then((res) => {
                if (res.error)
                    throw res;
                    navigation.navigate('Home');
            }).catch(handleError);
        } else {
            api.updateRoom(room._id, { title: title, icon: selectedIcon }).then(res => {
                if (res.error){
                    throw res;
                }
                navigation.goBack();
            }).catch(handleError)
        }
    }

    return (<View style={[ContainersStyleSheet.fluid, { justifyContent: 'space-between' }]} {...otherProps}>
        <View>
            <Text style={FormsStyleSheet.inputTitle}>Room Title</Text>
            <TextInput
                style={FormsStyleSheet.textInput}
                value={title}
                placeholder={'eg Living room'}
                onChangeText={(value) => { setTitle(value); setErrorMessage(undefined) }}
            />
            <Text style={FormsStyleSheet.inputTitle}>Icon</Text>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {icons.map((icon, index) => <SelectableIcon key={index} icon={icon} selected={selectedIcon === index} onPress={() => selectIcon(index)} />)}
            </View>
        </View>
        <SuperButton text={room ? 'Save' : 'Create'} color={Colors.primary} onPress={submit}  />
    </View>)
}


export default EditRoomScreen;