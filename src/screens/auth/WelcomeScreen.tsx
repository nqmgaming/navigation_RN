import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = () => {

    const getIsLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('isLogin');
            if (value !== null) {
                console.log(value)
                return value;
            }
        } catch (e) {
            console.log(e)
        }
    }

    const navigation = useNavigation();
    const user = {
        name: 'Nguyen Quang Minh',
        studentId: 'PH31902',
        className: 'MD18305',
    }

    useEffect(() => {
        // move to login screen
        const timer = setTimeout(async () => {
            console.log(getIsLoggedIn())
            if (await getIsLoggedIn()) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Main'}],
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                });
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={[styles.container]}>

            <View style={styles.boxText}>
                <Image source={require('../../assets/images/logo.png')}
                       style={{
                           width: 180,
                           height: 180,
                           borderRadius: 100,
                       }}
                       resizeMode={'contain'}
                />
                <Text style={styles.text}>
                    {user.name}
                </Text>
                <Text style={[styles.text, {
                    fontSize: 16,
                    fontWeight: 'normal',
                    marginBottom: 10,

                }]}>
                    {user.studentId}
                </Text>
                <Text style={[styles.text, {
                    fontSize: 16,
                    fontWeight: 'normal',
                    marginBottom: 10,
                }]}>
                    {user.className}
                </Text>
                <ActivityIndicator size="small" color="#0000ff"/>
            </View>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', // horizontal
    },
    boxText: {
        width: 250,
        height: 400,
        justifyContent: 'center', // vertical
        alignItems: 'center', // horizontal
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .5,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 100,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    }
});
