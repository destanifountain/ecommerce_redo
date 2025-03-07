import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Products",
            headerRight: () => (
              <TouchableOpacity onPressIn={() => router.push("/modal")}>
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            ),
            header: () => <Header />,
          }}
        />

        <Stack.Screen name="modal" options={{ presentation: "modal" }} />

        <Stack.Screen
          name="details/[id]"
          options={{
            header: () => <Header />,
          }}
        />
      </Stack>
      <NavigationBar />
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
    </View>
  );
}

function NavigationBar() {
  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity
        style={styles.navigationItem}
        onPress={() => router.push("/cart")}
      >
        <Ionicons name="cart" size={24} color="black" />
        <Text style={styles.navigationText}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationItem}
        onPress={() => router.push("/profile")}
      >
        <Ionicons name="person" size={24} color="black" />
        <Text style={styles.navigationText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f2f2f2",
    height: 60,
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingVertical: 12,
  },
  navigationItem: {
    alignItems: "center",
  },
  navigationText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
