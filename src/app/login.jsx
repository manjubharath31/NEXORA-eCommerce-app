import { useSignIn } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("please enter a valid email"),

  password: z
    .string()
    .min(1, "password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const { isLoaded, signIn } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  //isLoaded → tells us whether Clerk is ready.
  //signIn → gives us the Clerk object that we'll use to authenticate the user.

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = async (data) => {
    try {
      const { error } = await signIn.password({
        emailAddress: data.email,
        password: data.password,
      });

      if (error) {
        console.log("Login error:", error);
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: () => router.replace("/home"),
        });
      } else if (signIn.status === "needs_client_trust") {
        const emailCodeFactor = signIn.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code"
        );
        if (emailCodeFactor) {
          await signIn.mfa.sendEmailCode();
        }
        router.push("/verify-device"); // a new screen you'll need, see below
      } else {
        // Don't fail silently: see what Clerk is asking for
        console.log("Sign-in not complete, status:", signIn.status);
      }
    } catch (e) {
      console.log("LOGIN ERROR:", e);
    }
  };

  return (
    <View className="flex-1 px-6 justify-center" style={styles.container}>
      {/*  logo */}

      <Text style={styles.logo}>NEXORA</Text>
      <Text style={styles.tagline}>Shop. Discover .Enjoy</Text>

      {/* welcome */}

      <Text className="mt-10" style={styles.title}>
        Welcome Back 👋
      </Text>
      <Text className="mt-2" style={styles.subtitle}>
        Sign In To Continue
      </Text>

      {/* Email */}
      <Text className="mt-7" style={styles.label}>
        Email
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>📧</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Your Email"
              placeholderTextColor="#A1A1AA"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </View>
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* Password */}
      <Text className="mt-5" style={styles.label}>
        Password
      </Text>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>🔒</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Your Password"
              placeholderTextColor="#A1A1AA"
              secureTextEntry
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Pressable>
          <Text style={styles.eye}>👁</Text>
        </Pressable>
      </View> */}

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#A1A1AA"
          style={{ marginRight: 10 }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor="#A1A1AA"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />

              {value.length > 0 && (
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={10}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#71717A"
                  />
                </Pressable>
              )}
            </>
          )}
        />
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {/* Forgot Password */}

      <Pressable
        className="self-end mt-3"
        onPress={() => router.push("/forgot-password")}
      >
        <Text style={styles.forgot}>Forgot Password?</Text>
      </Pressable>

      {/* Sign in */}
      <Pressable
        className="w-full items-center justify-center mt-6"
        style={styles.button}
        onPress={handleSubmit(onsubmit)}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      {/* Divider */}

      <View className="flex-row items-center mt-7">
        <View style={styles.line} />
        <Text style={styles.orText}>Or Continue With</Text>
        <View style={styles.line} />
      </View>

      {/*  Social Login */}

      <View className="flex-row gap-3 mt-5">
        <Pressable
          className="flex-1 flex-row items-center justify-center"
          style={styles.socialButton}
        >
          <Text style={styles.socialIcon}>G</Text>
          <Text style={styles.socialText}>Google</Text>
        </Pressable>

        <Pressable
          className="flex-1 flex-row items-center justify-center"
          style={styles.socialButton}
        >
          <Text style={styles.socialIcon}>●</Text>
          <Text style={styles.socialText}>Apple</Text>
        </Pressable>
      </View>

      {/*  Create Account */}

      <View className="flex-row justify-center mt-7">
        <Text style={styles.registerText}>Don't have an account? </Text>

        <Pressable onPress={() => router.push("/register")}>
          <Text style={styles.register}>Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8FC",
  },

  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6C5CE7",
    letterSpacing: 3,
    textAlign: "center",
  },

  tagline: {
    fontSize: 13,
    color: "#71717A",
    textAlign: "center",
    marginTop: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#18181B",
  },

  subtitle: {
    fontSize: 15,
    color: "#71717A",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#27272A",
    marginBottom: 8,
  },
  inputContainer: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#18181B",
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 12,
    marginTop: 5,
  },

  // eye: {
  //   fontSize: 18,
  //   paddingLeft: 10,
  // },
  forgot: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6C5CE7",
  },

  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#6C5CE7",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E4E4E7",
  },

  orText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: "#A1A1AA",
  },
  socialButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E7",
  },

  socialIcon: {
    fontSize: 17,
    fontWeight: "700",
    marginRight: 8,
    color: "#18181B",
  },

  socialText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#27272A",
  },

  registerText: {
    fontSize: 14,
    color: "#71717A",
  },

  register: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6C5CE7",
  },
});
