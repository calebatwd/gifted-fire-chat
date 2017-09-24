import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'

import Chat from './Chat'

import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

const mapStateToProps = function (state) {
  return {
    firebase: state.firebase
  }
}

class BoardScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name + " Board",
  });

  render() {
    return (
      <View style={styles.container}>
        <Chat
          boardRef={this.props.firebase.database().ref().child('boards/' + this.props.navigation.state.params.key)}
          user={this.props.firebase.auth().currentUser} />
      </View>
    );
  }
}
export default connect(mapStateToProps, null)(BoardScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});