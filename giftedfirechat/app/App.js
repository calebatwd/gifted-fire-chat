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
import SplashScreen from './SplashScreen'
import Hidden from './Hidden'

const BoardsNavigator = StackNavigator({
  BoardList: { screen: BoardsScreen },
  BoardView: { screen: BoardScreen },
  CreateBoard: { screen: NewBoardScreen }
},
  {
    headerMode: 'float',
    contentOptions: {
      activeTintColor: '#e91e63',
    }
  }
)

const FullNavigator = DrawerNavigator({
  BoardList: {
    screen: ({ navigation, screenProps }) => <BoardsNavigator screenProps={{ drawerNavigation: navigation, ...screenProps }} />,
    navigationOptions: {
      drawerLabel: 'Boards',
      drawerIcon: ({ tintColor }) => (<MaterialIcons name="chat" size={24} style={{ color: tintColor }} />)
    }
  },
  Profile: { screen: ProfileScreen },
  Settings: { screen: SettingsScreen }
}, {
    initialRouteName: 'BoardList',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

const TopNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  SignIn: { screen: SignInScreen },
  Register: { screen: RegisterScreen },
  Full: { screen: ({ navigation, screenProps }) => <FullNavigator screenProps={{ rootNavigation: navigation, ...screenProps }} /> }
}, {
    initialRouteName: 'Splash',
    headerMode: 'none'
  }
)

export default class App extends Component {
  render() {
    return <TopNavigator screenProps={this.props} />
  }
}