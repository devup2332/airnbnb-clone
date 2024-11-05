import { BlurView } from "expo-blur";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingPage = () => {
  return (
    <View style={styles.container}>
      <BlurView intensity={100} style={styles.blurContainer} tint="light">
        <Text>Booking</Text>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    paddingTop: 120,
  },
});

export default BookingPage;
