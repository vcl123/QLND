import React, { useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth } from '../firebase';
import { View, TextInput, Logo, Button, FormErrorMessage } from "../components";
import { Images, Colors } from "../config";
import { useTogglePasswordVisibility } from "../hooks";
import { loginValidationSchema } from "../utils";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();

  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // Hiển thị thông báo khi đăng nhập thành công
        Alert.alert(
          "Đăng nhập thành công",
          `Chào mừng, ${user.email}!`,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('Home') // Điều hướng đến màn hình Home
            }
          ]
        );
      })
      .catch((error) => {
        // Kiểm tra mã lỗi Firebase và hiển thị thông báo phù hợp
        switch (error.code) {
          case "auth/wrong-password":
            setErrorState("Mật khẩu không chính xác.");
            break;
          case "auth/user-not-found":
            setErrorState("Tài khoản không tồn tại.");
            break;
          case "auth/invalid-email":
            setErrorState("Email không hợp lệ.");
            break;
          default:
            setErrorState("Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại.");
        }
      });
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* LogoContainer: chứa logo và tiêu đề màn hình */}
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Đăng nhập</Text>
        </View>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => handleLogin(values)}
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
              {/* Input cho email */}
              <TextInput
                name="email"
                leftIconName="email"
                placeholder="Nhập email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <FormErrorMessage
                error={errors.email}
                visible={touched.email}
              />
              {/* Input cho mật khẩu */}
              <TextInput
                name="password"
                leftIconName="key-variant"
                placeholder="Nhập mật khẩu"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType="password"
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <FormErrorMessage
                error={errors.password}
                visible={touched.password}
              />
              {/* Hiển thị thông báo lỗi từ Firebase */}
              {errorState !== "" ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
              {/* Nút đăng nhập */}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </Button>
            </>
          )}
        </Formik>
        {/* Nút điều hướng đến màn hình đăng ký */}
        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title={"Tạo tài khoản mới?"}
          onPress={() => navigation.navigate('Signup')}
        />
        {/* Nút điều hướng đến màn hình quên mật khẩu */}
        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title={"Quên mật khẩu"}
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  logoContainer: {
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
