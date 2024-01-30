import {StyleSheet, Text, View} from 'react-native';
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthNavigation from "./src/navigations/AuthNavigation";

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
