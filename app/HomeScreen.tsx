import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity, TextInput,
  StyleSheet, ActivityIndicator, Modal, Alert
} from "react-native";
import { useRouter } from "expo-router";
import { api } from "../model/api";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [favorites, setFavorites] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cappuccino", "Espresso", "Americano", "Macchiato"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      if (!response.isError) {
        setProducts(response);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => setSearchQuery(text);

  // Duy nhất một khai báo filteredProducts, tránh lỗi trùng lặp
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = async (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK", onPress: async () => {
          try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter((p) => p.id !== id));
          } catch (error) {
            console.error("Failed to delete product", error);
          }
        }
      }
    ]);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image
    });
    setModalVisible(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await api.put(`/products/${editProduct.id}`, newProduct);
      if (!response.isError) {
        setProducts(products.map((p) => (p.id === editProduct.id ? response : p)));
      }
    } catch (error) {
      console.error("Failed to update product", error);
    }
    setModalVisible(false);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    try {
      const response = await api.post("/products", newProduct);
      if (!response.isError) {
        setProducts([...products, response]);
        Alert.alert("Success", "Product added successfully!");
      }
    } catch (error) {
      console.error("Failed to add product", error);
    }
    setNewProduct({ name: "", price: "", image: "" });
    setModalVisible(false);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find the best coffee for you</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for coffee..."
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)} style={styles.categoryItem}>
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
            {selectedCategory === category && <View style={styles.selectedDot} />}
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ffa500" />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <TouchableOpacity onPress={() => router.push({ pathname: "/ProductDetailsScreen", params: item })}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Text style={styles.favoriteButton}>
                  {favorites.has(item.id) ? "❤️" : "🤍"}
                </Text>
              </TouchableOpacity>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEditProduct(item)}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => { setEditProduct(null); setNewProduct({ name: "", price: "", image: "" }); setModalVisible(true); }}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{editProduct ? "Edit Product" : "Add Product"}</Text>
            <TextInput style={styles.input} placeholder="Name" value={newProduct.name} onChangeText={(text) => setNewProduct({ ...newProduct, name: text })} />
            <TextInput style={styles.input} placeholder="Price" value={newProduct.price} onChangeText={(text) => setNewProduct({ ...newProduct, price: text })} />
            <TextInput style={styles.input} placeholder="Image URL" value={newProduct.image} onChangeText={(text) => setNewProduct({ ...newProduct, image: text })} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <TouchableOpacity style={styles.updateButton} onPress={editProduct ? handleUpdateProduct : handleAddProduct}>
                <Text style={styles.buttonText}>{editProduct ? "Update" : "Add"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    color: "white",
    borderRadius: 8
  },
  productContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 10
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10
  },
  productName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  },
  productPrice: {
    color: "#ffa500",
    fontSize: 14,
    marginTop: 2
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  editButton: {
    color: "#4caf50",
    fontWeight: "bold"
  },
  deleteButton: {
    color: "#f44336",
    fontWeight: "bold"
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#ffa500",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },
  favoriteButton: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
  },

  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: "#4caf50", // Màu xanh lá giống nút Edit
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f44336", // Màu đỏ giống nút Delete
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  
  categoryItem: {
    alignItems: "center",
    marginRight: 15, 
  },
  
  categoryText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  selectedCategoryText: {
    color: "#ffa500", // Màu cam khi được chọn
  },
  
  selectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ffa500",
    marginTop: 4,
  },

});