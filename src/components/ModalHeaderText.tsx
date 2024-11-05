import Colors from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.buttonText,
          {
            borderBottomWidth: active === 0 ? 2 : 0,
            borderBottomColor: active === 0 ? "#000" : "transparent",
          },
        ]}
        onPress={() => setActive(0)}
      >
        <Text
          style={[
            styles.textHeaderStyle,
            {
              color: active === 0 ? "#000" : Colors.grey,
            },
          ]}
        >
          Stays{" "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonText,
          {
            borderBottomWidth: active === 1 ? 2 : 0,
            borderBottomColor: active === 1 ? "#000" : "transparent",
          },
        ]}
        onPress={() => setActive(1)}
      >
        <Text
          style={[
            styles.textHeaderStyle,
            {
              color: active === 1 ? "#000" : Colors.grey,
            },
          ]}
        >
          Experiences{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    flex: 1,
  },

  textHeaderStyle: {
    fontFamily: "mon-sb",
    fontSize: 16,
    color: "#000",
  },
  buttonText: {
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalHeaderText;
