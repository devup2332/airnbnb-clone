import { Button, Text, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const ProfilePage = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      <Button title="Log out" onPress={() => signOut()} />

      {!isSignedIn && (
        <Link href="/(modals)/login">
          <Text>Login</Text>
        </Link>
      )}
    </View>
  );
};

export default ProfilePage;
