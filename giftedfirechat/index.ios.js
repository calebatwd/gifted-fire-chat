import React, { Component } from 'react';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './app/App'
import reducer from './app/reducers'

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

const store = createStore(reducer, applyMiddleware(thunk))
store.dispatch({ type: "SET_FIREBASE", item: firebaseApp })

const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const locationOffset = { lat: Math.random() / 20.0 - .025, lon: Math.random() / 20.0 - .025 }

export default class giftedfirechat extends Component {
  render() {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        store.dispatch({
          type: "UPDATE_LOCATION",
          coordinate: {
            latitude: position.coords.latitude + locationOffset.lat,
            longitude: position.coords.longitude + locationOffset.lon
          }
        });
      },
      (error) => store.dispatch({ type: "ERROR_LOCATION", error: error }),
      { enableHighAccuracy: true, maximumAge: 5000, distanceFilter: 10 },
    );

    return (
      <Provider store={store}>
        <App firebaseRef={firebaseApp.database().ref()} firebaseApp={firebaseApp} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('giftedfirechat', () => giftedfirechat);
