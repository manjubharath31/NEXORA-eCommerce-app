// import { useSignUp } from "@clerk/expo";
// import { router } from "expo-router";
// import React, { useState } from "react";
// import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// export default function Verify() {
//   const {signUp} = useSignUp();

//   const [code, setCode] = useState("");
//   const [error, setError] = useState("");

//   const handleVerify = async () => {
//     if (!isLoaded) {
//       return;
//     }

//     setError("");

//     if (!code.trim()) {
//       setError("Please enter the verification code");
//       return;
//     }

//     try {
//         console.log("1. Verifying email code...");
//       const {error:verifyError} = await signUp.verifications.verifyEmailCode({
//         code: code.trim(),
//       });

//       console.log("Verification result:", result);

//       if (result.status === "complete") {
//         await setActive({
//           session: result.createdSessionId, // ← makes this session the current logged-in session
//         });
//         console.log("Email verification successful!");
//       }
//     } catch (error) {
//       console.log("Verification error:", error);

//       setError(
//         error?.errors?.[0]?.longMessage ||
//           "Invalid verification code. Please try again."
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.logo}>NEXORA</Text>

//       <Text style={styles.title}>Verify Your Email</Text>

//       <Text style={styles.subtitle}>
//         We sent a verification code to your email address.
//       </Text>

//       <TextInput
//         placeholder="Enter verification code"
//         placeholderTextColor="#A1A1AA"
//         keyboardType="number-pad"
//         value={code}
//         onChangeText={setCode}
//         style={styles.input}
//         maxLength={6}
//       />

//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       <Pressable style={styles.button} onPress={handleVerify}>
//         <Text style={styles.buttonText}>Verify Email</Text>
//       </Pressable>

//       <Pressable onPress={() => router.back()}>
//         <Text style={styles.backText}>Back to Register</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F8FC",
//     paddingHorizontal: 24,
//     justifyContent: "center",
//   },

//   logo: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: "#6C5CE7",
//     textAlign: "center",
//     marginBottom: 30,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#18181B",
//     textAlign: "center",
//     marginBottom: 12,
//   },

//   subtitle: {
//     fontSize: 15,
//     color: "#71717A",
//     textAlign: "center",
//     lineHeight: 22,
//     marginBottom: 30,
//   },

//   input: {
//     height: 55,
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1,
//     borderColor: "#E4E4E7",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     color: "#18181B",
//     textAlign: "center",
//     letterSpacing: 4,
//   },

//   error: {
//     color: "#DC2626",
//     fontSize: 13,
//     marginTop: 8,
//   },

//   button: {
//     height: 55,
//     backgroundColor: "#6C5CE7",
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },

//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   backText: {
//     color: "#6C5CE7",
//     fontSize: 14,
//     fontWeight: "600",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });
import { useSignUp } from "@clerk/expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Verify() {
  const { signUp } = useSignUp();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");

    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    try {
      console.log("1. Verifying email code...");

      const { error: verifyError } = await signUp.verifications.verifyEmailCode(
        {
          code: code.trim(),
        }
      );

      if (verifyError) {
        console.log("2. Verification error:", verifyError);

        setError(
          verifyError?.message || "Invalid verification code. Please try again."
        );

        return;
      }

      console.log("3. Email verification successful");

      /*
       * After the email is verified, check whether
       * the sign-up is complete.
       */
      if (signUp.status === "complete") {
        console.log("4. Sign-up is complete");

        /*
         * Finalize the sign-up.
         * This creates/activates the Clerk session.
         */
        const { error: finalizeError } = await signUp.finalize();

        if (finalizeError) {
          console.log("5. Finalize error:", finalizeError);

          setError(
            finalizeError?.message ||
              "Unable to complete registration. Please try again."
          );

          return;
        }

        console.log("6. Active session created");
        console.log("7. Registration successful");

        router.replace("/home");
      } else {
        console.log("Sign-up is not complete:", signUp.status);
      }
    } catch (error) {
      console.log("VERIFY ERROR:", error);

      setError(error?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>NEXORA</Text>

      <Text style={styles.title}>Verify Your Email</Text>

      <Text style={styles.subtitle}>
        We sent a verification code to your email address.
      </Text>

      <TextInput
        placeholder="Enter verification code"
        placeholderTextColor="#A1A1AA"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        maxLength={6}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify Email</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>Back to Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FC",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6C5CE7",
    textAlign: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#18181B",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    color: "#71717A",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },

  input: {
    height: 55,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#18181B",
    textAlign: "center",
    letterSpacing: 4,
  },

  error: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 8,
  },

  button: {
    height: 55,
    backgroundColor: "#6C5CE7",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  backText: {
    color: "#6C5CE7",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
});
