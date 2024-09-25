import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserList from '../components/UserList'; // Giả sử UserList đã xử lý việc hiển thị người dùng

export const UserListScreen = ({ route }) => {
    const { refresh } = route.params || {}; // Nhận tham số nếu có

    return (
        <View style={styles.container}>
            <UserList refresh={refresh} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexGrow: 1,
    },
});
