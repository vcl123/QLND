import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Card, Title, Snackbar } from 'react-native-paper';
import { addUser, updateUser } from '../userService'; 
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên là bắt buộc'),
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  age: Yup.number().positive('Tuổi phải lớn hơn 0').integer('Tuổi phải là số nguyên').required('Tuổi là bắt buộc'),
});

function AddUser({ refreshUsers, editingUser, setEditingUser }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log("Editing user changed:", editingUser);
    if (editingUser) {
      setVisible(false); // Đóng snackbar khi bắt đầu chỉnh sửa
    }
  }, [editingUser]);

  const handleAddUser = async (values, { resetForm }) => {
    console.log("Adding user:", values);
    try {
      await addUser(values);
      setMessage('Người dùng đã được thêm thành công!');
      setVisible(true);
      refreshUsers();
      resetForm();
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage('Không thể thêm người dùng.');
      setVisible(true);
    }
  };

  const handleUpdateUser = async (values, { resetForm }) => {
    console.log("Updating user:", editingUser.id, "with values:", values);
    try {
      await updateUser(editingUser.id, values);
      setMessage('Người dùng đã được cập nhật thành công!');
      setVisible(true);
      refreshUsers();
      resetForm();
      setEditingUser(null); 
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage('Không thể cập nhật người dùng.');
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title >{editingUser ? 'Cập Nhật Người Dùng' : 'Thêm Người Dùng Mới'}</Title>
          <Formik
            initialValues={{
              name: editingUser ? editingUser.name : '',
              email: editingUser ? editingUser.email : '',
              age: editingUser ? String(editingUser.age) : '',
            }}
            validationSchema={validationSchema}
            enableReinitialize={true} // Cho phép tái khởi tạo khi editingUser thay đổi
            onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <TextInput
                  label="Tên"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.input}
                  mode="outlined"
                  error={!!errors.name}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                
                <TextInput
                  label="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  style={styles.input}
                  mode="outlined"
                  error={!!errors.email}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                
                <TextInput
                  label="Tuổi"
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values.age}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  error={!!errors.age}
                />
                {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
                
                <Button mode="contained" onPress={handleSubmit} style={styles.button} labelStyle={styles.labelStyle}>
                  {editingUser ? 'Cập Nhật Người Dùng' : 'Thêm Người Dùng'}
                </Button>
              </>
            )}
          </Formik>
        </Card.Content>
      </Card>
      
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
      >
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ADD8E6',
  },
  labelStyle: {
    color: 'black', // Màu chữ đen
  },
  errorText: {
    color: 'red',
  },
});

export default AddUser;