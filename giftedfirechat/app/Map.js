import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';

import {
  Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const latitude = this.props.latitude || 37;
    const longitude = this.props.location.longitude || -122;
    console.log(latitude);
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} >
          {this.props.boards.map((board) => {
            <MapView.Marker
              coordinate={board.coordinate}
              title={board.name}
              description={"test"}
            />
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, map: {
    ...StyleSheet.absoluteFillObject,
  },
});