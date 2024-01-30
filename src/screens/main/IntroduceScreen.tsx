import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {Avatar} from '@rneui/themed';

const IntroduceScreen = () => {
    return (
        <View style={styles.container}>
            <Avatar
                size={120}
                rounded
                source={{
                    uri: 'https://avatars.githubusercontent.com/u/94773751?v=4'
                }}
                icon={{name: 'adb', type: 'material'}}
                containerStyle={{backgroundColor: 'orange', marginTop: 50}}
            >
            </Avatar>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 10,
            }}>
                nqmgaming
            </Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 250,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: 'black',
                marginTop: 20,
                padding: 10,
                borderRadius: 10,
            }}>
                <Avatar
                    onPress={() => Linking.openURL('https://github.com/nqmgaming')}
                    size={50}
                    rounded
                    icon={{name: 'github', type: 'antdesign'}}
                    containerStyle={{backgroundColor: 'black', marginTop: 10}}
                >
                </Avatar>
                <Avatar
                    onPress={() => Linking.openURL('https://www.youtube.com/channel/UCs90j_mc0KKvLP2Wfgjxt5w')}
                    size={50}
                    rounded
                    icon={{name: 'youtube', type: 'antdesign'}}
                    containerStyle={{backgroundColor: 'red', marginTop: 10}}
                >
                </Avatar>
                <Avatar
                    onPress={() => Linking.openURL('https://www.facebook.com/nqmgaming.1207')}
                    size={50}
                    rounded
                    icon={{name: 'facebook-square', type: 'antdesign'}}
                    containerStyle={{backgroundColor: 'blue', marginTop: 10}}
                >
                </Avatar>
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

export default IntroduceScreen;
