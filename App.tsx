import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import WelcomeScreen from "./src/screens/auth/WelcomeScreen";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthNavigation from "./src/navigations/AuthNavigation";
import MainNavigation from "./src/navigations/MainNavigation";

export default function App() {
    return (
        <NavigationContainer>
            <AuthNavigation/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
