// import { useTheme } from "@/hooks/use-theme";
// import { useThemeStore } from "@/store/themeStore";
// import { useAuth, useUser } from "@clerk/expo";
// import { router } from "expo-router";
// import React from "react";
// import {
//   Alert,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useCartStore } from "../../store/cartStore";
// import { useOrderStore } from "../../store/orderStore";
// import { useWishlistStore } from "../../store/wishlistStore";

// const comingSoon = (label) => Alert.alert(label, "this feature is coming soon");

// export default function Profile() {
//   const { user } = useUser();
//   const { signOut } = useAuth();

//   const orderCount = useOrderStore((s) => s.orders.length);
//   const cartCount = useCartStore((s) =>
//     s.items.reduce((sum, i) => sum + i.quantity, 0)
//   );
//   const wishlistCount = useWishlistStore((s) => s.items.length);

//   const displayName = user?.fullName || user?.firstName || "user";
//   const initial = displayName.charAt(0).toUpperCase();
//   const mode = useThemeStore((s) => s.mode);
//   const toggleTheme = useThemeStore((s) => s.toggleTheme);
//   const colors = useTheme();

//   const menu = [
//     {
//       icon: "📦",
//       label: "My Orders",
//       onPress: () => router.push("/orders"),
//     },
//     { icon: "❤️", label: "Wishlist", onPress: () => router.push("/wishlist") },
//     {
//       icon: "📍",
//       label: "Saved Addresses",
//       onPress: () => comingSoon("Saved Addresses"),
//     },
//     {
//       icon: "💳",
//       label: "Payment Methods",
//       onPress: () => comingSoon("Payment Methods"),
//     },
//     {
//       icon: "🔔",
//       label: "Notifications",
//       onPress: () => comingSoon("Notifications"),
//     },
//     {
//       icon: "💬",
//       label: "Help & Support",
//       onPress: () => comingSoon("Help & Support"),
//     },
//     {
//       icon: "📄",
//       label: "Terms & Privacy",
//       onPress: () => comingSoon("Terms & Privacy"),
//     },
//   ];

//   return (
//     <SafeAreaView
//       style={styles.container}
//       edges={["top", "bottom", "left", "right"]}
//     >
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerClassName="pb-[30px]"
//       >
//         <Text style={styles.title}>Profile</Text>

//         {/* User card */}
//         <View style={[styles.card, styles.userRow]}>
//           <Image
//             source={require("../../../assets/images/profileimg/user.png")}
//             style={styles.avator}
//           />

//           <View className="flex-1 ml-3.5">
//             <Text style={styles.name} numberOfLines={1}>
//               {displayName}
//             </Text>
//             <Text style={styles.email} numberOfLines={1}>
//               {user?.primaryEmailAddress?.emailAddress}
//             </Text>
//           </View>
//         </View>

//         {/* Stats */}
//         <View style={styles.statsRow}>
//           <View style={styles.statBox}>
//             <Text style={styles.statValue}>{orderCount}</Text>
//             <Text style={styles.statLabel}>Orders</Text>
//           </View>
//           <View style={styles.statBox}>
//             <Text style={styles.statValue}>{cartCount}</Text>
//             <Text style={styles.statLabel}>In Cart</Text>
//           </View>
//           <View style={styles.statBox}>
//             <Text style={styles.statValue}>{wishlistCount}</Text>
//             <Text style={styles.statLabel}>Wishlist</Text>
//           </View>
//         </View>

//         {/* menu */}

//         <View style={styles.card} className="p-0 mt-4">
//           {menu.map((item, index) => (
//             <Pressable
//               key={item.label}
//               onPress={item.onPress}
//               style={[
//                 styles.menuRow,
//                 index !== menu.length - 1 && styles.menuDivide,
//               ]}
//             >
//               <Text style={styles.menuIcon}>{item.icon}</Text>
//               <Text style={styles.menuLabel}>{item.label}</Text>
//               <Text style={styles.chevron}>›</Text>
//             </Pressable>
//           ))}
//         </View>

//         <Pressable style={styles.menuRow} onPress={toggleTheme}>
//           <Text style={styles.menuIcon}>{mode === "dark" ? "☀️" : "🌙"}</Text>
//           <Text style={styles.menuLabel}>
//             {mode === "dark" ? "Light Mode" : "Dark Mode"}
//           </Text>
//           <Text style={styles.chevron}>›</Text>
//         </Pressable>

//         {/* Sign out */}
//         <Pressable style={styles.signOut} onPress={() => signOut()}>
//           <Text style={styles.signOutText}>Sign Out</Text>
//         </Pressable>

//         <Text style={styles.version}>NEXORA v1.0.0</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F8FC",
//     paddingHorizontal: 20,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: "#18181B",
//     marginVertical: 16,
//   },

//   // User card
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: "#E4E4E7",
//   },

//   userRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   avator: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//   },

//   name: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#18181B",
//   },

//   email: {
//     fontSize: 14,
//     color: "#71717A",
//     marginTop: 4,
//   },

//   // Stats
//   statsRow: {
//     flexDirection: "row",
//     gap: 12,
//     marginTop: 16,
//   },

//   statBox: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E4E4E7",
//     paddingVertical: 14,
//     alignItems: "center",
//   },

//   statValue: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#6C5CE7",
//   },

//   statLabel: {
//     fontSize: 12,
//     color: "#71717A",
//     marginTop: 2,
//   },

//   // Menu
//   menuRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//   },

