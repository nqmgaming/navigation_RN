import React, {useState} from 'react';
import {Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [toggleModel, setToggleModel] = useState(false);

    const user = {
        username: 'admin',
        password: 'admin',
    };

    const navigation = useNavigation();

    // validate username
    const validateUsername = (value: string) => {
        if (!value) {
            setErrorUsername('Username is required');
            setToggleModel(true)
            return false;
        } else if (value !== user.username) {
            setErrorUsername('Username is incorrect');
            setToggleModel(true)
            return false;
        }
        setErrorUsername('');
        return true;
    };

    // validate password
    const validatePassword = (value: string) => {
        if (!value) {
            setErrorPassword('Password is required');
            setToggleModel(true)
            return false;
        } else if (value !== user.password) {
            setErrorPassword('Password is incorrect');
            setToggleModel(true)
            return false;
        }
        setErrorPassword('');
        return true;
    };

    // handle login
    const handleLogin = () => {
        if (validateUsername(username) && validatePassword(password)) {
            saveLogin()
            navigation.reset({
                index: 0,
                routes: [{name: 'Main'}],
            });
        }
    };

    // save login
    const saveLogin = async () => {
        try {
            await AsyncStorage.setItem('username', username)
            await AsyncStorage.setItem('password', password)
            await AsyncStorage.setItem('isLogin', 'true')
            console.log('save login success')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/images/welcome.png')}
                   style={{
                       width: 120,
                       height: 120,
                       marginTop: 20
                   }}
                   resizeMode={'contain'}
            />
            <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 10,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: .5,
                shadowRadius: 10,
                elevation: 5,
            }}>
                Login to continue
            </Text>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    position: 'relative',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: toggleModel ? 'red' : '#000',
                    borderRadius: 10,
                    marginBottom: 10,
                }}>
                    <Image source={require('../../assets/images/email.png')} style={{
                        width: 20,
                        height: 20,
                        position: 'absolute',
                        top: 15,
                        left: 15,
                        tintColor: toggleModel ? 'red' : 'black'
                    }} resizeMode={'contain'}/>

                    <TextInput
                        style={{
                            width: 300,
                            height: 50,
                            paddingLeft: 40,
                            paddingRight: 10,
                        }}
                        placeholder={'Username'}
                        keyboardType={'default'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        clearButtonMode={'always'}
                        value={username}
                        onChangeText={(value) => setUsername(value)}
                    />
                </View>
                <View style={{
                    position: 'relative',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: toggleModel ? 'red' : '#000',
                    borderRadius: 10,
                }}>
                    <Image source={require('../../assets/images/lock.png')} style={{
                        width: 20,
                        height: 20,
                        position: 'absolute',
                        top: 15,
                        left: 15,
                        tintColor: toggleModel ? 'red' : 'black'
                    }} resizeMode={'contain'}/>

                    <TextInput
                        style={{
                            width: 300,
                            height: 50,
                            paddingLeft: 40,
                            paddingRight: 10,
                        }}
                        placeholder={'Password'}
                        secureTextEntry={!showPassword}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />

                    {showPassword ? (
                        <TouchableOpacity style={{
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            top: 15,
                            right: 15,
                        }} onPress={() => setShowPassword(false)}>
                            <Image source={require('../../assets/images/eye.png')} style={{
                                width: 20,
                                height: 20,
                                tintColor: toggleModel ? 'red' : 'black'
                            }} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            top: 15,
                            right: 15,
                        }} onPress={() => setShowPassword(true)}>
                            <Image source={require('../../assets/images/eye-off.png')} style={{
                                width: 20,
                                height: 20,
                                tintColor: toggleModel ? 'red' : 'black'
                            }} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    )}

                </View>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#4e5f80',
                        borderWidth: 0,
                        borderColor: '#E2E8F0',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 4},
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        height: 56,
                        justifyContent: 'center',
                        borderRadius: 15,
                        width: 180,
                        marginTop: 15,
                    }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '700',
                        lineHeight: 24,
                        textAlign: 'center',
                    }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={toggleModel}>
                <TouchableOpacity style={styles.box}>
                    <View style={styles.modalContainer}>
                        <Image source={require('../../assets/images/error.png')}
                               style={{
                                   width: 40,
                                   height: 40,
                                   marginTop: 20
                               }}
                               resizeMode={'contain'}
                        />
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 20,
                        }}>
                            Login failed
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'normal',
                            marginBottom: 5,
                            textAlign: 'center',
                        }}>
                            Username or password is incorrect
                        </Text>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            backgroundColor: '#6c3880',
                            borderWidth: 0,
                            borderColor: '#E2E8F0',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 4},
                            shadowOpacity: 0.1,
                            shadowRadius: 6,
                            height: 56,
                            justifyContent: 'center',
                            borderRadius: 15,
                            width: 120
                        }} onPress={() => setToggleModel(false)
                        }>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#fff',
                            }}>
                                Try again
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 50,
        marginVertical: 250,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    box: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(96,96,96,0.7)',
    }

});

export default LoginScreen;
