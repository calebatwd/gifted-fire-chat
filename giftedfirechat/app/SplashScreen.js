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
        <View style={styles.centered}>
          <Button color="#841584" onPress={() => this.continue()} title='Continue' />
        </View>
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
    flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
  }
});