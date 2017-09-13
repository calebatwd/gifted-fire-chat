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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    const user = this.props.screenProps.firebaseApp.auth().currentUser;
    this.state = {
      displayName: user.displayName || '',
      photoURL: user.photoURL
    }
  }

  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons
        name="mood"
        size={24}
        style={{ color: tintColor }}
      />
    ),
  };

  updateProfile() {
    this.props.screenProps.firebaseApp.auth().currentUser.updateProfile({
      displayName: this.state.displayName,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      alert('Successfully updated your info');
    }, function (error) {
      alert(error);
    });
  }

  render() {
    return <View style={styles.container}>
      <CoreNavBar banner={'Profile'} navigation={this.props.navigation} />
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ displayName: text })}
          value={this.state.displayName}
          placeholder={'User name'}
        />
        <Button title='Save' onPress={() => this.updateProfile()} />
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  },
  textInput: {
    height: 50,
    width: 250,
    textAlign: 'center'
  },
});