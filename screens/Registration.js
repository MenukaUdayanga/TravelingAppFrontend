import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputFileds from "../components/InputFileds";
import ButtonEdit from "../components/ButtonEdit";

export default function Registration({ navigation }) {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reenteredPassword, setReenteredPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [reenteredPasswordError, setReenteredPasswordError] = useState('');


    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);



    }

    const UserRegister = () => {

        // Clear previous errors
        setEmailError('');
        setPhoneError('');
        setUsernameError('');
        setPasswordError('');
        setReenteredPasswordError('');

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }


        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!phone) {
            setPhoneError('Phone number is required');
            return;
        }
        if (!username) {
            setUsernameError('Username is required');
            return;
        }
        if (!password) {
            setPasswordError('Password is required');
            return;
        }

        if (!reenteredPassword) {
            setReenteredPasswordError('Re-enter password is required');
            return;
        }

        if (password !== reenteredPassword) {
            setReenteredPasswordError('Passwords do not match');
            return;
        }



       
  fetch('http://192.168.243.76:3000/api/register/user_register', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      phone: phone,
      username: username,
      password: password
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      if (json.success) {
        
        navigation.navigate('LoginPage');
      } else {
       
        navigation.navigate('LoginPage');
      }
    })
    .catch((error) => {
      console.error('Error during registration:', error);
      
    });
};
    

    return (
        <View style={styles.container}>

            <View style={styles.conOne}>
                <Text style={styles.heading}>Registration</Text>
            </View>

            <View style={styles.conTwo}>

                {/* List Of Lables  */}


                <InputFileds label='Email' value={email} onChangeText={(text) => setEmail(text)} />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <InputFileds label='Phone Number' value={phone} onChangeText={(text) => setPhone(text)} />
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

                <InputFileds label='Username' value={username} onChangeText={(text) => setUsername(text)} />
                {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

                <InputFileds label='Password' secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                <InputFileds label='Confirm-Password' secureTextEntry={true} value={reenteredPassword} onChangeText={(text) => setReenteredPassword(text)} />
                {reenteredPasswordError ? <Text style={styles.errorText}>{reenteredPasswordError}</Text> : null}


                <ButtonEdit label='Regiatration' icon='login' marginTop={50} backgroundColor='#4b8bf2'
                    onPress={UserRegister}>
                    Registration
                </ButtonEdit>

                <Text style={styles.secoText}>If You have already register!</Text>

                <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} >
                    <Text style={styles.alaccount}>Login Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    conOne: {
        flex: 1
    },
    conTwo: {
        flex: 9
    },
    heading: {
        color: 'black',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 10
    },
    secoText: {
        color: 'black',
        marginLeft: 40,
        marginTop: 16,
        fontSize: 17,
        fontWeight: '500'
    },
    alaccount: {
        color: '#4cdbf5',
        marginLeft: 40,
        fontSize: 17,
        textDecorationLine: 'underline',
        fontWeight: '500'
    },
    errorText: {
        color: 'red',
        marginLeft: 40,
        marginTop: 5,
        fontSize: 14,
        fontWeight: '500'
    }

})
