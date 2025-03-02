import { Stack } from "expo-router";
import { PaperProvider, MD3DarkTheme as DarkTheme } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider theme={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}