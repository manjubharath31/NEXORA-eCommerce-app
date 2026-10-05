import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useUser } from "@clerk/expo";
import api from "../../services/api";
import { useCartStore } from "../../store/cartStore";
import { useReviewStore } from "../../store/reviewStore";

function Stars({ rating, size = 16, onRate }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable key={n} disabled={!onRate} onPress={() => onRate?.(n)}>
          <Text style={{ fontSize: size, marginRight: 2 }}>
            {n <= rating ? "⭐" : "☆"}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
const EMPTY_REVIEWS = [];
export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const scale = useRef(new Animated.Value(1)).current;
  const { user } = useUser();
  const addReview = useReviewStore((s) => s.addReview);

  const allReviews = useReviewStore((s) => s.reviews);
  const reviews = allReviews[id] || EMPTY_REVIEWS;
  // const avgRating = useReviewStore((s) => s.getAverageRating(id));
  const avgRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
 
  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => (await api.get(`/products/${id}`)).data,
    enabled: !!id,
  });

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.thumbnail,
    });

    setAdded(true);

    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  const handleSubmitReview = () => {
    if (myRating === 0 || !myComment.trim()) return;

    addReview(id, {
      id: Date.now().toString(),
      author: user?.fullName || user?.firstName || "Anonymous",
      rating: myRating,
      comment: myComment.trim(),
      date: new Date().toISOString(),
    });

    setMyRating(0);
    setMyComment("");
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (isError || !product) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <View style={styles.center}>
          <Text style={styles.title}>Couldn't load product</Text>
          <Text style={styles.description}>{error?.message}</Text>
          <Pressable onPress={() => refetch()}>
            <Text style={styles.back}>Try again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.images?.[0] || product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <View style={styles.ratingRow}>
          <Stars rating={Math.round(avgRating)} />

          <Text style={styles.ratingText}>
            {avgRating > 0 ? avgRating.toFixed(1) : "No ratings yet"}

            {reviews.length > 0 ? ` (${reviews.length})` : ""}
          </Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        {/* review form */}

        <View style={styles.reviewForm}>
          <Text style={styles.sectionTitle}>Write a Review</Text>

          <Stars rating={myRating} size={26} onRate={setMyRating} />

          <TextInput
            placeholder="Share your thoughts..."
            placeholderTextColor="#A1A1AA"
            style={styles.commentInput}
            value={myComment}
            onChangeText={setMyComment}
            multiline
          />

          <Pressable
            style={[
              styles.submitButton,
              (myRating === 0 || !myComment.trim()) && styles.submitDisabled,
            ]}
            onPress={handleSubmitReview}
            disabled={myRating === 0 || !myComment.trim()}
          >
            <Text style={styles.submitText}>Submit Review</Text>
          </Pressable>
        </View>

        {/* review list */}

        <View style={styles.reviewsList}>
          <Text style={styles.sectionTitle}>
            Reviews {reviews.length > 0 ? `(${reviews.length})` : ""}
          </Text>

          {reviews.length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet. Be the first!</Text>
          ) : (
            reviews.map((r) => (
              <View key={r.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewAuthor}>{r.author}</Text>

                  <Text style={styles.reviewDate}>
                    {new Date(r.date).toLocaleDateString()}
                  </Text>
                </View>

                <Stars rating={r.rating} size={14} />

                <Text style={styles.reviewComment}>{r.comment}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          className="mb-20"
          style={[styles.addButton, added && styles.addButtonSuccess]}
          // onPress={() =>
          //   addToCart({
          //     id: product.id,
          //     title: product.title,
          //     price: product.price,
          //     image: product.images?.[0] || product.thumbnail,
          //   })
          // }
          onPress={handleAddToCart}
        >
          <Text style={styles.addButtonText}>
            {added ? "Added ✓" : "Add to Cart"}
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FC",
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    fontSize: 15,
    color: "#6C5CE7",
    fontWeight: "600",
    marginVertical: 12,
  },
  image: {
    width: "100%",
    height: 260,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#18181B",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6C5CE7",
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },

  ratingText: {
    fontSize: 13,
    color: "#71717A",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#18181B",
    marginBottom: 10,
  },

  reviewForm: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    padding: 16,
  },

  commentInput: {
    marginTop: 12,
    minHeight: 70,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#18181B",
    textAlignVertical: "top",
  },

  submitButton: {
    marginTop: 12,
    height: 44,
    backgroundColor: "#6C5CE7",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  submitDisabled: {
    backgroundColor: "#C4B9F5",
  },

  submitText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
  },

  reviewsList: {
    marginTop: 24,
    marginBottom: 20,
  },

  noReviews: {
    fontSize: 13,
    color: "#A1A1AA",
  },

  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    padding: 14,
    marginBottom: 10,
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  reviewAuthor: {
    fontSize: 14,
    fontWeight: "700",
    color: "#18181B",
  },

  reviewDate: {
    fontSize: 12,
    color: "#A1A1AA",
  },

  reviewComment: {
    fontSize: 13,
    color: "#52525B",
    marginTop: 6,
    lineHeight: 18,
  },

  description: {
    fontSize: 14,
    color: "#71717A",
    marginTop: 12,
    lineHeight: 20,
  },
  addButton: {
    height: 52,
    backgroundColor: "#6C5CE7",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  addButtonSuccess: {
    backgroundColor: "#22C55E",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
