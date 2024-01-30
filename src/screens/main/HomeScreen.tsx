import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FAB, SearchBar} from '@rneui/themed';
import {useNavigation} from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';

const HomeScreen = () => {
    const db = SQLite.openDatabase('db.db');
    const [search, updateSearch] = React.useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [listUsers, setListUsers] = useState([]);
    const navigation = useNavigation();

    const fetchData = () => {
        db.transaction(tx => {
            tx.executeSql(
                'select * from users',
                [],
                (_, {rows: {_array}}) => setListUsers(_array),
            );
        });
    };

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists users (id integer primary key not null, name text, studentId text, avatar text);'
            );
        });
        fetchData();
        setLoading(false);

    }, []);

    const filteredUsers = listUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const refresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    }

    const handleFAB = () => {
        navigation.navigate('AddProduct');
    };

    const deleteAddData = () => {
        db.transaction(tx => {
            tx.executeSql(
                'delete from users',
                [],
                (_, {rows: {_array}}) => setListUsers(_array),
            );
        });
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator animating={loading} size="large" color="#0000ff"/>
                <Text>
                    Loading...
                </Text>
            </SafeAreaView>);

    }

    // @ts-ignore
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                placeholder="Search..."
                onChangeText={updateSearch}
                value={search}
                clearIcon
                searchIcon
                lightTheme
                containerStyle={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                    borderColor: '#4e5f80',
                    height: 50
                }}
                inputContainerStyle={{borderRadius: 10, borderColor: '#4e5f80', height: 50}}
            />
            <FlatList style={{
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10,
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 10,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: .5,
                shadowRadius: 10,
                elevation: 5,
            }}
                      refreshing={true}
                      refreshControl={
                          <RefreshControl
                              refreshing={refreshing}
                              onRefresh={refresh}
                          />
                      }
                      data={filteredUsers}
                      renderItem={({item}) => (
                          <View style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              backgroundColor: '#3a6ecd',
                              borderRadius: 10,
                              padding: 10,
                              marginBottom: 10,
                              shadowColor: '#000',
                              shadowOffset: {
                                  width: 0,
                                  height: 0,
                              },
                              shadowOpacity: .5,
                              shadowRadius: 10,
                              elevation: 5,

                          }}>
                              <Image source={
                                  item.avatar ? {uri: item.avatar} : require('../../assets/images/logo.png')
                              }
                                     style={{
                                         width: 50,
                                         height: 50,
                                         borderRadius: 100,
                                     }}
                                     resizeMode={'contain'}
                              />
                              <View style={{
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  marginLeft: 10,
                              }}>
                                  <Text style={{
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: '#fff'
                                  }}>{item.name}</Text>
                                  <Text style={{
                                      fontSize: 14,
                                      fontWeight: 'normal',
                                      color: '#fff'
                                  }}>{item.studentId}</Text>
                              </View>
                          </View>
                      )}
                      keyExtractor={item => item.id}
            />
            <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 10,
                    bottom: 40,
                    backgroundColor: '#3a6ecd',
                }}
                icon={{name: 'add', color: 'white'}}
                onPress={handleFAB}
            />
            <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    left: 10,
                    bottom: 40,
                    backgroundColor: '#3a6ecd',
                }}
                icon={{name: 'clear', color: 'white'}}
                onPress={deleteAddData}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default HomeScreen;
