import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ProfilePage = () => {
  const [edit, setEdit] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>(user?.firstName!);
  const [lastName, setLastName] = useState<string>(user?.lastName!);
  const { signOut } = useAuth();

  const onSaveUser = async () => {
    if (!user) return;
    try {
      await user.update({
        firstName,
        lastName,
      });
    } catch (err: any) {
      console.error({ ...err });
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} color="black" />
      </View>
      {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image
              style={styles.userImage}
              source={{
                uri: user?.imageUrl,
              }}
            />
          </TouchableOpacity>
          {edit ? (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={[
                  defaultStyles.inputField,
                  { width: 100, fontFamily: "mon" },
                ]}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={[
                  defaultStyles.inputField,
                  { width: 100, fontFamily: "mon" },
                ]}
              />
              <TouchableOpacity onPress={onSaveUser}>
                <Ionicons name="checkmark-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "mon-b",
                  fontSize: 20,
                }}
              >
                {user?.firstName} {user?.lastName}
              </Text>
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Ionicons name="create-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
          <Text>{user?.emailAddresses[0].emailAddress}</Text>
          <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}
      {user ? (
        <TouchableOpacity
          style={[
            defaultStyles.btn,
            { backgroundColor: "#000", marginTop: 20 },
          ]}
          onPress={() => signOut()}
        >
          <View>
            <Text style={defaultStyles.btnText}>Log Out</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[defaultStyles.btn, { marginTop: 20 }]}
          onPress={() => {
            router.push("/(modals)/login");
          }}
        >
          <View>
            <Text style={defaultStyles.btnText}>Login</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontFamily: "mon-b",
    fontSize: 24,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    gap: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: "center",
    shadowColor: "#000",
    elevation: 7,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
});

export default ProfilePage;
