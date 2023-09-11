import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

export default function Addmap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 7.555485920557634, 
    longitude: 80.74352662879582,
    latitudeDelta: 2.2,
    longitudeDelta: 2.2
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location for mapping functionality.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        setMapRegion({
          ...mapRegion,
          latitude,
          longitude,
        });

        try {
          // Send the location data to your backend API
          const response = await axios.post('http://192.168.25.76:3000/api/map/save_map', {
            latitude,
            longitude,
          });
          console.log('Location data sent successfully:', response.data);
        } catch (error) {
          console.error('Location data sending error:', error);
        }
      },
      (error) => {
        console.error('Location error:', error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Current Location" />
        )}
      </MapView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => getLocation()}
      >
        <Text style={styles.buttonText}>Get Current Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    width: '90%',
    height: 50,
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    backgroundColor: 'orange',
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: 'white',
  },
});
