import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase'
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob'


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
  TextInput,
  Image,
  ActivityIndicator
} from 'react-native';

const fs = RNFetchBlob.fs

const uploadImage = (uri, storage, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const mapStateToProps = function (state) {
  return {
    firebase: state.firebase,
  }
}

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const user = this.props.firebase.auth().currentUser;
    this.state = {
      displayName: user.displayName || '',
      photoURL: user.photoURL,
      uploadURL: user.photoURL || null
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

  _pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchImageLibrary({}, response => {
      uploadImage(response.uri, this.props.firebase.storage())
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
    })
  }

  updateProfile() {
    this.props.firebase.auth().currentUser.updateProfile({
      displayName: this.state.displayName,
      photoURL: this.state.uploadURL
    }).then(() => {
      alert('Successfully updated your info');
    }, function (error) {
      alert(error);
    });
  }

  render() {
    return <View style={styles.container}>
      <CoreNavBar banner={'Profile'} navigation={this.props.navigation} />
      <View style={styles.profile}>
        <View style={{}}>
          {
            (() => {
              switch (this.state.uploadURL) {
                case null:
                  return null
                case '':
                  return <ActivityIndicator />
                default:
                  return (
                    <TouchableOpacity onPress={() => this._pickImage()}>
                      <Image
                        source={{ uri: this.state.uploadURL }}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  )
              }
            })()
          }
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ displayName: text })}
            value={this.state.displayName}
            placeholder={'User name'}
          />
        </View>
      </View>
      <Button style={{}} title='Save' onPress={() => this.updateProfile()} />
    </View>
  }
}
export default connect(mapStateToProps, null)(ProfileScreen)

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
  },
  profile: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textInput: {
    height: 50,
    width: 250,
    textAlign: 'center'
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
});