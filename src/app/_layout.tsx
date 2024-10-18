import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store'
import { Stack, useRouter } from 'expo-router';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import monRegular from '@/assets/fonts/Montserrat-Regular.ttf';
import monBold from '@/assets/fonts/Montserrat-Bold.ttf';
import monSemi from '@/assets/fonts/Montserrat-SemiBold.ttf';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

const PUBLIC_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('SecureStore get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value)
      } catch (err) {
        return
      }
    },
  }
  const [loaded, error] = useFonts({
    "mon": monRegular,
    "mon-b": monBold,
    "mon-sb": monSemi,
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

  return <ClerkProvider tokenCache={tokenCache} publishableKey={PUBLIC_KEY}>
    <RootLayoutNav />
  </ClerkProvider >;
}

function RootLayoutNav() {

  const router = useRouter()

  const { isLoaded, isSignedIn } = useAuth()
  console.log({ isLoaded, isSignedIn })

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login')
    }
  }, [])

  return (
    <Stack >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/login" options={{
        animation: "slide_from_bottom", presentation: "modal", headerShown: false, headerBackVisible: false, headerTitleStyle: {
          fontFamily: "mon-sb"
        },
      }} />
      <Stack.Screen name='listing/[id]' options={{
        headerTitle: ""
      }} />
      <Stack.Screen name='(modals)/booking' options={{
        presentation: "transparentModal",
        animation: "fade",
        headerLeft: () => <TouchableOpacity onPress={() => { router.back() }} style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} />
        </TouchableOpacity>
      }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})
