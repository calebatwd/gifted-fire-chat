import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { CoreNavBar } from './CoreNavBar'

import {
  Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  TouchableHighlight,
  TextInput
} from 'react-native';

export default class SettingsScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons name="settings" size={24} style={{ color: tintColor }} />
    ),
  };

  signOut() {
    this.props.screenProps.firebaseApp.auth().signOut()
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'SignIn' })
          ]
        })
        this.props.navigation.dispatch(resetAction);
      }).catch(function (error) {
        console.log(error);
        alert(error);
      });
  }

  render() {
    return <View style={styles.container}>
      <CoreNavBar banner={'Settings'} navigation={this.props.navigation} />
      <TouchableHighlight onPress={() => this.signOut()}><Text>Sign out</Text></TouchableHighlight>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  },
});