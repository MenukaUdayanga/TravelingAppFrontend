import 'react-native-gesture-handler';
import React from "react";
import { View, Text } from 'react-native';
import Registration from "./screens/Registration";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import DataAdd from './screens/DataAdd';
import DataUpdate from './screens/DataUpdate';
import Addmap from './screens/Addmap';


const Stack = createStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomePage" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="AddMapPage" component={Addmap} options={{ headerShown: false }} />
                <Stack.Screen name="LoginPage" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="RegistrationPage" component={Registration} options={{ headerShown: false }} />
                <Stack.Screen name="DataAddPage" component={DataAdd} options={{ headerShown: false }} />
                <Stack.Screen name="DataUpdatePage" component={DataUpdate} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
