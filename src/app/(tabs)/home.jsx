import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/ProductCard";
import api from "../../services/api";

export default function Home() {
  const colors = useTheme();
  const { signOut } = useAuth();
  const [homeSearch, setHomeSearch] = useState("");

  //   const products = [
  //     {
  //       id: 1,
  //       emoji: "👟",
  //       name: "Running Shoes",
  //       price: "₹999",
  //     },
  //     {
  //       id: 2,
  //       emoji: "🎧",
  //       name: "Wireless Headphones",
  //       price: "₹1,499",
  //     },
  //   ];

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products");
      return response.data.products;
    },
  });
  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Loading products...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        className="flex-1 px-6"
        style={[styles.scrollView, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4">
          <Text style={[styles.logo, { color: colors.primary }]}>NEXORA</Text>
          {/* <Text style={styles.cartIcon}>🛒</Text> */}
          {/* <Pressable onPress={() => signOut()}>
          <Text style={{ color: colors.text }}>Sign Out</Text>
        </Pressable> */}
        </View>

        {/* Greeting */}
        <Text className="mt-10" style={[styles.title, { color: colors.text }]}>
          Hello 👋
        </Text>

        <Text
          className="mt-2"
          style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          What are you looking for today?
        </Text>

        {/*   Search Bar */}

        <View
          className="flex-row items-center mt-6"
          style={[
            styles.searchContainer,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search Products..."
            placeholderTextColor="#A1A1AA"
            style={[styles.searchInput, { color: colors.text }]}
            value={homeSearch}
            onChangeText={setHomeSearch}
            onSubmitEditing={() =>
              router.push({
                pathname: "/products",
                params: { search: homeSearch },
              })
            }
            returnKeyType="search"
          />
        </View>

        {/* Categories */}
        <Text
          className="mt-7"
          style={[styles.sectionTitle, { color: colors.text }]}
        >
          Categories
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          <View style={styles.categoryItem}>
            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={styles.categoryEmoji}>👕</Text>
            </View>

            <Text
              style={[styles.categoryText, { color: colors.textSecondary }]}
            >
              Fashion
            </Text>
          </View>

          <View style={styles.categoryItem}>
            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={styles.categoryEmoji}>👟</Text>
            </View>

            <Text
              style={[styles.categoryText, { color: colors.textSecondary }]}
            >
              Shoes
            </Text>
          </View>

          <View style={styles.categoryItem}>
            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={styles.categoryEmoji}>💻</Text>
            </View>

            <Text
              style={[styles.categoryText, { color: colors.textSecondary }]}
            >
              Electronics
            </Text>
          </View>

          <View style={styles.categoryItem}>
            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={styles.categoryEmoji}>💄</Text>
            </View>

            <Text
              style={[styles.categoryText, { color: colors.textSecondary }]}
            >
              Beauty
            </Text>
          </View>

          <View style={styles.categoryItem}>
            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={styles.categoryEmoji}>💍</Text>
            </View>

            <Text
              style={[styles.categoryText, { color: colors.textSecondary }]}
            >
              Accessories
            </Text>
          </View>
          <View style={styles.categoryItem}>
            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={styles.categoryEmoji}>🪑</Text>
            </View>

            <Text
              style={[styles.categoryText, { color: colors.textSecondary }]}
            >
              Furniture
            </Text>
          </View>
        </ScrollView>

        {/* Featured Products */}
        <View className="flex-row items-center justify-between mt-8">
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Featured Products
          </Text>

          <Pressable onPress={() => router.push("/products")}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>
              See All
            </Text>
          </Pressable>
        </View>

        <View className="flex-row flex-wrap justify-between mt-4">
          {products.slice(0, 10).map((product) => (
            <Pressable
              key={product.id}
              style={{ width: "48%" }}
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <ProductCard
                id={product.id}
                image={product.images[0]}
                name={product.title}
                price={product.price}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F8F8FC",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    // color: "#71717A",
  },
  scrollView: {
    // backgroundColor: "#F8F8FC",
  },
  contentContainer: {
    paddingBottom: 30,
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
    // color: "#6C5CE7",
    letterSpacing: 2,
  },

  cartIcon: {
    fontSize: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    // color: "#18181B",
  },

  subtitle: {
    fontSize: 15,
    // color: "#71717A",
  },
  searchContainer: {
    height: 52,
    // backgroundColor: "#FFFFFF",
    borderWidth: 1,
    // borderColor: "#E4E4E7",
    borderRadius: 12,
    paddingHorizontal: 14,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    // color: "#18181B",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    // color: "#18181B",
  },

  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },

  categoryIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    // backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    // borderColor: "#E4E4E7",
  },

  categoryEmoji: {
    fontSize: 25,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    // color: "#71717A",
    marginTop: 8,
  },

  seeAll: {
    fontSize: 13,
    fontWeight: "600",
    // color: "#6C5CE7",
  },

  productCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E4E4E7",
  },

  productImage: {
    height: 150,
    borderRadius: 12,
    backgroundColor: "#F4F4F8",
    alignItems: "center",
    justifyContent: "center",
  },

  productEmoji: {
    fontSize: 60,
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#18181B",
    marginTop: 10,
  },

  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6C5CE7",
    marginTop: 5,
  },
});

// import { View, Text } from "react-native";
// import React from "react";
// import { useClerk } from "@clerk/expo";
// import { Button } from "react-native";

// const home = () => {
//   const { signOut } = useClerk();
//   return (
//     <View>
//       <Text>home</Text>
//       <Button
//         title="Sign Out"
//         onPress={async () => {
//           await signOut();
//         }}
//       />
//     </View>
//   );
// };
