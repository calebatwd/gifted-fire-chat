import React, { Component } from 'react';
import { Link } from 'react-router-native'
import firebase from 'firebase';
import BoardList from './BoardList'

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Button
} from 'react-native';

export default class CreateBoard extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = props.firebaseRef.child('boards');
    this.state = { text: '' }
  }

  onCreate(name) {
    if (!name || name === '')
      return;

    const board = {
      name,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      lat: 1,
      long: 1,
      messages: []
    };

    const newBoard = this.boardsRef.push(board);

    this.props.history.replace('/b/' + newBoard.key);
  }

  render() {
    return <View>
      <TextInput
        style={{ height: 40 }}
        placeholder="What's your board about?"
        onChangeText={(text) => this.setState({ text })}
      />
      <Button title='Go' onPress={() => this.onCreate(this.state.text)} />
    </View>
  }
}