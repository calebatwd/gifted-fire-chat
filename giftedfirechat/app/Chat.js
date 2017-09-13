import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';

export default class Chat extends Component {
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