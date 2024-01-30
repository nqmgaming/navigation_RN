import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import HomeScreen from "../screens/main/HomeScreen";
import IntroduceScreen from "../screens/main/IntroduceScreen";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import HomeNavigation from "./HomeNavigation";
import {useRoute} from "@react-navigation/native"; // import the icon library

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
    const route = useRoute();
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
