import React, { Component } from 'react';
import { Link } from 'react-router-native'
import firebase from 'firebase';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: props.boards
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ boards: props.boards })
  }

  render() {
    return (
      <ScrollView>
        {this.state.boards.map((board) => {
          return <View key={board.key}>
            <Link to={'/b/' + board.key}><Text>{board.name}</Text></Link>
          </View>
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardItem: {
    height: 50,
    flex: 1
  }
});