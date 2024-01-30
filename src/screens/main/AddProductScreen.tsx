import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Input, Button} from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';

const AddProductScreen = () => {
    const db = SQLite.openDatabase('db.db');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [errorName, setErrorName] = useState('');
    let [studentId, setStudentId] = useState<string>('');
    const [errorStudentId, setErrorStudentId] = useState('');
    const navigation = useNavigation();

    // validate name
    const validateName = () => {
        if (name === '') {
            setErrorName('Name is required');
            return false;
        }
        setErrorName('');
        return true;
    };

    // validate studentId
    const validateStudentId = () => {
        if (studentId === '') {
            setErrorStudentId('Student ID is required');
            return false;
        } else if (studentId.length !== 7) {
            setErrorStudentId('Student ID must be 8 characters');
            return false;
        } else if (!handleStudentIdRegex(studentId)) {
            setErrorStudentId('Student ID must be 2 characters and 5 numbers');
            return false;
        }
        setErrorStudentId('');
        return true;
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    const handleCancel = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
        });
    };

    const handleStudentIdRegex = (text: string) => {
        const regex = /^[A-Z]{2}\d{5}$/;
        return regex.test(text);
    }

    const handleAdd = () => {
        console.log(name, studentId, selectedImage);
        console.log(validateName(), validateStudentId());
        if (validateName() && validateStudentId()) {
            studentId = studentId.toUpperCase();
            db.transaction(tx => {
                tx.executeSql(
                    'insert into users (name, studentId, avatar) values (?, ?, ?)',
                    [name, studentId, selectedImage]
                );
            });
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
            });
        }
    }

    return (
        <View style={styles.container}>
            <Avatar
                size={120}
                rounded
                icon={{name: 'user', type: 'feather'}}
                source={{
                    uri: selectedImage ? selectedImage : 'https://i.pravatar.cc/300',
                }}
                containerStyle={{backgroundColor: 'grey'}}
                onPress={pickImageAsync}
            >
                <Avatar.Accessory size={23}/>
            </Avatar>
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
            }}>
                <View>
                    <Input
                        containerStyle={{width: 300}}
                        label="Name"
                        value={name}
                        errorMessage={errorName}
                        onChangeText={setName}
                        placeholder="Enter name"/>
                </View>
                <View>
                    <Input
                        containerStyle={{width: 300}}
                        label="Student ID"
                        value={studentId}
                        errorMessage={errorStudentId}
                        onChangeText={setStudentId}
                        maxLength={7}
                        placeholder="Enter student ID"/>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 250,
                }}>
                    <Button
                        color="primary"
                        type="solid"
                        buttonStyle={{
                            width: 120
                        }}
                        radius={10}
                        onPress={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        type="solid"
                        buttonStyle={{
                            width: 120
                        }}
                        radius={10}
                        onPress={() => {
                            handleAdd();
                        }}
                    >
                        Add
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});

export default AddProductScreen;
