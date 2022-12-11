import React , { useState, useEffect,Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import api from '../api/shs-api';
import handleError from '../util/errors';
import AddCard from '../components/AddCard';
import RoomCard from '../components/RoomCard';
import UserInfo from '../components/UserInfo';
import Colors from '../styles/colors';
import ContainersStyleSheet from '../styles/containers';
import DevicesStatusCard from '../components/DevicesStatusCard';
function Home({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(true);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (refreshing)
      api.getAllRooms().then(response => {
        if (response.error)
          throw new Error(response);
        setRooms(response);
        setRefreshing(false);
      }).catch(console.error);}, [refreshing]);
  return (
    <View style={[ContainersStyleSheet.fluid, { paddingTop: 35 }]}>
      <UserInfo name='Mohamed' style={{ marginVertical: 12 }}></UserInfo>
      <DevicesStatusCard totalDevices={13} onlineDevices={12}/>
      <Text style={{ marginStart: 5, fontSize: 16, fontWeight: '700' }}>Rooms</Text>
      <FlatList
        data={rooms}
        renderItem={({ item, index, separators }) => <RoomCard height={160} room={item} navigation={navigation} />}
        numColumns={2}
        style={{ flex: 1 }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<AddCard height={160} onPress={() => navigation.navigate('EditRoomScreen', { title: 'Create Room' })} />}
        refreshControl={<RefreshControl
          colors={["#9Bd35A", "#689F38"]}
          refreshing={refreshing}
          onRefresh={onRefresh} />}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.white
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  plus: {
    position: 'absolute',
    bottom: 25,
    right: 30,

  },
});

export default Home;

