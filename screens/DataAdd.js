import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default function DataAdd({ navigation }) {
  const [country, setCountry] = useState('');
  const [place, setPlace] = useState('');
  const [des, setDes] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 7.555485920557634,
    longitude: 80.74352662879582,
    latitudeDelta: 2.2,
    longitudeDelta: 2.2,
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
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        setMapRegion({ ...mapRegion, latitude, longitude });
      },
      (error) => {
        console.error(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const NoteSave = () => {
    fetch('http://192.168.25.76:3000/api/home/save_data', {
      method: 'POST',
      body: JSON.stringify({
        country: country,
        place: place,
        des: des,
        latitude: currentLocation?.latitude || 0,
        longitude: currentLocation?.longitude || 0,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.navigate('HomePage');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>The Adding Page</Text>

      <TextInput
        style={styles.fields}
        label="Enter Country"
        value={country}
        onChangeText={(text) => setCountry(text)}
      />

      <TextInput
        style={styles.fields}
        label="Visited Place"
        value={place}
        onChangeText={(text) => setPlace(text)}
      />

      <TextInput
        style={styles.fields}
        label="Take a Note"
        multiline={true}
        numberOfLines={6}
        value={des}
        onChangeText={(text) => setDes(text)}
      />

      <MapView style={styles.map} region={mapRegion}>
        {currentLocation && <Marker coordinate={currentLocation} title="Current Location" />}
      </MapView>

      <Button
        style={styles.addbtn}
        icon="plus"
        mode="contained"
        onPress={NoteSave}
        disabled={!country || !place || !des}
      >
        Add Note
      </Button>

      <Button
        style={styles.addbtn}
        icon="arrow-left"
        mode="contained"
        onPress={() => {
          navigation.navigate('HomePage');
        }}
      >
        Back to the Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#dde2eb',
  },
  heading: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  fields: {
    backgroundColor: 'white',
    marginTop: 20,
  },
  map: {
    flex: 1,
    marginTop: 20,
    width:'100%'
    
  },
  addbtn: {
    marginTop: 20,
    backgroundColor: '#5171f0',
  },
});
