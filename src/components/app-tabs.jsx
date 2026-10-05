import { useTheme } from "@/hooks/use-theme";
import { useCartStore } from "@/store/cartStore";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function AppTabs() {
  const colors = useTheme();
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  console.log("CART COUNT:", cartCount);

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ color: colors.text }}
    >
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/home.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      {/* <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/explore.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger> */}
      <NativeTabs.Trigger name="cart">
        {cartCount > 0 && (
          <NativeTabs.Trigger.Badge>
            {String(cartCount)}
          </NativeTabs.Trigger.Badge>
        )}

        <NativeTabs.Trigger.Label>cart</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/cart.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/profile.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
