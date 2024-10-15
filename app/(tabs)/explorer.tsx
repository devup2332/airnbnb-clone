import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const ExplorerPage = () => {
  return (
    <View style={styles.container}>
      <Link href='/(modals)/login'>Login</Link>
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
  },
});

export default ExplorerPage
