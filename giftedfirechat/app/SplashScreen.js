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
  TextInput,
  Image
} from 'react-native';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  }

  continue() {
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return <View style={styles.container}>
      <Image style={styles.background} source={require('../img/splash.jpg')} >
        <TouchableOpacity style={styles.centered} onPress={() => this.continue()} >
          <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
      </Image>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  centered: {
    flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', margin: 100
  },
  text: {
    fontSize: 34,
    backgroundColor: 'transparent',
    color: 'white'
  }
});