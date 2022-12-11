import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import api from '../api/shs-api';
import handleError from '../util/errors';

function QrCodeScanner({ navigation, route }) {

  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not Scanned');
  const [data, setData] = useState(undefined)


  const handleBarCodeScanned = (scanResult) => {
    console.log(scanResult);
    if (scanResult?.data) {
      const [modelNumber, id, baseAddress] = scanResult.data.split(/\./g);
      if (modelNumber.length === 16 && id.length === 12 && baseAddress.length === 10) {
        setScanned(true)
        setData({
          modelNumber: modelNumber,
          id: id,
          baseAddress: baseAddress,
          roomId: route.params.data.roomId
        });
        console.log(scanResult.data);
        console.log(scanResult.type);

      }
      else {
        setText("Wrong scan again")
      }
    }

  };
  useEffect(() => {
    if (scanned)
      navigation.navigate('AddDeviceScreen', { title: 'Name The Device', data: { roomTitle: route.params.data.roomTitle, ...data } })
  }, [scanned])

  return (
    <View style={styles.container}>
      <View style={styles.barCodeBox}>
        <RNCamera

          defaultTouchToFocus
          flashMode={RNCamera.Constants.FlashMode.auto}
          mirrorImage={false}
          onBarCodeRead={(x)=>handleBarCodeScanned(x)}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}

          style={{ height: 400, width: 400 }}
          type={RNCamera.Constants.Type.back}
        />

      </View>
      <Text style={styles.mainText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 16,
    margin: 20,
  },
  barCodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});

export default QrCodeScanner;