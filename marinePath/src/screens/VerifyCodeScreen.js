import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function VerifyCodeScreen({ navigation }) {
  const [code, setCode] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check your email</Text>
      <Text style={styles.subtitle}>
        We sent a reset link. Enter 5 digit code that mentioned in the email
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 5 digit code"
        keyboardType="numeric"
        maxLength={5}
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PasswordReset")}
      >
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>

      <Text style={styles.link}>Haven’t got the email yet? Resend email</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 8,
  },
  button: {
    backgroundColor: "#4A7DFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { textAlign: "center", color: "#4A7DFF" },
});
