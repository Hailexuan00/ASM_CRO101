import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Manhinhlogin({ onSwitch, registeredAccount, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (registeredAccount && email === registeredAccount.email && password === registeredAccount.password) {
      alert("Login successful! Welcome to Lungo!");
      onLoginSuccess();
    } else {
      alert("Incorrect email or password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Thêm logo */}
      <Image source={require("../assets/images/Group 72.png")} style={styles.logo} />
      
      <Text style={styles.title}>Welcome to Lungo !!</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={onSwitch}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
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
  signupButton: {
    marginTop: 15,
    alignItems: "center",
  },
  signupText: {
    color: "white",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
