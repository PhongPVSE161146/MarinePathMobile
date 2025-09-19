import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AuthService from "../../../Api/Auth/AuthService"; // Adjust the path to where AuthService is located

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    setLoading(true); // Show loading indicator

    try {
      const result = await AuthService.login(email, password);
      setLoading(false);

      if (result.success) {
        // Navigate to Home screen on successful login
        navigation.navigate("Home");
      } else {
        // Display error message from API
        setError(result.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setLoading(false);
      setError("Lỗi kết nối. Vui lòng thử lại.");
      console.error("Login error:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <Text style={styles.tabActive}>Đăng Nhập</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.tabInactive}>Đăng Kí</Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"         
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading} // Disable input while loading
        />

        {/* Password */}
        <Text style={styles.label}>Mật Khẩu</Text>
        <View style={[styles.input, styles.passwordContainer, error ? styles.inputError : null]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Nhập mật khẩu"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
            editable={!loading} // Disable input while loading
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)} disabled={loading}>
            <Ionicons
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotBtn}
          onPress={() => navigation.navigate("ForgotPassword")}
          disabled={loading}
        >
          <Text style={styles.forgotText}>Quên Mật Khẩu?</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueBtn, loading && styles.disabledBtn]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.continueText}>Đăng Nhập</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Login */}
        <TouchableOpacity style={styles.socialBtn} disabled={loading}>
          <Ionicons name="logo-apple" size={24} color="#333" />
          <Text style={styles.socialText}>Login with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn} disabled={loading}>
          <AntDesign name="google" size={24} color="#333" />
          <Text style={styles.socialText}>Login with Google</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupPrompt}>Bạn chưa có tài khoản?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")} disabled={loading}>
            <Text style={styles.signupText}>Đăng Kí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  tabActive: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E64D0",
    marginRight: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#1E64D0",
    paddingBottom: 8,
  },
  tabInactive: {
    fontSize: 20,
    fontWeight: "500",
    color: "#999",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#fafafa",
  },
  passwordContainer: {
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
    marginTop: 8,
    marginLeft: 5,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 20,
  },
  forgotText: {
    color: "#1E64D0",
    fontSize: 14,
    fontWeight: "500",
  },
  continueBtn: {
    backgroundColor: "#1E64D0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  continueText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 15,
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 12,
    backgroundColor: "#fff",
  },
  socialText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  signupPrompt: {
    fontSize: 15,
    color: "#666",
  },
  signupText: {
    color: "#1E64D0",
    fontSize: 15,
    fontWeight: "600",
  },
  disabledBtn: {
    backgroundColor: "#a0c4ff", // Lighter color when disabled
    opacity: 0.7,
  },
});