import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/main/HomeScreen";
import AddProductScreen from "../screens/main/AddProductScreen";

const Stack = createStackNavigator();
const HomeNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: "white"}
        }}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="AddProduct" component={AddProductScreen}
            options={{
                headerShown: true,
                headerBackTitleVisible: true,
                headerTitleAlign: 'center',
            }}

            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeNavigation;
