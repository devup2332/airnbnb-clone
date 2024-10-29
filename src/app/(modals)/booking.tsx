import { StyleSheet, Text, View } from "react-native";

const BookingPage = () => {
  return (
    <View style={styles.container}>
      <Text>Booking Modal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookingPage;
