import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import SignInScreen from './SignInScreen'
import RegisterScreen from './RegisterScreen'
import BoardScreen from './BoardScreen'
import NewBoardScreen from './NewBoardScreen'
import BoardsScreen from './BoardsScreen'
import ProfileScreen from './ProfileScreen'
import SettingsScreen from './SettingsScreen'
import Hidden from './Hidden'

import {
  StyleSheet,
  Platform
} from 'react-native';

const SubNavigator = StackNavigator({
  SignIn: {
    path: './signin',
    screen: SignInScreen
  },
  Register: {
    path: './register',
    screen: RegisterScreen
  },
  BoardView: {
    path: './board',
    screen: BoardScreen
  },
  CreateBoard: {
    path: './createboard',
    screen: NewBoardScreen
  }
},
  {
    initialRouteName: 'SignIn',
    headerMode: 'float',
    contentOptions: {
      activeTintColor: '#e91e63',
    }
  }
)

const FullNavigator = DrawerNavigator({
  BoardList: {
    path: '/boards',
    screen: BoardsScreen
  },
  Profile: {
    path: '/profile',
    screen: ProfileScreen,
  },
  Settings: {
    path: '/settings',
    screen: SettingsScreen,
  },
  Stacks: {
    path: './stacks',
    screen: ({ navigation, screenProps }) => <SubNavigator screenProps={{ ...screenProps, rootNavigation: navigation }} />,
    navigationOptions: {
      drawerLabel: <Hidden />
    }
  }
}, {
    initialRouteName: 'Stacks',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export default class App extends Component {
  render() {
    return <FullNavigator screenProps={this.props} />
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  }
});