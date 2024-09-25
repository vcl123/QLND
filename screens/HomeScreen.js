import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddUser from '../components/AddUser';
import UserList from '../components/UserList';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const HomeScreen = () => {
    const [refresh, setRefresh] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const scrollViewRef = useRef(); // Khai báo ref cho ScrollView

    const refreshUsers = () => {
        console.log("Refreshing users...");
        setRefresh(prev => !prev);
    };

    const handleEditUser = (user) => {
        console.log("Editing user:", user);
        setEditingUser(user);

        // Cuộn đến phần nhập thông tin
        scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Cuộn lên đầu ScrollView
    };

    const handleClearEditingUser = () => {
        console.log("Clearing editing user");
        setEditingUser(null);
    };

    return (
        <SafeAreaProvider>
            <ScrollView 
                ref={scrollViewRef} // Gán ref cho ScrollView
                contentContainerStyle={styles.container}
            >
                <Text style={styles.title}>
                    Quản lý người dùng
                </Text>
                <AddUser 
                    refreshUsers={refreshUsers} 
                    editingUser={editingUser} 
                    setEditingUser={handleClearEditingUser} 
                />
                <UserList 
                    refresh={refresh} 
                    onEditUser={handleEditUser} 
                />
            </ScrollView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexGrow: 1,
        backgroundColor: '#FFF9C4',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: 'red',
    },
});
