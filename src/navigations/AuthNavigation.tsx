import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import MainNavigation from "./MainNavigation";

const Stack = createStackNavigator();
const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={
            {
                headerShown: false,
                cardStyle: {backgroundColor: "white"}
            }
        }>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Main" component={MainNavigation}/>
        </Stack.Navigator>
    );
};

export default AuthNavigation;
