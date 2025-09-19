import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/Login/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ForgotPasswordScreen from "../screens/Auth/Forgotpassword/ForgotPasswordScreen";
import VerifyCodeScreen from "../screens/Auth/Verifycode/VerifyCodeScreen";
import CodeForgotPassword from "../screens/Auth/Forgotpassword/CodeForgotPassword";
import RegisterScreen from "../screens/Auth/Register/RegisterScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        <Stack.Screen name="codeforgot" component={CodeForgotPassword} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
