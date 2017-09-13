import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Chat from './Chat'

import {
  StyleSheet
} from 'react-native';

export default class BoardScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name + " Board",
  });
  render() {
    return (
      <Chat
        boardRef={this.props.screenProps.firebaseRef.child('boards/' + this.props.navigation.state.params.key)}
        user={this.props.screenProps.firebaseApp.auth().currentUser} />
    );
  }
}

const styles = StyleSheet.create({
});