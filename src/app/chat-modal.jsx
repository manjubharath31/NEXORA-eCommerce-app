import { useTheme } from "@/hooks/use-theme";
import { useChatStore } from "@/store/chatStore";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatModal() {
  const colors = useTheme();
  const messages = useChatStore((s) => s.messages);
  const isSending = useChatStore((s) => s.isSending);
  const sendMessage = useChatStore((s) => s.sendMessage);

  const [input, setInput] = useState("");
  const listRef = useRef(null);

  const handleSend = () => {
    if (!input.trim() || isSending) return;
    sendMessage(input.trim());
    setInput("");
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.back, { color: colors.primary }]}>Close</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          NEXORA Assistant
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior= "padding"
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.role === "user"
                  ? [styles.userBubble, { backgroundColor: colors.primary }]
                  : [
                      styles.assistantBubble,
                      {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                      },
                    ],
              ]}
            >
              <Text
                style={{
                  color: item.role === "user" ? "#FFF" : colors.text,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {item.content}
              </Text>
            </View>
          )}
        />

        {isSending && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
            <ActivityIndicator size="small" />
          </View>
        )}

        <View
          style={[
            styles.inputRow,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Ask something..."
            placeholderTextColor={colors.textSecondary}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <Pressable onPress={handleSend} disabled={isSending}>
            <Text style={[styles.sendText, { color: colors.primary }]}>
              Send
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  back: { fontSize: 15, fontWeight: "600", width: 60 },
  headerTitle: { fontSize: 16, fontWeight: "700" },
  bubble: {
    maxWidth: "80%",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  userBubble: { alignSelf: "flex-end", borderBottomRightRadius: 4 },
  assistantBubble: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderBottomLeftRadius: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  input: { flex: 1, fontSize: 15, paddingVertical: 6 },
  sendText: { fontSize: 15, fontWeight: "700" },
});
