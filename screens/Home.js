import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, ActivityIndicator,FAB} from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isIntervalActive, setIsIntervalActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [mapRegion, setMapRegion] = useState({
    latitude: 7.555485920557634,
    longitude: 80.74352662879582,
    latitudeDelta: 2.2,
    longitudeDelta: 2.2,
  });

  useEffect(() => {
    DataAll();

    if (isIntervalActive) {
      const interval = setInterval(DataAll, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isIntervalActive]);

  const DataAll = () => {
    fetch('http://192.168.25.76:3000/api/home/get_data')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setIsLoad(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoad(true);
      });
  };

  const Delete = (itemId) => {
    fetch(`http://192.168.25.76:3000/api/home/data_delete/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Note deleted successfully, you might want to refresh the data.
          DataAll();
        } else {
          console.error('Error deleting note:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };

  const confirmDelete = (itemId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Delete(itemId),
        },
      ],
      { cancelable: true }
    );
  };

  const fetchDataWithQuery = (query) => {
    setIsLoad(false); // Show loading indicator

    fetch(`http://192.168.25.76:3000/api/home/search/${query}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setIsLoad(true); // Hide loading indicator
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoad(true); // Hide loading indicator on error
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query) {
      // If the query is empty, reset the data to the original data.
      DataAll();
    } else {
      // Fetch data based on the search query.
      fetchDataWithQuery(query);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.onecon}>
        <Text style={styles.homeText}>Home Page</Text>
      </View>

      <TextInput
        label="Search bar"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchbox}
      />

      {isLoad ? (
        <View style={{ flex: 10, paddingBottom: 20 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              const formattedDate = new Date(item.travel_date).toLocaleDateString();
              return (
                <View style={styles.edit}>
                  <Text style={styles.date}>Date: {formattedDate}</Text>
                  <Text style={styles.time}>Time: {item.travel_time}</Text>
                  <Text style={styles.am_pm}>{item.am_pm}</Text>
                  <Text style={styles.sub}>Country: {item.country}</Text>
                  <Text style={styles.topic}>Place: {item.place}</Text>
                  <Text style={styles.note}>Description: {item.des}</Text>

                  <MapView
                    style={styles.map}
                    region={{
                      latitude: parseFloat(item.latitude),
                      longitude: parseFloat(item.longitude),
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                      }}
                      title={item.place}
                      description={item.des}
                    />
                  </MapView>

                  <Button
                    style={styles.update}
                    icon="pencil"
                    mode="contained"
                    onPress={() => navigation.navigate('DataUpdatePage', { itemId: item.t_id })}
                  >
                    Update
                  </Button>

                  <Button
                    style={styles.delete}
                    icon="delete"
                    mode="contained"
                    onPress={() => confirmDelete(item.t_id)}
                  >
                    Delete
                  </Button>
                </View>
              );
            }}
            keyExtractor={(item) => item.t_id.toString()} // Ensure the key is a string
          />
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate('DataAddPage')}
          />
        </View>
      ) : (
        <ActivityIndicator color="#e83143" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  edit: {
    marginTop: '5%',
    borderWidth: 2,
    borderColor: 'red',
    padding: 20,
    width: '90%',
    marginLeft: '5%',
  },
  onecon: {
    flex: 1,
    backgroundColor: '#4576f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  searchbox: {
    width: '90%',
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: '5%',
    backgroundColor: '#a8b1e6',
  },
  date: {
    color: 'black',
  },
  time: {
    color: 'black',
    position: 'relative',
    left: 180,
    bottom: 21,
  },
  sub: {
    color: 'black',
  },
  topic: {
    paddingTop: 10,
    color: 'black',
  },
  note: {
    paddingTop: 10,
    color: 'black',
  },
  update: {
    backgroundColor: '#31d6e8',
    width: '40%',
    height: 50,
    position: 'relative',
    top: 50,
  },
  delete: {
    backgroundColor: '#e83143',
    width: '40%',
    height: 50,
    position: 'relative',
    left: 170,
  },
  am_pm: {
    color: 'black',
    position: 'relative',
    left: 290,
    bottom: 42,
  },
  map: {
    height: 200,
    marginTop: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#9adbc4'
  }

});