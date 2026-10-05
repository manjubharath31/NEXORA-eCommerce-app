import { useTheme } from "@/hooks/use-theme";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function ChatFab() {
  const colors = useTheme();

  return (
    <Pressable
      style={[styles.fab, { backgroundColor: colors.primary }]}
      onPress={() => router.push("/chat-modal")}
    >
      <Text style={styles.icon}>💬</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 90, // sits above the native tab bar
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 999,
  },
  icon: { fontSize: 24 },
});
