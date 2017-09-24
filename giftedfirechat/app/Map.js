import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
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

const mapStateToProps = function (state) {
  return {
    location: state.location,
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: this.props.location.coordinate.latitude,
            longitude: this.props.location.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} >
          {this.props.boards.map((board) => {
            return <MapView.Marker
              coordinate={{ latitude: board.coordinate.latitude, longitude: board.coordinate.longitude }}
              title={board.name}
              description={"test"}
            />
          })}
        </MapView>
      </View>
    );
  }
}
export default connect(mapStateToProps, null)(Map)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, map: {
    ...StyleSheet.absoluteFillObject,
  },
});