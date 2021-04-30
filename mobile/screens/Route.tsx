import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Trip} from '../types';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {MAPS_API_TOKEN} from 'react-native-dotenv';

type Props = {
  trip: Trip | undefined;
};

const Route = (props: Props) => {
  return (
    <View style={styles.container}>
      {props.trip && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude:
              (props.trip.dropOffZone.latitude +
                props.trip.pickUpZone.latitude) /
              2,
            longitude:
              (props.trip.dropOffZone.longitude +
                props.trip.pickUpZone.longitude) /
              2,
            latitudeDelta:
              Math.abs(
                props.trip.dropOffZone.latitude -
                  props.trip.pickUpZone.latitude,
              ) / 0.6,
            longitudeDelta:
              Math.abs(
                props.trip.dropOffZone.longitude -
                  props.trip.pickUpZone.longitude,
              ) / 0.6,
          }}>
          <MapViewDirections
            origin={{
              latitude: props.trip.pickUpZone.latitude,
              longitude: props.trip.pickUpZone.longitude,
            }}
            destination={{
              latitude: props.trip.dropOffZone.latitude,
              longitude: props.trip.dropOffZone.longitude,
            }}
            apikey={MAPS_API_TOKEN}
            strokeWidth={5}
            strokeColor={'#4974a0'}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default Route;
