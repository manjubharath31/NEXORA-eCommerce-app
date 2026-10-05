import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useSignUp } from "@clerk/expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("please enter a valid email"),

    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),

    password: z
      .string()
      .min(1, "password is required")
      .min(15, "Password must be at least 15 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const { signUp } = useSignUp();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onsubmit = async (data) => {
    console.log("1. Create Account button clicked");
    console.log("Form data:", data);

    try {
      console.log("2. Submitting signup...");
      const { error } = await signUp.password({
        emailAddress: data.email,
        password: data.password,
      });

      if (error) {
        console.log("3. signUp password error:", error);
        return;
      }

      console.log("4. Sending verification code...");
      const { error: codeError } = await signUp.verifications.sendEmailCode();

      if (codeError) {
        console.log("5. sendEmailCode error:", codeError);
        return;
      }

      console.log("6. Verification code sent");
      router.push("/verify");
    } catch (error) {
      console.log("SIGNUP ERROR:", error);
    }
    // console.log("1. Create Account button clicked");
    // console.log("Form data:", data);

    // if (!isLoaded) {
    //   console.log("2. Clerk is not loaded");
    //   return;
    // }

    // try {
    //   console.log("3. Creating Clerk signup...");
    //   const result = await signUp.create({
    //     emailAddress: data.email,
    //     password: data.password,
    //   });
    //   console.log("4. Signup created:", result);
    //   console.log("5. Signup status:", result.status);

    //   if (result.status === "complete") {
    //     console.log("6. Signup is already complete");
    //     return;
    //   }

    //   console.log("7. Preparing email verification...");

    //   await signUp.prepareEmailAddressVerification({
    //     strategy: "email_code",
    //   });

    //   console.log("8. Verification code sent");

    //   router.push("/verify");

    //   console.log("9. Navigating to verify screen");
    // } catch (error) {
    //   console.log("SIGNUP ERROR:", error);
    //   console.log("ERROR MESSAGE:", error?.message);
    //   console.log("ERROR DETAILS:", error?.errors);
    // }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View className=" px-6 ">
          {/* Logo */}
          <Text style={styles.logo}>NEXORA</Text>

          <Text style={styles.tagline}>Shop. Discover. Enjoy.</Text>

          {/* Heading */}
          <Text className="mt-8" style={styles.title}>
            Create account
          </Text>

          <Text className="mt-2" style={styles.subtitle}>
            Start your shopping journey
          </Text>

          {/* Name */}
          <Text className="mt-6" style={styles.label}>
            Name
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor="#A1A1AA"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}

          {/* Email */}
          <Text className="mt-4" style={styles.label}>
            Email
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📧</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your email"
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

          {/* Phone */}
          <Text className="mt-4" style={styles.label}>
            Phone Number
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>📱</Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter phone number"
                  placeholderTextColor="#A1A1AA"
                  keyboardType="phone-pad"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          {errors.phone && (
            <Text style={styles.errorText}>{errors.phone.message}</Text>
          )}

          {/* Password */}
          <Text className="mt-4" style={styles.label}>
            Password
          </Text>

          {/* <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Create a password"
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
                    placeholder="Create a password"
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

          {/* Confirm Password */}
          <Text className="mt-4" style={styles.label}>
            Confirm Password
          </Text>

          {/* <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Confirm password"
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
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Confirm password"
                    placeholderTextColor="#A1A1AA"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />

                  {value.length > 0 && (
                    <Pressable
                      onPress={() => setShowConfirmPassword((prev) => !prev)}
                      hitSlop={10}
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-outline"
                            : "eye-off-outline"
                        }
                        size={22}
                        color="#71717A"
                      />
                    </Pressable>
                  )}
                </>
              )}
            />
          </View>

          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}

          {/* Create Account */}
          <Pressable
            className="w-full items-center justify-center mt-6"
            style={styles.button}
            onPress={handleSubmit(onsubmit)}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center mt-6">
            <View style={styles.line} />

            <Text style={styles.orText}>or continue with</Text>

            <View style={styles.line} />
          </View>

          {/* Social Login */}
          <View className="flex-row gap-3 mt-4">
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

          {/* Login */}
          <View className="flex-row justify-center mt-5">
            <Text style={styles.loginText}>Already have an account? </Text>

            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.login}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8FC",
  },

  scrollContent: {
    // flexGrow: 1,
    // paddingHorizontal: 24,
    // justifyContent: "center",
    paddingVertical: 30,
    paddingBottom: 150,
  },

  logo: {
    fontSize: 26,
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
    marginBottom: 7,
  },

  inputContainer: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  inputIcon: {
    fontSize: 17,
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

  button: {
    height: 52,
    backgroundColor: "#6C5CE7",
    borderRadius: 12,
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
    marginHorizontal: 10,
    fontSize: 12,
    color: "#A1A1AA",
  },

  socialButton: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 12,
  },

  socialIcon: {
    fontSize: 16,
    fontWeight: "700",
    color: "#18181B",
    marginRight: 7,
  },

  socialText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#27272A",
  },

  loginText: {
    fontSize: 14,
    color: "#71717A",
  },

  login: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6C5CE7",
  },
});
