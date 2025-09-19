import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  gender,
  setGender,
  phone,
  setPhone,
  secureText,
  setSecureText,
  confirmSecureText,
  setConfirmSecureText,
  errors, // Nhận object errors
}) => {
  // Default errors to an empty object if undefined or not an object
  const safeErrors = typeof errors === "object" && errors !== null && !Array.isArray(errors) ? errors : {};

  // Debug errors object
  console.log("Errors object received:", errors);
  console.log("Safe Errors object used:", safeErrors);

  return (
    <>
      {/* First Name */}
      <Text style={styles.label}>Tên</Text>
      <View style={[styles.input, safeErrors.firstName ? styles.inputError : null]}>
        <TextInput
          style={styles.inputText}
          placeholder="Nhập tên"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        <Ionicons name="person-outline" size={24} color="#666" style={styles.inputIcon} />
      </View>
      {safeErrors.firstName && typeof safeErrors.firstName === "string" && (
        <Text style={styles.errorText}>{safeErrors.firstName}</Text>
      )}

      {/* Last Name */}
      <Text style={styles.label}>Họ</Text>
      <View style={[styles.input, safeErrors.lastName ? styles.inputError : null]}>
        <TextInput
          style={styles.inputText}
          placeholder="Nhập họ"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />
        <Ionicons name="person-outline" size={24} color="#666" style={styles.inputIcon} />
      </View>
      {safeErrors.lastName && typeof safeErrors.lastName === "string" && (
        <Text style={styles.errorText}>{safeErrors.lastName}</Text>
      )}

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={[styles.input, safeErrors.email ? styles.inputError : null]}>
        <TextInput
          style={styles.inputText}
          placeholder="contact@dscodetech.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Ionicons name="mail-outline" size={24} color="#666" style={styles.inputIcon} />
      </View>
      {safeErrors.email && typeof safeErrors.email === "string" && (
        <Text style={styles.errorText}>{safeErrors.email}</Text>
      )}

      {/* Phone */}
      <Text style={styles.label}>Số điện thoại</Text>
      <View style={[styles.input, safeErrors.phone ? styles.inputError : null]}>
        <TextInput
          style={styles.inputText}
          placeholder="+1234567890"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Ionicons name="call-outline" size={24} color="#666" style={styles.inputIcon} />
      </View>
      {safeErrors.phone && typeof safeErrors.phone === "string" && (
        <Text style={styles.errorText}>{safeErrors.phone}</Text>
      )}

      {/* Gender */}
      <Text style={styles.label}>Giới tính</Text>
      <View style={[styles.input, safeErrors.gender ? styles.inputError : null]}>
        <TextInput
          style={styles.inputText}
          placeholder="Nhập giới tính (Nam/Nữ/Khác)"
          value={gender}
          onChangeText={setGender}
          autoCapitalize="words"
        />
        <Ionicons name="transgender-outline" size={24} color="#666" style={styles.inputIcon} />
      </View>
      {safeErrors.gender && typeof safeErrors.gender === "string" && (
        <Text style={styles.errorText}>{safeErrors.gender}</Text>
      )}

      {/* Password */}
      <Text style={styles.label}>Mật khẩu</Text>
      <View style={[styles.input, styles.passwordContainer, safeErrors.password ? styles.inputError : null]}>
        <TextInput
          style={styles.inputText}
          placeholder="Nhập mật khẩu"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {safeErrors.password && typeof safeErrors.password === "string" && (
        <Text style={styles.errorText}>{safeErrors.password}</Text>
      )}

      {/* Confirm Password */}
      <Text style={styles.label}>Xác nhận mật khẩu</Text>
      <View style={[styles.input, styles.passwordContainer, safeErrors.confirmPassword ? styles.inputError : null]}>
        <TextInput
          style={styles.inputText}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={confirmSecureText}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setConfirmSecureText(!confirmSecureText)}>
          <Ionicons
            name={confirmSecureText ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {safeErrors.confirmPassword && typeof safeErrors.confirmPassword === "string" && (
        <Text style={styles.errorText}>{safeErrors.confirmPassword}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  inputIcon: {
    marginLeft: 10,
  },
  passwordContainer: {
    paddingRight: 10,
  },
  inputError: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default RegisterForm;