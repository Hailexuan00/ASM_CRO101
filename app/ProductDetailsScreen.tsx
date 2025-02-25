import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetailsScreen() {
  const product = useLocalSearchParams(); // Nhận toàn bộ dữ liệu sản phẩm

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description || "No description available"}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => alert("Added to cart!")}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212"
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 8
  },
  productName: {
    fontSize: 24,
    color: "#fff",
    marginTop: 16
  },
  productDescription: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 8
  },
  productPrice: {
    fontSize: 20,
    color: "#ffa500",
    marginTop: 8,
    fontWeight: "bold"
  },
  addButton: {
    backgroundColor: "#ffa500",
    padding: 16,
    borderRadius: 8,
    marginTop: 16
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18
  },
});
