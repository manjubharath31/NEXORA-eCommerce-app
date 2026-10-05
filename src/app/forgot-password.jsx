// import { router } from "expo-router";
// import React from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";

// export default function ForgotPassword() {
//   return (
//     <KeyboardAvoidingView
//       className="flex-1"
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       {/* Header */}
//       <View
//         className="flex-row items-center justify-between px-6 pb-2"
//         style={styles.header}
//       >
//         <Pressable
//           className="items-center justify-center"
//           style={styles.backButton}
//           onPress={() => router.back()}
//           hitSlop={8}
//         >
//           <Text style={styles.backIcon}>←</Text>
//         </Pressable>

//         <Text style={styles.logo}>NEXORA</Text>

//         {/* Logo center-la vekka, empty box */}
//         <View style={styles.headerSpacer} />
//       </View>

//       {/* Content */}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View className="w-full self-center" style={styles.content}>
//           {/* Icon with soft rings */}
//           <View
//             className="items-center justify-center self-center"
//             style={styles.iconOuter}
//           >
//             <View
//               className="items-center justify-center"
//               style={styles.iconInner}
//             >
//               <Text style={styles.iconEmoji}>🔐</Text>
//             </View>
//           </View>

//           {/* Heading */}
//           <Text className="mt-8 text-center" style={styles.title}>
//             Forgot Password?
//           </Text>

//           <Text className="mt-3 text-center" style={styles.subtitle}>
//             No worries! Enter the email linked to your account and we'll send
//             you a code to reset your password.
//           </Text>

//           {/* Card */}
//           <View className="mt-8" style={styles.card}>
//             <Text className="mb-2" style={styles.label}>
//               Email address
//             </Text>

//             <View
//               className="flex-row items-center px-4"
//               style={styles.inputContainer}
//             >
//               <Text className="mr-3" style={styles.inputIcon}>
//                 ✉️
//               </Text>

//               <TextInput
//                 className="flex-1"
//                 placeholder="name@example.com"
//                 placeholderTextColor="#A1A1AA"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 style={styles.input}
//               />
//             </View>

//             <Pressable
//               className="w-full items-center justify-center mt-5"
//               style={({ pressed }) => [
//                 styles.button,
//                 pressed && styles.buttonPressed,
//               ]}
//             >
//               <Text style={styles.buttonText}>Send Reset Code</Text>
//             </Pressable>
//           </View>

//           {/* Back to sign in */}
//           <Pressable
//             className="flex-row items-center justify-center mt-8"
//             onPress={() => router.push("/login")}
//           >
//             <Text style={styles.backToLoginArrow}>←</Text>
//             <Text className="ml-2" style={styles.backToLogin}>
//               Back to Sign In
//             </Text>
//           </Pressable>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F8F8FC",
//   },

//   header: {
//     paddingTop:
//       Platform.OS === "web" ? 24 : (StatusBar.currentHeight ?? 44) + 8,
//   },

//   backButton: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1,
//     borderColor: "#ECECF1",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 2,
//   },

//   backIcon: {
//     fontSize: 20,
//     color: "#18181B",
//   },

//   logo: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#6C5CE7",
//     letterSpacing: 3,
//   },

//   headerSpacer: {
//     width: 42,
//     height: 42,
//   },

//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//     paddingBottom: 48,
//   },

//   content: {
//     maxWidth: 420,
//   },

//   iconOuter: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#F1EEFF",
//   },

//   iconInner: {
//     width: 88,
//     height: 88,
//     borderRadius: 44,
//     backgroundColor: "#E4DFFF",
//   },

//   iconEmoji: {
//     fontSize: 40,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: "#18181B",
//   },

//   subtitle: {
//     fontSize: 15,
//     lineHeight: 23,
//     color: "#71717A",
//     paddingHorizontal: 8,
//   },

//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: "#F0F0F5",
//     shadowColor: "#6C5CE7",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.08,
//     shadowRadius: 20,
//     elevation: 3,
//   },

