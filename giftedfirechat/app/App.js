import React, { Component } from 'react'
import { NativeRouter, Link } from 'react-router-native'
import { Navigation, Card } from 'react-router-navigation'
import { Tabs, Tab } from 'react-router-navigation'
import Boards from './Boards'
import Chat from './Chat'
import Splash from './Splash'
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

  setName(name) {
    this.setState({ user: name });
  }

  render() {
    return <NativeRouter>
      <Navigation>
        <Card
          exact
          path="/"
          setName={this.setName}
          component={Splash}
        />
        <Card
          path="/boards"
          firebaseRef={this.firebaseRef}
          render={this.BoardTabs}
        />
        <Card
          path="/b/:boardKey"
          firebaseRef={this.firebaseRef}
          component={Chat}
        />
      </Navigation>
    </NativeRouter>
  }

  BoardTabs = (props) => {
    return <Tabs>
      <Tab path="/in" firebaseRef={props.firebaseRef} component={Boards} />
      <Tab path="/" firebaseRef={props.firebaseRef} component={Boards} />
      <Tab path="/mine" firebaseRef={props.firebaseRef} component={Boards} />
    </Tabs>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});