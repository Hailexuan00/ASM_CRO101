import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Manhinhsignupsignup({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const account = { name, email, password };
    alert("Registration successful! You can now log in.");
    onSwitch(account);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/Group 72.png")} style={styles.logo} />

      <Text style={styles.title}>Welcome to Lungo !!</Text>
      <Text style={styles.subtitle}>Register to Continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0c0f14",
  },
  logo: {
    width: 120, // Điều chỉnh kích thước logo
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "gray",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "white",
    backgroundColor: "#1c1f26",
    borderRadius: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
