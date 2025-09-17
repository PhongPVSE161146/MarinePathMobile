import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PasswordResetScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password reset</Text>
      <Text style={styles.subtitle}>
        Your password has been successfully reset. Click confirm to set a new password
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NewPassword")}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  button: {
    backgroundColor: "#4A7DFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
