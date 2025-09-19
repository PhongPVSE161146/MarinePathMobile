import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AuthService from "../../../Api/Auth/AuthService";

// RegisterTabs Component
const RegisterTabs = ({ navigation, disabled }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        disabled={disabled}
        accessibilityLabel="Chuyển sang màn hình đăng nhập"
      >
        <Text style={[styles.tabInactive, disabled && styles.disabledText]}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={styles.tabActive}>Đăng ký</Text>
    </View>
  );
};

// RegisterForm Component
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
  errors,
  editable,
}) => {
  const safeErrors = typeof errors === "object" && errors !== null && !Array.isArray(errors) ? errors : {};

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
          editable={editable}
          accessibilityLabel="Nhập tên"
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
          editable={editable}
          accessibilityLabel="Nhập họ"
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
          editable={editable}
          accessibilityLabel="Nhập email"
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
          placeholder="1432888566"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          editable={editable}
          accessibilityLabel="Nhập số điện thoại"
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
          editable={editable}
          accessibilityLabel="Nhập giới tính"
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
          editable={editable}
          accessibilityLabel="Nhập mật khẩu"
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} disabled={!editable}>
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
          editable={editable}
          accessibilityLabel="Xác nhận mật khẩu"
        />
        <TouchableOpacity onPress={() => setConfirmSecureText(!confirmSecureText)} disabled={!editable}>
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

// RegisterAction Component
const RegisterAction = ({ onRegister, error, loading = false }) => {
  const handleGoogleRegister = () => {
    alert("Google registration not implemented yet");
  };

  const handleAppleRegister = () => {
    alert("Apple registration not implemented yet");
  };

  return (
    <>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Hoặc</Text>
        <View style={styles.line} />
      </View>
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

// Main RegisterScreen Component
export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [confirmSecureText, setConfirmSecureText] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Debug hook count
  useEffect(() => {
    console.log("RegisterScreen rendered with 10 useState hooks");
  }, []);

  const validateInputs = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,12}$/;

    if (!email) errors.email = "Vui lòng nhập email!";
    else if (!emailRegex.test(email)) errors.email = "Email không hợp lệ!";
    if (!password) errors.password = "Vui lòng nhập mật khẩu!";
    else if (password.length < 6) errors.password = "Mật khẩu phải có ít nhất 6 ký tự!";
    if (!confirmPassword) errors.confirmPassword = "Vui lòng xác nhận mật khẩu!";
    else if (password !== confirmPassword) errors.confirmPassword = "Mật khẩu không khớp!";
    if (!firstName) errors.firstName = "Vui lòng nhập tên!";
    if (!lastName) errors.lastName = "Vui lòng nhập họ!";
    if (!gender) errors.gender = "Vui lòng nhập giới tính!";
    else if (!["Nam", "Nữ", "Khác"].includes(gender)) errors.gender = "Giới tính phải là Nam, Nữ hoặc Khác!";
    if (!phone) errors.phone = "Vui lòng nhập số điện thoại!";
    else if (!phoneRegex.test(phone)) errors.phone = "Số điện thoại phải có 10-12 chữ số!";

    return errors;
  };

  const handleRegister = async () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const result = await AuthService.register({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        gender,
        phone,
      });
      setLoading(false);

      if (result.Succeeded || result.success) {
        navigation.navigate("VerifyCode", { email });
      } else {
        const errorMessage = result.Message || result.message || "Đăng ký thất bại";
        if (errorMessage.toLowerCase().includes("email or phone number is already registered")) {
          setErrors({
            email: "Email hoặc số điện thoại đã có người dùng",
            phone: "Email hoặc số điện thoại đã có người dùng",
          });
          Alert.alert("Lỗi", "Email hoặc số điện thoại đã có người dùng");
        } else {
          setErrors({ general: errorMessage });
          Alert.alert("Lỗi", errorMessage);
        }
        console.log("API error:", { message: errorMessage });
      }
    } catch (err) {
      setLoading(false);
      const errorMessage =
        err.response?.data?.Message ||
        err.response?.data?.message ||
        err.message ||
        "Lỗi kết nối. Vui lòng thử lại.";
      if (errorMessage.toLowerCase().includes("email or phone number is already registered")) {
        setErrors({
          email: "Email hoặc số điện thoại đã có người dùng",
          phone: "Email hoặc số điện thoại đã có người dùng",
        });
        Alert.alert("Lỗi", "Email hoặc số điện thoại đã có người dùng");
      } else {
        setErrors({ general: errorMessage });
        Alert.alert("Lỗi", errorMessage);
      }
      console.error("Register error:", err.message, err.response?.data || "No response data");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.overlay} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <RegisterTabs navigation={navigation} disabled={loading} />
          <RegisterForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            gender={gender}
            setGender={setGender}
            phone={phone}
            setPhone={setPhone}
            secureText={secureText}
            setSecureText={setSecureText}
            confirmSecureText={confirmSecureText}
            setConfirmSecureText={setConfirmSecureText}
            errors={errors}
            editable={!loading}
          />
          <RegisterAction onRegister={handleRegister} error={errors.general} loading={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  innerContainer: {
    width: "90%",
    maxWidth: 400,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  disabledText: {
    opacity: 0.5,
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
  disabledBtn: {
    backgroundColor: "#a0c4ff",
    opacity: 0.7,
  },
});