import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

export default function DataUpdate({ navigation }) {
  const route = useRoute();
  const { itemId } = route.params;

  // State variables for form fields
  const [country, setCountry] = useState('');
  const [place, setPlace] = useState('');
  const [des, setDes] = useState('');

  useEffect(() => {
    // Fetch existing data and populate the form fields
    fetch(`http://192.168.25.76:3000/api/home/getById/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);

        setCountry(data[0].country);
        setPlace(data[0].place);
        setDes(data[0].des);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error here (e.g., show an error message to the user)
      });
  }, [itemId]);

  const Update = () => {
    fetch(`http://192.168.25.76:3000/api/home/note_update/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({
        country: country,
        place: place,
        des: des,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('Update response:', json);
        // After a successful update, navigate back to Home or handle as needed
        navigation.navigate('HomePage');
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        // Handle the error here (e.g., show an error message to the user)
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>The Editing Page</Text>

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
        numberOfLines={16}
        value={des}
        onChangeText={(text) => setDes(text)}
      />

      <Button icon="image" style={styles.addbtn}>
        Pick Image
      </Button>

      <Button
        style={styles.addbtn}
        icon="plus"
        mode="contained"
        onPress={Update}
      >
        Update Note
      </Button>

      <Button
        style={styles.addbtn}
        icon="arrow-left"
        mode="contained"
        onPress={() => {
          navigation.navigate('HomePage'); // Make sure the route name matches your navigation setup
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
  addbtn: {
    marginTop: 20,
  },
});
