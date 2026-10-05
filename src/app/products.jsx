import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "../components/ProductCard";
import api from "../services/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  const { search: initialSearch } = useLocalSearchParams();
  const [searchText, setSearchText] = useState(initialSearch || "");
  const [debouncedText, setDebouncedText] = useState(initialSearch || "");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedText(searchText), 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", debouncedText],
    queryFn: async () => {
      const url = debouncedText.trim()
        ? `/products/search?q=${encodeURIComponent(debouncedText.trim())}&limit=100`
        : "/products?limit=100";
      const response = await api.get(url);
      return response.data.products;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>All Products</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search Products..."
          placeholderTextColor="#A1A1AA"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          autoFocus={!!initialSearch}
        />
      </View>

      {/* Results */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : error ? (
        <Text style={styles.loadingText}>Something went wrong.</Text>
      ) : products.length === 0 ? (
        <Text style={styles.loadingText}>No products found.</Text>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          <View style={styles.grid}>
            {products.map((product) => (
              <Pressable
                key={product.id}
                style={{ width: "48%" }}
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <ProductCard
                  id={product.id}
                  image={product.images?.[0] || product.thumbnail}
                  name={product.title}
                  price={product.price}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8FC", paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 12,
    gap: 14,
  },
  back: { fontSize: 15, color: "#6C5CE7", fontWeight: "600" },
  title: { fontSize: 20, fontWeight: "700", color: "#18181B" },
  searchContainer: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchIcon: { fontSize: 18, marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: "#18181B" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 14, color: "#71717A" },
  list: { paddingBottom: 30 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