//   menuDivide: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#F4F4F5",
//   },

//   menuIcon: {
//     fontSize: 20,
//     width: 34,
//   },

//   menuLabel: {
//     flex: 1,
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#18181B",
//   },

//   chevron: {
//     fontSize: 22,
//     color: "#A1A1AA",
//   },

//   // Sign out
//   signOut: {
//     marginTop: 24,
//     height: 50,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E74C3C",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   signOutText: {
//     color: "#E74C3C",
//     fontWeight: "700",
//   },

//   // Version
//   version: {
//     textAlign: "center",
//     fontSize: 12,
//     color: "#A1A1AA",
//     marginTop: 16,
//   },
//   // container: { flex: 1, backgroundColor: "#F8F8FC", paddingHorizontal: 20 },
//   // title: { fontSize: 24, fontWeight: "800", marginVertical: 16 },
//   // card: {
//   //   backgroundColor: "#FFF",
//   //   borderRadius: 16,
//   //   padding: 20,
//   //   borderWidth: 1,
//   //   borderColor: "#E4E4E7",
//   // },
//   // name: { fontSize: 18, fontWeight: "700", color: "#18181B" },
//   // email: { fontSize: 14, color: "#71717A", marginTop: 4 },
//   // signOut: {
//   //   marginTop: 24,
//   //   height: 50,
//   //   borderRadius: 12,
//   //   borderWidth: 1,
//   //   borderColor: "#E74C3C",
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   // },
//   // signOutText: { color: "#E74C3C", fontWeight: "700" },
// });
import { useTheme } from "@/hooks/use-theme";
import { useThemeStore } from "@/store/themeStore";
import { useAuth, useUser } from "@clerk/expo";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "../../store/cartStore";
import { useOrderStore } from "../../store/orderStore";
import { useWishlistStore } from "../../store/wishlistStore";

const comingSoon = (label) => Alert.alert(label, "this feature is coming soon");

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const orderCount = useOrderStore((s) => s.orders.length);
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const displayName = user?.fullName || user?.firstName || "user";
  const mode = useThemeStore((s) => s.mode);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const colors = useTheme();

  const menu = [
    { icon: "📦", label: "My Orders", onPress: () => router.push("/orders") },
    { icon: "❤️", label: "Wishlist", onPress: () => router.push("/wishlist") },
    {
      icon: "📍",
      label: "Saved Addresses",
      onPress: () => comingSoon("Saved Addresses"),
    },
    {
      icon: "💳",
      label: "Payment Methods",
      onPress: () => comingSoon("Payment Methods"),
    },
    {
      icon: "🔔",
      label: "Notifications",
      onPress: () => comingSoon("Notifications"),
    },
    {
      icon: "💬",
      label: "Help & Support",
      onPress: () => comingSoon("Help & Support"),
    },
    {
      icon: "📄",
      label: "Terms & Privacy",
      onPress: () => comingSoon("Terms & Privacy"),
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top", "bottom", "left", "right"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[30px]"
      >
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>

        {/* User card */}
        <View
          style={[
            styles.card,
            styles.userRow,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Image
            source={require("../../../assets/images/profileimg/user.png")}
            style={styles.avator}
          />

          <View className="flex-1 ml-3.5">
            <Text
              style={[styles.name, { color: colors.text }]}
              numberOfLines={1}
            >
              {displayName}
            </Text>
            <Text
              style={[styles.email, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.statBox,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {orderCount}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Orders
            </Text>
          </View>
          <View
            style={[
              styles.statBox,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {cartCount}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              In Cart
            </Text>
          </View>
          <View
            style={[
              styles.statBox,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {wishlistCount}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Wishlist
            </Text>
          </View>
        </View>

        {/* menu */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          className="p-0 mt-4"
        >
          {menu.map((item, index) => (
            <Pressable
              key={item.label}
              onPress={item.onPress}
              style={[
                styles.menuRow,
                index !== menu.length - 1 && [
                  styles.menuDivide,
                  { borderBottomColor: colors.border },
                ],
              ]}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[styles.menuLabel, { color: colors.text }]}>
                {item.label}
              </Text>
              <Text style={[styles.chevron, { color: colors.textSecondary }]}>
                ›
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[
            styles.menuRow,
            styles.themeRow,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          onPress={toggleTheme}
        >
          <Text style={styles.menuIcon}>{mode === "dark" ? "☀️" : "🌙"}</Text>
          <Text style={[styles.menuLabel, { color: colors.text }]}>
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </Text>
          <Text style={[styles.chevron, { color: colors.textSecondary }]}>
            ›
          </Text>
        </Pressable>

        {/* Sign out */}
        <Pressable
          style={[styles.signOut, { borderColor: colors.danger }]}
          onPress={() => signOut()}
        >
          <Text style={[styles.signOutText, { color: colors.danger }]}>
            Sign Out
          </Text>
        </Pressable>

        <Text style={[styles.version, { color: colors.textSecondary }]}>
          NEXORA v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 16,
  },

  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avator: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  email: {
    fontSize: 14,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },

  statBox: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  themeRow: {
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 16,
  },

  menuDivide: {
    borderBottomWidth: 1,
  },

  menuIcon: {
    fontSize: 20,
    width: 34,
  },

  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },

  chevron: {
    fontSize: 22,
  },

  signOut: {
    marginTop: 24,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  signOutText: {
    fontWeight: "700",
  },

  version: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 16,
  },
});
