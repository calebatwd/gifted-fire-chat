import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = props.firebaseApp.database().ref();
  }

  componentWillMount() {
    this.setState({ boards: [] });
  }

  componentDidMount() {
    this.listenForBoards(this.boardsRef);
  }

  listenForBoards(boardsRef) {
    boardsRef.on('child_added', (snap) => {
      const board = {
        ...snap.val(),
        key: snap.key,
        createdAt: new Date(snap.val().timestamp)
      };

      this.setState((previousState) => ({
        boards: [...previousState.boards, board],
      }));
    });
  }

  onCreate(name) {
    const board = {
      name,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      lat: 1,
      long: 1,
      messages: []
    };

    this.boardsRef.push(board);
  }

  render() {
    return (
      <ScrollView>
        {this.state.boards.map((board) => {
          return <View key={board.key}>
            <Text>{board.name}</Text>
          </View>
        })}
      </ScrollView>
    );
  }
}