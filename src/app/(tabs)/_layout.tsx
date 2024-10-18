import Colors from "@/constants/Colors"
import { AntDesign, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

const Layout = () => {
  return <Tabs screenOptions={{
    tabBarActiveTintColor: Colors.primary,
    tabBarStyle: {
      height: 60,
      paddingBottom: 10,
      elevation: 0,
      borderColor: "transparent",
    },
    tabBarLabelStyle: {
      fontFamily: "mon-sb",
    }
  }}>

    <Tabs.Screen name="explorer" options={{
      tabBarLabel: "Explore",
      tabBarIcon: ({ color, size }) => {
        return <AntDesign name="search1" color={color} size={size} />
      }
    }} />
    <Tabs.Screen name="whishlist" options={{
      tabBarLabel: "Whishlist",
      tabBarIcon: ({ color, size }) => {
        return <Ionicons name="heart-outline" color={color} size={size} />
      }
    }} />
    <Tabs.Screen name="trips" options={{
      tabBarLabel: "Trips",
      tabBarIcon: ({ color, size }) => {
        return <FontAwesome5 name="airbnb" color={color} size={size} />
      }
    }} />
    <Tabs.Screen name="inbox" options={{
      tabBarLabel: "Inbox",
      tabBarIcon: ({ color, size }) => {
        return <FontAwesome6 name="message" color={color} size={22} />
      }
    }} />
    <Tabs.Screen name="profile" options={{
      tabBarLabel: "Profile",
      tabBarIcon: ({ color, size }) => {
        return <Ionicons name="person-circle-outline" color={color} size={size} />
      }
    }} />
  </Tabs>
}

export default Layout
