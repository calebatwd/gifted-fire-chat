import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const BoardsNavBar = ({ navigation, banner }) => (
  <View style={styles.nav}>
    <View style={styles.navleft}>
      <TouchableOpacity
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
      <TouchableOpacity
        onPress={() => { navigation.navigate('CreateBoard') }}>
        <MaterialIcons
          name="add-box"
          size={24}
          style={{ color: '#e91e63' }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default <BoardsNavBar />