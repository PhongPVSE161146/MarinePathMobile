// ForgotPasswordScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthService from "../../../Api/Auth/AuthService"; // Adjust path

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Vui lòng nhập email!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email không hợp lệ!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await AuthService.forgotPassword(email);
      setLoading(false);
      if (response.success) {
        navigation.navigate("codeforgot", { email });
      } else {
        setError(response.message || "Gửi yêu cầu đặt lại mật khẩu thất bại");
      }
    } catch (error) {
      setLoading(false);
      console.error("ForgotPasswordScreen error:", error.message);
      setError(error.message || "Lỗi kết nối. Vui lòng thử lại.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Quên Mật Khẩu</Text>
          <Text style={styles.subtitle}>
            Nhập email để nhận mã OTP đặt lại mật khẩu
          </Text>
          <Text style={styles.label}>Email</Text>
          <View style={[styles.input, error ? styles.inputError : null]}>
            <TextInput
              style={styles.inputText}
              placeholder="VD: contact@dscodetech.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            <Ionicons name="mail-outline" size={22} color="#666" style={styles.inputIcon} />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            style={[styles.button, loading && styles.disabledBtn]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Gửi mã OTP</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate("Login")}
            disabled={loading}
          >
            <Text style={styles.backText}>Quay lại đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  innerContainer: {
    width: "90%",
    maxWidth: 400,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  inputText: {
    flex: 1,
    fontSize: 18,
  },
  inputIcon: {
    marginLeft: 10,
  },
  inputError: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
    marginTop: 8,
    marginLeft: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1E64D0",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  disabledBtn: {
    backgroundColor: "#a0c4ff",
    opacity: 0.7,
  },
  backBtn: {
    marginTop: 15,
    alignItems: "center",
  },
  backText: {
    color: "#1E64D0",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});