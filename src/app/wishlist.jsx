import React from "react";

import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { useWishlistStore } from "../store/wishlistStore";

export default function Wishlist() {
  const items = useWishlistStore((s) => s.items);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Wishlist</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => String(i.id)}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <Pressable
              style={{ width: "48%" }}
              onPress={() => router.push(`/product/${item.id}`)}
            >
              <ProductCard
                id={item.id}
                image={item.image}
                name={item.title}
                price={item.price}
              />
            </Pressable>
          )}
        />
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
    marginBottom: 16,
    gap: 14,
  },
  back: {
    fontSize: 15,
    color: "#6C5CE7",
    fontWeight: "600",
  },
  title: { fontSize: 20, fontWeight: "700", color: "#18181B" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#71717A" },
});
