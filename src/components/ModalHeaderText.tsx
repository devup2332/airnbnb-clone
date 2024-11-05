import Colors from "@/constants/Colors";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            borderBottomWidth: active === 0 ? 2 : 0,
            borderBottomColor: active === 0 ? "#000" : "transparent",
          },
        ]}
        onPress={() => setActive(0)}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: active === 0 ? "#000" : Colors.grey,
            },
          ]}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            borderBottomWidth: active === 1 ? 2 : 0,
            borderBottomColor: active === 1 ? "#000" : "transparent",
          },
        ]}
        onPress={() => setActive(1)}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: active === 1 ? "#000" : Colors.grey,
            },
          ]}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    position: "absolute",
    zIndex: 0,
    width: Dimensions.get("window").width,
    left: -Dimensions.get("window").width * 0.035,
    flex: 1,
  },

  buttonText: {
    fontFamily: "mon-sb",
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 3,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalHeaderText;
