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

const OpenDrawer = ({ drawerNavigation }) => (
  <View style={{ marginLeft: 10 }}>
    <TouchableOpacity
      onPress={() => { drawerNavigation.navigate('DrawerOpen') }}>
      <MaterialIcons
        name="menu"
        size={24}
        style={{ color: '#e91e63' }}
      />
    </TouchableOpacity>
  </View>
)

const NewBoard = ({ navigation }) => (
  <View style={{ marginRight: 10 }}>
    <TouchableOpacity
      onPress={() => { navigation.navigate('CreateBoard') }}>
      <MaterialIcons
        name="add-box"
        size={24}
        style={{ color: '#e91e63' }}
      />
    </TouchableOpacity>
  </View>
)

export default class BoardsScreen extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = props.screenProps.firebaseRef.child('boards');
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: 'Boards',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons
        name="chat"
        size={24}
        style={{ color: tintColor }}
      />
    ),
    title: 'Boards',
    headerLeft: <OpenDrawer drawerNavigation={screenProps.drawerNavigation} />,
    headerRight: <NewBoard navigation={navigation} />
  });

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
      <View style={styles.container}>
        <ScrollView>
          {this.state.boards.map((board) => {
            return <View key={board.key}>
              <TouchableHighlight style={styles.item}
                onPress={() => {
                  this.props.navigation.navigate('BoardView', { name: board.name, key: board.key });
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