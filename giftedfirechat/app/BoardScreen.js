import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Chat from './Chat'

import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

export default class BoardScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name + " Board",
  });
  render() {
    return (
      <View style={styles.container}>
        <Chat
          boardRef={this.props.screenProps.firebaseRef.child('boards/' + this.props.navigation.state.params.key)}
          user={this.props.screenProps.firebaseApp.auth().currentUser} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  }
});