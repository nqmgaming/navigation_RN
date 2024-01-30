import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import HomeScreen from "../screens/main/HomeScreen";
import IntroduceScreen from "../screens/main/IntroduceScreen";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import HomeNavigation from "./HomeNavigation";
import {useNavigation, useRoute} from "@react-navigation/native"; // import the icon library
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props) => {

    return (
        <DrawerContentScrollView {...props}>
            <View style={{padding: 20, alignItems: 'center'}}>
                <Ionicons name="person-circle-outline" size={100} color="black" />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Hello, User!</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};
const MainNavigation = () => {
    const navigation = useNavigation();
    const handleLogout = async () => {
        await AsyncStorage.removeItem('isLogin');
        navigation.navigate('Login');
    };
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            initialRouteName="Home"
            screenOptions={({ navigation }) => ({
                headerLeft: () => (
                    <MaterialCommunityIcons
                        name="menu"
                        size={24}
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginLeft: 10 }}
                    />
                ),
            })}
        >
            <Drawer.Screen
                name="HomeMain"
                component={HomeNavigation}
                options={{
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                    headerShown: true,
                    headerTitle: 'Home',
                    drawerInactiveBackgroundColor: '#e6e6e6',
                    drawerActiveBackgroundColor: '#e6e6e6',
                    drawerPosition: 'right',
                    drawerType: 'front'
                }}
            />
            <Drawer.Screen
                name="Introduce"
                component={IntroduceScreen}
                options={{
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name={focused ? 'information-circle' : 'information-circle-outline'}
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                    headerShown: true,
                    headerTitle: 'Introduce',
                }}
            />
            <Drawer.Screen
                name="Logout"
                component={View} // This won't be rendered
                options={{
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name={focused ? 'log-out' : 'log-out-outline'}
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
                listeners={{
                    focus: async () => {
                        Alert.alert(
                            "Logout",
                            "Are you sure you want to logout?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                { text: "OK", onPress: () => handleLogout() }
                            ]
                        );
                    },
                }}
            />
        </Drawer.Navigator>
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

export default MainNavigation;
