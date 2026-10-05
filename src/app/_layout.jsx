import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  useRouter,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "../global.css";
import queryClient from "../lib/queryClient";
// import AppTabs from "@/components/app-tabs";
import ChatFab from "@/components/ChatFab";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
console.log("Clerk key:", publishableKey);

// Screens that don't require a signed-in user
const PUBLIC_ROUTES = [
  "login",
  "register",
  "forgot-password",
  "verify",
  "index",
];

function AuthGate({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; // wait until Clerk knows the real auth state

    SplashScreen.hideAsync();

    const currentRoute = segments[0]; // e.g. "home", "login", undefined for "/"
    const isPublicRoute = !currentRoute || PUBLIC_ROUTES.includes(currentRoute);

    if (!isSignedIn && !isPublicRoute) {
      // trying to reach a protected screen without a session → bounce to login
      router.replace("/login");
    } else if (isSignedIn && currentRoute === "login") {
      // already signed in but sitting on the login screen → send them in
      router.replace("/(tabs)/home");
    }
  }, [isSignedIn, isLoaded, segments]);

  return children;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <AuthGate>
              {/* <AnimatedSplashOverlay /> */}
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="forgot-password" />
                <Stack.Screen name="verify" />
                {/* <Stack.Screen name="home" /> */}
                <Stack.Screen name="(tabs)" />
              </Stack>
            </AuthGate>
            {/* <AppTabs /> */}
            <ChatFab />
          </ThemeProvider>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
