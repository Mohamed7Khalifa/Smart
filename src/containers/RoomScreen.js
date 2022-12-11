import { View, Text, FlatList, RefreshControl, ToastAndroid } from 'react-native';
import handleError from '../util/errors';
import React, { useEffect, useState } from 'react';
import DeviceCard from '../components/DeviceCard';
import AddCard from '../components/AddCard';
import ContainersStyleSheet from '../styles/containers';
import api from '../api/shs-api';

export default function RoomScreen({ navigation, route, ...otherProps }) {
  const { roomId } = route.params;
  const [refreshing, setRefreshing] = React.useState(true);
  const [devices, setDevices] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    if (refreshing)
      api.getRoomDevices(roomId).then(response => {
        if (response.error)
          throw response;
        setDevices(response);
        console.log(response)
        setRefreshing(false);
      }).catch(handleError);
  }, [refreshing]);

  return (<View style={ContainersStyleSheet.fluid}>
    <Text style={{ marginStart: 5, fontSize: 16, fontWeight: '700' }}>Rooms</Text>
    <FlatList
      data={devices}
      renderItem={({ item, index, separators }) => <DeviceCard invalidate={refreshing} roomId={roomId}  {...item} />}
      numColumns={2}
      style={{ flex: 1 }}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={<AddCard height={160} onPress={() => navigation.navigate('QR', { title: 'Add Device to ' + route.params.title, data: { roomId: roomId, roomTitle: route.params.title } })} />}
      refreshControl={<RefreshControl
        colors={["#9Bd35A", "#689F38"]}
        refreshing={refreshing}
        onRefresh={onRefresh} />}
    />
  </View>)
}
