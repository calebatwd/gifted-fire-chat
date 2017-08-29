import React, { Component } from 'react'
import { NativeRouter, Link } from 'react-router-native'
import { Navigation, Card } from 'react-router-navigation'
import Boards from './Boards'
import Chat from './Chat'
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.firebaseRef = props.firebaseApp.database().ref();
  }

  render() {
    return <NativeRouter>
      <Navigation>
        <Card
          exact
          path="/"
          render={this.Welcome}
        />
        <Card
          path="/boards"
          firebaseRef={this.firebaseRef}
          component={Boards}
        />
        <Card
          path="/b/:boardKey"
          firebaseRef={this.firebaseRef}
          component={Chat}
        />
      </Navigation>
    </NativeRouter>
  }

  Welcome = () => {
    return <View style={styles.container}><Link to="/boards">
      <Text>Sign In!</Text>
    </Link>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  }
});