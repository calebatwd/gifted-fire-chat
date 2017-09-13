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
      <ScrollView style={{ height: '100%', width: '100%' }}>
        <Link style={styles.link} to={'/createBoard'}>
          <View style={styles.row}>
            <Text style={styles.name}>+ Create a new board</Text>
          </View>
        </Link>
        {this.state.boards.map((board) => {
          return <View key={board.key}>
            <Link style={styles.link} to={'/b/' + board.key} label={board.name}>
              <View style={styles.row}>
                <Text style={styles.name}>{board.name}</Text>
                <Text style={styles.info}>12</Text>
              </View>
            </Link>
          </View>
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  link: {
    height: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5
  },
  info: {
    fontSize: 16,
    padding: 12
  }
});