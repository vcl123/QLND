import React, { useState } from "react";
import { StyleSheet, Text, Alert } from "react-native";
import { Formik } from "formik";
import { auth } from '../firebase';
import { passwordResetSchema } from "../utils";
import { Colors } from "../config";
import { View, TextInput, Button, FormErrorMessage } from "../components";
import { sendPasswordResetEmail } from "firebase/auth";

export const ForgotPasswordScreen = ({navigation}) => {
  const [errorState, setErrorState] = useState("");

  const handleSendPasswordResetEmail = (values) => {
    const { email } = values;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Hiển thị thông báo khi email reset đã được gửi thành công
        Alert.alert(
          "Email Đã Được Gửi",
          "Mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.",
          [{ text: "OK", onPress: () => navigation.navigate('Login') }]
        );
      })
      .catch((error) => {
        // Hiển thị lỗi nếu quá trình gửi email gặp vấn đề
        setErrorState(error.message);
        Alert.alert(
          "Lỗi",
          "Không thể gửi email đặt lại mật khẩu. Vui lòng kiểm tra lại email và thử lại.",
          [{ text: "OK" }]
        );
      });
  };

  return (
    <View isSafe style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.screenTitle}>Reset mật khẩu</Text>
      </View>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={passwordResetSchema}
        onSubmit={(values) => handleSendPasswordResetEmail(values)}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <>
            {/* Email input field */}
            <TextInput
              name="email"
              leftIconName="email"
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            <FormErrorMessage error={errors.email} visible={touched.email} />
            {/* Display Screen Error Mesages */}
            {errorState !== "" ? (
              <FormErrorMessage error={errorState} visible={true} />
            ) : null}
            {/* Password Reset Send Email button */}
            <Button style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Gửi email reset</Text>
            </Button>
          </>
        )}
      </Formik>
      {/* Button to navigate to Login screen */}
      <Button
        style={styles.borderlessButtonContainer}
        borderless
        title={"Trở lại đăng nhập"}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  innerContainer: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 20,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
