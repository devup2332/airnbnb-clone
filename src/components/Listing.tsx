import { ListingItem } from "@/interfaces/ListingItem";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Href, Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
  items: Array<any>;
  category: string;
}

const Listing: React.FC<Props> = ({ category, items }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null;
    setLoading(true);
    timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [category]);

  const renderItem: ListRenderItem<ListingItem> = ({ item }) => {
    const href = `/listing/${item.id}` as Href<string>;
    return (
      <Link href={href} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listingItemContainer}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image
              source={{
                uri: item.xl_picture_url!,
              }}
              style={styles.listingItemImage}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 30,
                top: 30,
              }}
            >
              <Ionicons name="heart-outline" size={24} color={"#000"} />
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 16,
                }}
              >
                {item.name.length > 35
                  ? item.name.slice(0, 35) + " ..."
                  : item.name}
              </Text>
              <View style={{ gap: 5, flexDirection: "row" }}>
                <Ionicons name="star" size={16} />
                <Text
                  style={{
                    fontFamily: "mon-sb",
                  }}
                >
                  {item.review_scores_rating}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontFamily: "mon",
              }}
            >
              {item.room_type}
            </Text>

            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: "mon-sb" }}>$ {item.price}</Text>
              <Text style={{ fontFamily: "mon" }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  useEffect(() => {}, [category]);
  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        ListHeaderComponent={() => {
          return <Text style={styles.header}>{items.length} homes</Text>;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: 20,
        }}
        data={loading ? [] : items}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  listingItemContainer: {
    gap: 10,
  },
  listingItemBox: {},
  listingItemImage: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  header: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },
});

export default Listing;
