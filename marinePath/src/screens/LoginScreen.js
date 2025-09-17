import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password !== "123456") {
      setError("Wrong password");
    } else {
      setError("");
      navigation.navigate("Home"); // chuyển sang Home khi login đúng
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Text style={[styles.tabActive]}>Log in</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.tabInactive}>Sign up</Text>
          
        </TouchableOpacity>
      </View>

      {/* Email */}
      <Text style={styles.label}>Tài Khoản</Text>
      <TextInput
        style={styles.input}
        placeholder="contact@dscodetech.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password */}
      <Text style={styles.label}>Mật Khẩu</Text>
      <View style={[styles.input, error ? styles.inputError : null]}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter password"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Forgot Password */}
      <TouchableOpacity
        style={styles.forgotBtn}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.forgotText}>Quên Mật Khẩu?</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleLogin}>
        <Text style={styles.continueText}>Tiếp Tục</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>

      {/* Social Login */}
      <TouchableOpacity style={styles.socialBtn}>
  <Ionicons name="logo-apple" size={22} color="black" />
  <Text style={styles.socialText}>Login with Apple</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.socialBtn}>
        <AntDesign name="google" size={20} color="black" />
        <Text style={styles.socialText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Sign Up */}
      <View style={styles.signupContainer}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  tabActive: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E64D0",
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#1E64D0",
    paddingBottom: 5,
  },
  tabInactive: {
    fontSize: 18,
    color: "#ccc",
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotText: {
    color: "#1E64D0",
    fontSize: 13,
  },
  continueBtn: {
    marginTop: 15,
    backgroundColor: "#1E64D0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 15,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  signupText: {
    color: "#1E64D0",
    fontWeight: "bold",
  },
});
