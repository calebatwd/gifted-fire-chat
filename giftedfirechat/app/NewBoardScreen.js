import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TouchableHighlight,
  TextInput
} from 'react-native';

const mapStateToProps = function (state) {
  return {
    location: state.location,
    firebase: state.firebase
  }
}

class NewBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = this.props.firebase.database().ref().child('boards');
    this.state = { text: '' }
    console.log(this.props)
  }

  static navigationOptions = {
    title: "New Board"
  }

  onCreate(name) {
    if (!name || name === '')
      return;

    const board = {
      name,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      coordinate: this.props.location.coordinate,
      messages: []
    };

    const newBoard = this.boardsRef.push(board);

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'BoardList' }),
        NavigationActions.navigate({
          routeName: 'BoardView', params: {
            name: board.name,
            key: newBoard.key
          }
        })
      ]
    })

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Give your board a name..."
        onChangeText={(text) => this.setState({ text })}
      />
      <Button title='Go' onPress={() => this.onCreate(this.state.text)} />
    </View>
  }
}
export default connect(mapStateToProps, null)(NewBoardScreen)

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  },
  textInput: {
    height: 50,
    textAlign: 'center'
  }
});