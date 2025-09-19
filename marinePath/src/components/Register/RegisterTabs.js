import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RegisterTabs = ({ navigation }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.tabInactive}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={styles.tabActive}>Đăng ký</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  tabActive: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E64D0",
    marginLeft: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#1E64D0",
    paddingBottom: 8,
  },
  tabInactive: {
    fontSize: 20,
    fontWeight: "500",
    color: "#999",
  },
});

export default RegisterTabs;