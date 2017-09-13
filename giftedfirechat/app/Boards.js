import React, { Component } from 'react';
import { Link } from 'react-router-native'
import firebase from 'firebase';
import BoardList from './BoardList'

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class Boards extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = props.firebaseRef.child('boards');
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

  render() {
    return (
      <View>
        <BoardList boards={this.state.boards} />
      </View>
    );
  }
}