import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BoardsNavBar } from './BoardsNavBar'

import {
  Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default class BoardsScreen extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = props.screenProps.firebaseRef.child('boards');
  }

  static navigationOptions = {
    drawerLabel: 'Boards',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons
        name="chat"
        size={24}
        style={{ color: tintColor }}
      />
    ),
    header: null
  };

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
    console.log(this.props)
    return (
      <View style={styles.container}>
        <BoardsNavBar banner={'Boards'} navigation={this.props.navigation} />
        <ScrollView>
          {this.state.boards.map((board) => {
            return <View key={board.key}>
              <TouchableHighlight style={styles.item}
                onPress={() => {
                  const navigationAction = NavigationActions.navigate({
                    routeName: 'Stacks',
                    action: NavigationActions.navigate({
                      routeName: 'BoardView',
                      params: {
                        name: board.name,
                        key: board.key
                      }
                    }),
                  });
                  this.props.navigation.dispatch(navigationAction);
                }}>
                <View>
                  <Text style={styles.title}>{board.name}</Text>
                  <Text style={styles.description}>This is a board description</Text>
                </View>
              </TouchableHighlight>
            </View>
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
});