import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { DrawerNavigator } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  TouchableHighlight,
  TextInput
} from 'react-native';

const CoreNavBar = ({ navigation, banner }) => (
  <View style={styles.nav}>
    <View style={styles.navleft}>
      <TouchableOpacity style={{ width: 24 }}
        onPress={() => { navigation.navigate('DrawerOpen') }}>
        <MaterialIcons
          name="menu"
          size={24}
          style={{ color: '#e91e63' }}
        />
      </TouchableOpacity>
    </View>
    <Text style={styles.navbanner}>{banner}</Text>
    <View style={styles.navright}>
    </View>
  </View>
);

const BoardsNavBar = ({ navigation, banner }) => (
  <View style={styles.nav}>
    <View style={styles.navleft}>
      <TouchableOpacity
        onPress={() => { navigation.navigate('DrawerOpen') }}>
        <MaterialIcons
          name="menu"
          size={24}
          style={{ color: '#e91e63' }}
        />
      </TouchableOpacity>
    </View>
    <Text style={styles.navbanner}>{banner}</Text>
    <View style={styles.navright}>
      <TouchableOpacity
        onPress={() => { navigation.navigate('CreateBoard') }}>
        <MaterialIcons
          name="add-box"
          size={24}
          style={{ color: '#e91e63' }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.messagesRef = props.boardRef.child('/messages');
  }

  componentWillMount() {
    this.setState({ messages: [] });
  }

  componentDidMount() {
    this.listenForMessages(this.messagesRef);
  }

  listenForMessages(messagesRef) {
    messagesRef.on('child_added', (snap) => {
      const message = {
        ...snap.val(),
        _id: snap.key,
        createdAt: new Date(snap.val().timestamp)
      };

      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }));
    });
  }

  onSend(messages = []) {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      ...messages[0]
    };

    this.messagesRef.push(message);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: this.props.user.displayName,// this.props.user.uid,
          name: this.props.user.displayName,
          avatar: this.props.user.photoURL,
        }}
      />
    );
  }
}

class BoardsScreen extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = props.screenProps.firebaseRef.child('boards');
  }

  static navigationOptions = {
    drawerLabel: 'Boards',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons
        name="chat"
        size={24}
        style={{ color: tintColor }}
      />
    ),
    header: null
  };

  componentWillMount() {
    this.setState({ boards: [] });
  }

  componentDidMount() {
    this.listenForBoards(this.boardsRef);
  }

  listenForBoards(boardsRef) {
    boardsRef.on('child_added', (snap) => {
      const board = {
        ...snap.val(),
        key: snap.key,
        createdAt: new Date(snap.val().timestamp)
      };

      this.setState((previousState) => ({
        boards: [...previousState.boards, board],
      }));
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <BoardsNavBar banner={'Boards'} navigation={this.props.navigation} />
        <ScrollView>
          {this.state.boards.map((board) => {
            return <View key={board.key}>
              <TouchableHighlight style={styles.item}
                onPress={() => {
                  this.props.navigation.navigate('BoardView',
                    {
                      name: board.name,
                      key: board.key
                    })
                }}>
                <View>
                  <Text style={styles.title}>{board.name}</Text>
                  <Text style={styles.description}>This is a board description</Text>
                </View>
              </TouchableHighlight>
            </View>
          })}
        </ScrollView>
      </View>
    );
  }
}

class BoardScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name + " Board",
  });
  render() {
    return (
      <Chat
        boardRef={this.props.screenProps.firebaseRef.child('boards/' + this.props.navigation.state.params.key)}
        user={this.props.screenProps.firebaseApp.auth().currentUser} />
    );
  }
}

class NewBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = props.screenProps.firebaseRef.child('boards');
    this.state = { text: '' }
  }

  static navigationOptions = {
    title: "New Board"
  }

  onCreate(name) {
    if (!name || name === '')
      return;

    const board = {
      name,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      lat: 1,
      long: 1,
      messages: []
    };

    const newBoard = this.boardsRef.push(board);

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'MainMenu' }),
        NavigationActions.navigate({
          routeName: 'BoardView', params: {
            name: board.name,
            key: newBoard.key
          }
        })
      ]
    })
    this.props.rootNavigation.navigate('BoardList');
  }

  render() {
    return <View>
      <TextInput
        style={styles.textInput}
        placeholder="Give your board a name..."
        onChangeText={(text) => this.setState({ text })}
      />
      <Button title='Go' onPress={() => this.onCreate(this.state.text)} />
    </View>
  }
}

class ProfileScreen extends Component {
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

class SettingsScreen extends Component {
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

class Hidden extends React.Component {
  render() {
    return null;
  }
}

class SignInScreen extends Component {
  state = {
    email: 'trekker272@live.com',
    password: 'sunfish02'
  }

  static navigationOptions = {
    header: null
  }

  signIn() {
    this.props.screenProps.firebaseApp.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainMenu' })
          ]
        })
        this.props.screenProps.rootNavigation.navigate('BoardList');
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

class RegisterScreen extends Component {
  state = {
    email: '',
    password: ''
  }

  static navigationOptions = {
    title: 'Register'
  }

  register() {
    this.props.screenProps.firebaseApp.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainMenu' })
          ]
        })
        this.props.screenProps.rootNavigation.navigate('BoardList');
      })
      .catch(function (error) {
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
        <Button title='Register' onPress={() => this.register()} />
      </View>
    </View>
  }
}

const FullNavigator = StackNavigator({
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

const HomeNavigator = DrawerNavigator({
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
    screen: ({ navigation, screenProps }) => <FullNavigator screenProps={{ ...screenProps, rootNavigation: navigation }} />,
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

export default class AppNavigator extends Component {
  render() {
    return <HomeNavigator screenProps={this.props} />
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
  nav: {
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  navleft: {
    alignSelf: 'center',
    marginLeft: 10,
    width: 30
  },
  navbanner: {
    alignSelf: 'center',
    fontSize: 16,
  },
  navright: {
    alignSelf: 'center',
    marginRight: 10,
    width: 30
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
});