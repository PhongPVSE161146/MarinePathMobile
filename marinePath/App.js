import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Import SafeAreaProvider
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}