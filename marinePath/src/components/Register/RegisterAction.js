import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const RegisterAction = ({ onRegister, error, loading = false }) => {
  const handleGoogleRegister = () => {
    // TODO: Implement Google registration with AuthService.googleLogin
    alert("Google registration not implemented yet");
  };

  const handleAppleRegister = () => {
    // TODO: Implement Apple registration
    alert("Apple registration not implemented yet");
  };

  return (
    <>
      {/* Error Display */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledBtn]}
        onPress={onRegister}
        disabled={loading}
        accessibilityLabel="Đăng ký tài khoản"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đăng ký</Text>
        )}
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Hoặc</Text>
        <View style={styles.line} />
      </View>

      {/* Social Login */}
      <TouchableOpacity
        style={[styles.socialBtn, loading && styles.disabledBtn]}
        onPress={handleAppleRegister}
        disabled={loading}
        accessibilityLabel="Đăng ký với Apple"
      >
        <Ionicons name="logo-apple" size={24} color="#333" />
        <Text style={styles.socialText}>Đăng ký với Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.socialBtn, loading && styles.disabledBtn]}
        onPress={handleGoogleRegister}
        disabled={loading}
        accessibilityLabel="Đăng ký với Google"
      >
        <AntDesign name="google" size={24} color="#333" />
        <Text style={styles.socialText}>Đăng ký với Google</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1E64D0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
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
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10, // Added margin for spacing
    textAlign: "center",
  },
  disabledBtn: {
    backgroundColor: "#a0c4ff",
    opacity: 0.7,
  },
});

export default RegisterAction;