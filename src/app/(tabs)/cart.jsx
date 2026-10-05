import { useTheme } from "@/hooks/use-theme";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "../../store/cartStore";

export default function Cart() {
  const colors = useTheme();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);

  if (items.length === 0) {
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Your cart is empty
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <Text style={[styles.title, { color: colors.text }]}>My Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.row,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                numberOfLines={1}
                style={[styles.name, { color: colors.text }]}
              >
                {item.title}
              </Text>
              <Text style={[styles.price, { color: colors.primary }]}>
                ₹{item.price}
              </Text>
              <View style={styles.qtyRow}>
                <Pressable
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Text style={[styles.qtyBtn, { color: colors.primary }]}>
                    −
                  </Text>
                </Pressable>
                <Text style={[styles.qty, { color: colors.text }]}>
                  {item.quantity}
                </Text>
                <Pressable
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={[styles.qtyBtn, { color: colors.primary }]}>
                    +
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => removeFromCart(item.id)}
                  style={{ marginLeft: 16 }}
                >
                  <Text style={[styles.remove, { color: colors.danger }]}>
                    Remove
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
      <View
        style={[
          styles.footer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.total, { color: colors.text }]}>
          Total: ₹{total.toFixed(2)}
        </Text>
        <Pressable
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/payment")}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: { fontSize: 16 },
  title: { fontSize: 24, fontWeight: "800", marginVertical: 16 },
  row: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
  },
  image: { width: 70, height: 70 },
  name: { fontSize: 14, fontWeight: "600" },
  price: { fontSize: 14, fontWeight: "700", marginTop: 2 },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyBtn: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 10,
  },
  qty: { fontSize: 14, fontWeight: "600", minWidth: 20, textAlign: "center" },
  remove: { fontSize: 12, fontWeight: "600" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  total: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  checkoutButton: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
});
