import { useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const ExplorerPage = () => {
  const { isSignedIn } = useAuth()
  console.log({ isSignedIn })
  return (
    <View style={styles.container}>
      {
        isSignedIn ? (
          <Link href="/profile">Profile</Link>
        ) : (
          <Link href="/(modals)/login">Login</Link>
        )
      }
      <Link href="/(modals)/booking">Booking</Link>
      <Link href="/listing/123">Listing Item</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff"
  },
});

export default ExplorerPage
