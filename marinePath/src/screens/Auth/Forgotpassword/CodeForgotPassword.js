// VerifyCodeScreen.js
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

export default function CodeForgotPassword({ navigation, route }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { email } = route.params || {};

  const validateCode = (input) => {
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(input);
  };

  const handleVerifyCode = async () => {
    if (!email) {
      setError("Không tìm thấy email. Vui lòng thử lại.");
      return;
    }
    if (!code) {
      setError("Vui lòng nhập mã xác minh!");
      return;
    }
    if (!validateCode(code)) {
      setError("Mã xác minh phải là 6 chữ số!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      setLoading(false);
      navigation.navigate("NewPassword", { emailOrPhone: email, otp: code });
    } catch (err) {
      setLoading(false);
      setError(err.message || "Lỗi kết nối. Vui lòng thử lại.");
      console.error("Verify OTP error:", err.message, err.response ? err.response.data : "No response data");
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Không tìm thấy email. Vui lòng thử lại.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await AuthService.resendOtp(email);
      setLoading(false);
      if (result.success) {
        alert(result.message || "Mã OTP đã được gửi lại!");
      } else {
        setError(result.message || "Gửi lại OTP thất bại");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Lỗi kết nối. Vui lòng thử lại.");
      console.error("Resend OTP error:", err.message, err.response ? err.response.data : "No response data");
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
          <Text style={styles.title}>Xác minh OTP</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              Nhập mã 6 chữ số được gửi đến{" "}
              <Text style={styles.emailText}>{email || "email của bạn"}</Text>
            </Text>
          </View>
          <Text style={styles.label}>Mã xác minh</Text>
          <View style={[styles.input, error ? styles.inputError : null]}>
            <TextInput
              style={styles.inputText}
              placeholder="Nhập mã OTP"
              keyboardType="numeric"
              maxLength={6}
              value={code}
              onChangeText={setCode}
              textAlign="center"
              letterSpacing={8}
              editable={!loading}
              accessibilityLabel="Nhập mã xác minh 6 chữ số"
            />
            <Ionicons name="lock-closed-outline" size={22} color="#666" style={styles.inputIcon} />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            style={[styles.button, loading && styles.disabledBtn]}
            onPress={handleVerifyCode}
            disabled={loading}
            accessibilityLabel="Xác minh mã OTP"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Xác minh mã</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resendBtn}
            onPress={handleResendCode}
            disabled={loading}
            accessibilityLabel="Gửi lại mã OTP"
          >
            <Text style={styles.resendText}>Chưa nhận được mã? Gửi lại mã</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate("Login")}
            disabled={loading}
            accessibilityLabel="Quay lại màn hình đăng nhập"
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
  subtitleContainer: {
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  emailText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E64D0",
    textDecorationLine: "underline",
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
    textAlign: "center",
    letterSpacing: 8,
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
  resendBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  resendText: {
    color: "#1E64D0",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
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