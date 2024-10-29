import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconGoogle from "@/assets/icons/IconGoogle";
import IconApple from "@/assets/icons/IconApple";
import IconFacebook from "@/assets/icons/IconFacebook";
import IconPhone from "@/assets/icons/IconPhone";
import { useOAuth } from "@clerk/clerk-expo";

enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
  Apple = "oauth_apple",
}

const buttons = [
  {
    title: "Continue with Phone",
    Icon: IconPhone,
    s: Strategy.Google,
  },
  {
    title: "Continue with Facebook",
    Icon: IconFacebook,
    s: Strategy.Facebook,
  },
  {
    title: "Continue with Google",
    Icon: IconGoogle,
    s: Strategy.Google,
  },
  {
    title: "Continue with Apple",
    Icon: IconApple,
    s: Strategy.Apple,
  },
];

const LoginModal = () => {
  // useWarmUpBrowser()
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.95];
  const router = useRouter();
  const scale = animation.interpolate({ inputRange, outputRange });
  const [stylesFocused, setStylesFocused] = useState({});

  // Strategies
  const { startOAuthFlow: googleStrategy } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: facebookStrategy } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { startOAuthFlow: appleStrategy } = useOAuth({
    strategy: "oauth_apple",
  });

  const selectOAuth = async (strategy: Strategy) => {
    const selected = {
      [Strategy.Google]: googleStrategy,
      [Strategy.Facebook]: facebookStrategy,
      [Strategy.Apple]: appleStrategy,
    }[strategy];
    try {
      const { createdSessionId, setActive } = await selected();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push("/(tabs)/");
      }
    } catch (err) {
      console.error({ err });
    }
  };

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,

      speed: 200,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      speed: 200,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="close-outline" size={24} />
      </TouchableOpacity>
      <Text style={styles.titleStyles}>Log in or sign up to Airnbnb</Text>

      <TextInput
        autoCapitalize="none"
        onFocus={() =>
          setStylesFocused({
            borderColor: "#000000",
            borderWidth: 2,
          })
        }
        placeholder="Email"
        style={[
          defaultStyles.inputField,
          {
            marginBottom: 30,
            ...stylesFocused,
          },
        ]}
      />
      <Animated.View style={[{ transform: [{ scale }] }]}>
        <TouchableWithoutFeedback
          onPressIn={() => onPressIn()}
          onPressOut={() => onPressOut()}
        >
          <View style={defaultStyles.btn}>
            <Text style={defaultStyles.btnText}>Continue</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>

      <View style={styles.separator}>
        <View style={styles.separatorLine} />
        <Text>Or</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={{ gap: 10 }}>
        {buttons.map(({ Icon, title, s }, index) => {
          return (
            <TouchableOpacity
              style={styles.btnOutline}
              key={index}
              onPress={() => selectOAuth(s)}
            >
              <Icon width={20} height={20} />
              <Text style={styles.textOutlineButton}>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
  },
  titleStyles: {
    fontFamily: "mon-sb",
    fontSize: 22,
    marginTop: 25,
    marginBottom: 50,
  },
  separator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
    gap: 10,
  },
  separatorLine: {
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 1,
    flex: 1,
  },
  btnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
    height: 50,
    borderRadius: 8,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  textOutlineButton: {
    flex: 1,
    textAlign: "center",
    fontFamily: "mon-sb",
  },
});

export default LoginModal;
