import { useTheme } from "@/hooks/use-theme";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const colors = useTheme();
  return (
    <View
      className="flex-1 items-center justify-center px-6"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* logo */}
      <Text className="mb-10" style={styles.logo}>
        NEXORA
      </Text>
      <Text className="mb-[30px]" style={styles.icon}>
        🛍️
      </Text>

      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>
        {" "}
        Find Your Next {"\n"}Favorite Thing
      </Text>

      {/* Subtitle */}
      <Text
        className="mt-[14px] mb-10 justify-center"
        style={[styles.subtitle, { color: colors.textSecondary }]}
      >
        Discover Products{"\n"} you will love
      </Text>
      <Pressable
        onPress={() => router.push("/login")}
        className="w-full items-center justify-center"
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>

      {/*  login */}

      <Text className="mt-5" style={styles.loginText}>
        Already have an account? <Text style={styles.login}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#F8F8FC",
    padding: 24,
  },

  logo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#6C5CE7",
    letterSpacing: 2,
  },

  icon: {
    fontSize: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    // color: "#18181B",
    lineHeight: 40,
  },

  subtitle: {
    fontSize: 15,
    // color: "#71717A",
  },

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

  loginText: {
    fontSize: 14,
    color: "#71717A",
  },

  login: {
    color: "#6C5CE7",
    fontWeight: "700",
  },
});

// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>NEXORA</Text>
//     </View>
//   );
// }
