import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'

import Map from './Map'
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

const NewBoard = ({ navigation, locationFunc }) => (
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

const mapStateToProps = function (state) {
  return {
    firebase: state.firebase
  }
}

class BoardsScreen extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = props.firebase.database().ref().child('boards');
    this.state = {
      location: {
        latitude: null,
        longitude: null,
        error: null,
      },
      boards: []
    };
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

  componentDidMount() {
    this.listenForBoards(this.boardsRef);
  }

  componentWillUnmount() {
    this.stopListening(this.boardsRef);
  }

  stopListening(boardsRef) {
    boardsRef.off();
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
    boardsRef.on('child_changed', (snap) => {
      const i = this.state.boards.findIndex((obj => obj.key == snap.key));

      const boards = this.state.boards;
      boards[i] = snap.val();

      this.setState({
        boards: boards,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Map location={this.state.location} boards={this.state.boards} />
        <ScrollView>
          {this.state.boards.map((board) => {
            return <View key={board.key}>
              <TouchableHighlight style={styles.item}
                onPress={() => {
                  this.stopListening(this.boardsRef)
                  this.props.navigation.navigate('BoardView', { name: board.name, key: board.key });
                }}>
                <View>
                  <Text style={styles.title}>{board.name}</Text>
                  <Text style={styles.description}>
                    {
                      (() => {
                        if (board.lastMessage) {
                          return board.lastMessage.user.name + ': ' + board.lastMessage.text
                        }
                      })()
                    }
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          })}
        </ScrollView>
      </View>
    );
  }
}
export default connect(mapStateToProps, null)(BoardsScreen)

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