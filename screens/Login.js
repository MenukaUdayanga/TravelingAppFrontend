import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator,Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const API_URL = 'http:/192.168.243.76:3000/api/login/user_login';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          email:email,
          password:password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('HomePage');
      }

      else if (!email || !password) {
        setErrorMessage('Please enter both username and password.');
        return;
      }

      else {
        setErrorMessage(data.error || 'An error occurred.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">

      <View style={{flex:2}}>
      <Text style={styles.logo}>Travel View</Text>

      <Image
        style={styles.image}
        source={require('../images/logo.jpg')}
      />


      
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>


      <Text style={styles.title}>Sign in</Text>


        <TextInput
          style={styles.input}
          label="Enter Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          style={styles.loginButton}
          mode="contained"
          onPress={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? <ActivityIndicator color="black" /> : 'Login'}
        </Button>
        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <Text style={styles.account}>If You haven't the user account.?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('RegistrationPage')}>
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>

      </ScrollView>

      <View style={{flex:0.5}}> 
      
      
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign:'center',
    marginTop:50
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    color: 'black',
    position:'relative',
    right:110
    
    
  },
  input: {
    width: '80%',
    marginBottom: 15,
    backgroundColor:'#e4eded'  
  },
  loginButton: {
    width: '80%',
    marginTop: 20,
    
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  registerText: {
    color: '#4cdbf5',
    fontSize: 17,
    textDecorationLine: 'underline',
    marginTop: 2,
    fontWeight: '500'
  },
  account: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500'
  },
  image:{
    position:'relative',
    width:200,
    height:200,
    bottom:20,
    left:100
  }
});
