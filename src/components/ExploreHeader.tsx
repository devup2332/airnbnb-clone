import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

interface Props {
  dataChanged: (category: string) => void;
}

const ExploreHeader = ({ dataChanged }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);

  const selectCathegory = (index: number) => {
    const selected = itemsRef.current[index];

    setCurrentIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, animated: true });
    });
    dataChanged(categories[index].name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.actionRow}>
          <Link asChild href="/(modals)/booking">
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where to ?</Text>
                <Text
                  style={{
                    fontFamily: "mon",
                    color: Colors.grey,
                    fontSize: 12,
                  }}
                >
                  Anywhere . Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
            paddingHorizontal: 16,
            paddingTop: 20,
          }}
        >
          {categories.map((c, i) => {
            return (
              <TouchableOpacity
                ref={(el) => (itemsRef.current[i] = el)}
                key={i}
                style={{
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderBottomColor:
                    currentIndex === i ? Colors.dark : "transparent",
                  paddingBottom: 10,
                }}
                onPress={() => selectCathegory(i)}
              >
                <MaterialIcons
                  name={c.icon as any}
                  size={24}
                  color={currentIndex === i ? Colors.dark : "#c2c2c2"}
                />
                <Text
                  style={{
                    color: currentIndex === i ? Colors.dark : "#c2c2c2",
                    fontFamily: "mon-sb",
                    fontSize: 12,
                    marginTop: 5,
                  }}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    top: 0,
    paddingTop: 20,
    shadowRadius: 6,
    elevation: 7,
    shadowOffset: {
      width: 0,
      height: 20,
    },
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 30,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    zIndex: 999,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.12,
    elevation: 8,
  },
  sliderItem: {
    color: Colors.grey,
  },
});

export default ExploreHeader;
