import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrderStore } from "../store/orderStore";

export default function Orders() {
  const orders = useOrderStore((s) => s.orders);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>My Orders</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(o) => o.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item: order }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.orderId}>Order #{order.id.slice(-6)}</Text>
                <Text style={styles.date}>
                  {new Date(order.date).toLocaleDateString()}
                </Text>
              </View>

              {order.items.map((i) => (
                <Text key={i.id} style={styles.itemLine} numberOfLines={1}>
                  {i.quantity} × {i.title}
                </Text>
              ))}

              <View style={styles.cardBottom}>
                <Text style={styles.method}>{order.paymentMethod}</Text>
                <Text style={styles.total}>₹{order.total.toFixed(2)}</Text>
              </View>
            </View>
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
  back: { fontSize: 15, color: "#6C5CE7", fontWeight: "600" },
  title: { fontSize: 20, fontWeight: "700", color: "#18181B" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#71717A" },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E4E4E7",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderId: { fontSize: 14, fontWeight: "700", color: "#18181B" },
  date: { fontSize: 12, color: "#71717A" },
  itemLine: { fontSize: 13, color: "#52525B", marginTop: 2 },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#F4F4F5",
  },
  method: { fontSize: 12, color: "#71717A" },
  total: { fontSize: 16, fontWeight: "700", color: "#6C5CE7" },
});
