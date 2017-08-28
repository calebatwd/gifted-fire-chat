/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0g82j1EsuuJYm_CqZjbAQJOU3ljkL6hM",
  authDomain: "gifted-fire-chat.firebaseapp.com",
  databaseURL: "https://gifted-fire-chat.firebaseio.com",
  projectId: "gifted-fire-chat",
  storageBucket: "gifted-fire-chat.appspot.com",
  messagingSenderId: "221277781525"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class giftedfirechat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('giftedfirechat', () => giftedfirechat);
