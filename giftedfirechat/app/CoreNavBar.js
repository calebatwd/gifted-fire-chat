import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export const CoreNavBar = ({ navigation, banner }) => (
  <View style={styles.nav}>
    <View style={styles.navleft}>
      <TouchableOpacity style={{ width: 24 }}
        onPress={() => { navigation.navigate('DrawerOpen') }}>
        <MaterialIcons
          name="menu"
          size={24}
          style={{ color: '#e91e63' }}
        />
      </TouchableOpacity>
    </View>
    <Text style={styles.navbanner}>{banner}</Text>
    <View style={styles.navright}>
    </View>
  </View>
);

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  navleft: {
    alignSelf: 'center',
    marginLeft: 10,
    width: 30
  },
  navbanner: {
    alignSelf: 'center',
    fontSize: 16,
  },
  navright: {
    alignSelf: 'center',
    marginRight: 10,
    width: 30
  }
});