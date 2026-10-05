import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useWishlistStore } from "../store/wishlistStore";

export default function ProductCard({ id, image, name, price }) {
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Pressable
          style={styles.heartButton}
          hitSlop={8} //invisible extra space around a button for eSIER TAPPING
          onPress={() => toggleWishlist({ id, title: name, price, image })}
        >
          <Text style={styles.heartIcon}>{isWishlisted ? "❤️" : "🤍"}</Text>
        </Pressable>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>

      <Text style={styles.price}>₹{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    marginBottom: 16,
  },

  imageContainer: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    backgroundColor: "#F4F4F8",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  heartIcon: {
    fontSize: 15,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#18181B",
    marginTop: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6C5CE7",
    marginTop: 5,
  },
});
