import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./navigation/RootNavigator"; // Import đúng điều hướng chính
import { AuthenticatedUserProvider } from "./providers"; // Import provider
import './firebase'; // Đảm bảo Firebase đã được khởi tạo

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
};

export default App;