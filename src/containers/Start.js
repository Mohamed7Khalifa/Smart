import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight, faAngleRight, faCoffee } from '@fortawesome/free-solid-svg-icons'
import Colors from '../styles/colors';
export default function StartScreen({ navigation }) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={styles.container}>
      <Image
        style={{ width: '100%', height: '50%', resizeMode: 'contain' }}
        source={require('../assets/images/splash-illustration.png')}
      />
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Be smarter, live smarter</Text>
      <Text style={{ fontSize: 16 }}>You are just one tap away from making your life much easier...</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <FontAwesomeIcon icon={faAngleRight} size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.gray300,
    color: Colors.primary,
    padding: 10,
    borderRadius: 1000,
    margin: 10,
  },
})

