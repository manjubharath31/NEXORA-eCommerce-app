import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSignIn } from "@clerk/expo";

export default function VerifyDevice() {
  const { signIn } = useSignIn();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code.trim()) {
      Alert.alert("Enter Code", "Please enter the verification code.");
      return;
    }

    try {
      setLoading(true);

      console.log("Verifying device code...");

      const result = await signIn.mfa.verifyEmailCode({
        code: code.trim(),
      });

      console.log("Verification result:", result);

      if (result.status === "complete") {
        console.log("Device verification successful");

        await signIn.finalize({
          navigate: () => router.replace("/home"),
        });
      } else {
        console.log("Verification not complete:", result.status);

        Alert.alert(
          "Verification Incomplete",
          "The device verification could not be completed."
        );
      }
    } catch (error) {
      console.log("VERIFY DEVICE ERROR:", error);

      Alert.alert(
        "Verification Failed",
        "The code is invalid or has expired. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify Your Device</Text>

        <Text style={styles.description}>
          We sent a verification code to your email. Enter the code below to
          verify this device.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          placeholderTextColor="#A1A1AA"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
        />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Verify Device</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FC",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E4E4E7",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#18181B",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#71717A",
    textAlign: "center",
    marginBottom: 24,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#18181B",
    textAlign: "center",
    letterSpacing: 4,
    marginBottom: 18,
  },

  button: {
    height: 55,
    backgroundColor: "#6C5CE7",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