//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#27272A",
//   },

//   inputContainer: {
//     height: 54,
//     backgroundColor: "#F8F8FC",
//     borderWidth: 1.5,
//     borderColor: "#E4E4E7",
//     borderRadius: 14,
//   },

//   inputIcon: {
//     fontSize: 18,
//   },

//   input: {
//     fontSize: 15,
//     color: "#18181B",
//     ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
//   },

//   button: {
//     height: 54,
//     borderRadius: 14,
//     backgroundColor: "#6C5CE7",
//     shadowColor: "#6C5CE7",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 5,
//   },

//   buttonPressed: {
//     opacity: 0.85,
//     transform: [{ scale: 0.98 }],
//   },

//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "700",
//   },

//   backToLoginArrow: {
//     fontSize: 16,
//     color: "#6C5CE7",
//   },

//   backToLogin: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#6C5CE7",
//   },
// });

import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ForgotPassword() {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-6 pb-2"
        style={styles.header}
      >
        <Pressable
          className="items-center justify-center"
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={8}
        >
          <Text style={styles.backIcon}>←</Text>
        </Pressable>

        <Text style={styles.logo}>NEXORA</Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View className="w-full self-center" style={styles.content}>
          {/* Icon with soft rings */}
          <View
            className="items-center justify-center self-center"
            style={styles.iconOuter}
          >
            <View
              className="items-center justify-center"
              style={styles.iconInner}
            >
              <Text style={styles.iconEmoji}>🔐</Text>
            </View>
          </View>

          {/* Heading */}
          <Text className="mt-8 text-center" style={styles.title}>
            Forgot Password?
          </Text>

          <Text className="mt-3 text-center" style={styles.subtitle}>
            No worries! Enter the email linked to your account and we'll send
            you a code to reset your password.
          </Text>

          {/* Card */}
          <View className="mt-8" style={styles.card}>
            <Text className="mb-2" style={styles.label}>
              Email address
            </Text>

            <View
              className="flex-row items-center px-4 mt-5"
              style={styles.inputContainer}
            >
              <Text className="mr-3" style={styles.inputIcon}>
                ✉️
              </Text>

              <TextInput
                className="flex-1"
                placeholder="name@example.com"
                placeholderTextColor="#A1A1AA"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            <Pressable
              className="w-full items-center justify-center mt-5"
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>Send Reset Code</Text>
            </Pressable>
          </View>

          {/* Back to sign in */}
          <Pressable
            className="flex-row items-center justify-center mt-8"
            onPress={() => router.push("/login")}
          >
            <Text style={styles.backToLoginArrow}>←</Text>
            <Text className="ml-2" style={styles.backToLogin}>
              Back to Sign In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8FC",
  },

  header: {
    paddingTop:
      Platform.OS === "web" ? 24 : (StatusBar.currentHeight ?? 44) + 8,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECF1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  backIcon: {
    fontSize: 20,
    color: "#18181B",
  },

  logo: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6C5CE7",
    letterSpacing: 3,
  },

  headerSpacer: {
    width: 42,
    height: 42,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 48,
  },

  content: {
    maxWidth: 420,
  },

  iconOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F1EEFF",
  },

  iconInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#E4DFFF",
  },

  iconEmoji: {
    fontSize: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#18181B",
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#71717A",
    paddingHorizontal: 8,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0F0F5",
    /*  ios */
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#27272A",
  },

  inputContainer: {
    height: 54,
    backgroundColor: "#F8F8FC",
    borderWidth: 1.5,
    borderColor: "#E4E4E7",
    borderRadius: 14,
  },

  inputIcon: {
    fontSize: 18,
  },

  input: {
    fontSize: 15,
    color: "#18181B",
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },

  button: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#6C5CE7",
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  backToLoginArrow: {
    fontSize: 16,
    color: "#6C5CE7",
  },

  backToLogin: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6C5CE7",
  },
});
