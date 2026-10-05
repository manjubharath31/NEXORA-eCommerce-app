import Constants from "expo-constants";
import { Platform } from "react-native";

export function getApiBaseUrl() {
  if (Platform.OS === "web") return ""; // relative paths work fine on web

  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.hostUri;

  if (!hostUri) {
    console.warn(
      "Could not determine dev server host — chat API calls may fail."
    );
    return "";
  }

  // Tunnel URLs (ngrok / exp.direct) are HTTPS; LAN IPs are plain HTTP
  const isTunnel = hostUri.includes("exp.direct") || hostUri.includes("ngrok");
  const protocol = isTunnel ? "https" : "http";

  return `${protocol}://${hostUri}`;
}
