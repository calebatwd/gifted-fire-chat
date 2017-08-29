import React, { Component } from 'react';
import * as firebase from 'firebase';
import App from './app/App';
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
        <App firebaseApp={firebaseApp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('giftedfirechat', () => giftedfirechat);
