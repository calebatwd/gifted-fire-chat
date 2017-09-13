import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation';
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

export default class SignInScreen extends Component {
  state = {
    email: 'trekker272@live.com',
    password: 'sunfish02'
  }

  static navigationOptions = {
  }

  signIn() {
    this.props.screenProps.firebaseApp.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const actionToDispatch = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Full' })]
        })
        this.props.navigation.dispatch(actionToDispatch)
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  render() {
    return <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
          placeholder={"Email Address"}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
          placeholder={"Password"}
        />
        <Button onPress={() => this.signIn()} title='Sign In' />
        <Button title='Need an account?' onPress={() => this.props.navigation.navigate('Register')} />
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