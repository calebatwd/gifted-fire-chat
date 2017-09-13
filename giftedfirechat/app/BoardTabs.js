import React, { Component } from 'react';
import { Tabs, Tab } from 'react-router-navigation'
import Boards from './Boards'

import {
  StyleSheet,
  View
} from 'react-native';

export default class BoardTabs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Tabs>
          <Tab path="/nearby" label='Nearby' firebaseRef={this.props.firebaseRef} component={Boards} />
          <Tab path="/" label='Recent' firebaseRef={this.props.firebaseRef} component={Boards} />
          <Tab path="/mine" label='Mine' firebaseRef={this.props.firebaseRef} component={Boards} />
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});