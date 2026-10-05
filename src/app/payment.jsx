import React, { useState } from "react";
import { useOrderStore } from "../store/orderStore";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useCartStore } from "../store/cartStore";

const METHODS = ["UPI", "Credit/Debit Card", "Cash On Delivery"];

export default function Payment() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrderStore((s) => s.addOrder);

  const [method, setMethod] = useState(METHODS[0]);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);

  const handlePay = () => {
    setPaying(true);
    //delay in payment
    setTimeout(() => {
      addOrder({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items,
        total,
        paymentMethod: method,
      });
      setPaying(false);
      setPaid(true);
      clearCart();
    }, 1500);
  };

  if (paid) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.success}>✅ Payment Successful</Text>
        <Text style={styles.sub}>Your order has been placed.</Text>
        <Pressable
          style={styles.button}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>
      <Text style={styles.title}>Payment</Text>

      <Text style={styles.amount}>Amount to pay: ₹{total.toFixed(2)}</Text>

      <Text style={styles.label}>Choose payment method</Text>
      {METHODS.map((m) => (
        <Pressable
          key={m}
          onPress={() => setMethod(m)}
          style={[styles.method, method === m && styles.methodActive]}
        >
          <Text
            style={[styles.methodText, method === m && styles.methodTextActive]}
          >
            {m}
          </Text>
        </Pressable>
      ))}

      <Pressable style={styles.button} onPress={handlePay} disabled={paying}>
        {paying ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Pay ₹{total.toFixed(2)}</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8FC", paddingHorizontal: 20 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8FC",
  },
  back: { fontSize: 15, color: "#6C5CE7", fontWeight: "600", marginTop: 14 },
  title: { fontSize: 24, fontWeight: "800", marginVertical: 16 },
  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6C5CE7",
    marginBottom: 20,
  },
  label: { fontSize: 14, color: "#71717A", marginBottom: 10 },
  method: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  methodActive: { borderColor: "#6C5CE7", backgroundColor: "#F1EFFD" },
  methodText: { fontSize: 15, color: "#18181B" },
  methodTextActive: { color: "#6C5CE7", fontWeight: "700" },
  button: {
    height: 50,
    backgroundColor: "#6C5CE7",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 30,
  },
  buttonText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
  success: { fontSize: 24, fontWeight: "800", color: "#18181B" },
  sub: { fontSize: 14, color: "#71717A", marginTop: 8 },
});
