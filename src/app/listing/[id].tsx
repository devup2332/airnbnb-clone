import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import listingData from "@/assets/data/airbnb.listin.json";
import { ListingItem } from "@/interfaces/ListingItem";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useLayoutEffect } from "react";
const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const ListTingItemPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);
  const navigation = useNavigation();
  const item = (listingData as ListingItem[]).find((i) => i.id === id);
  if (!item)
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );

  const animatedImageStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  }, []);

  const animatedHeaderStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffSet.value, [0, IMG_HEIGHT / 2], [0, 1]),
    };
  }, []);

  const shareButton = async () => {
    try {
      await Share.share({
        title: item?.name,
        url: item?.listing_url!,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View style={[animatedHeaderStyles, styles.header]} />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundedButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <TouchableOpacity style={styles.roundedButton} onPress={shareButton}>
            <Ionicons name="share-outline" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundedButton}>
            <Ionicons name="heart-outline" size={22} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{
            uri: item?.xl_picture_url!,
          }}
          style={[styles.imageItem, animatedImageStyles]}
          resizeMode="cover"
        />

        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{item?.name}</Text>
          <Text style={styles.itemLocation}>
            {item.room_type} in {item.smart_location}
          </Text>

          <Text style={styles.itemRooms}>
            {item.guests_included} guests · {item.bedrooms} bedrooms ·{" "}
            {item.beds} beds · {item.bathrooms} baths
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Ionicons name="star" size={16} />
            <Text style={styles.itemRatings}>
              {item.review_scores_rating! / 20} . {item.number_of_reviews}{" "}
              reviews
            </Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.hostView}>
            <Image
              source={{
                uri: item.host_picture_url!,
              }}
              style={styles.hostImage}
            />
            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {item.host_name}
              </Text>
              <Text>Host since {item.host_since}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.itemPrice}>$ {item.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              defaultStyles.btn,
              {
                paddingHorizontal: 24,
              },
            ]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageItem: {
    height: IMG_HEIGHT,
    width,
  },
  itemName: {
    fontSize: 26,
    fontFamily: "mon-sb",
  },
  itemLocation: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mon-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#c2c2c2",
    marginVertical: 16,
  },
  itemContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  itemRooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: "mon",
  },
  itemRatings: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  hostImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  itemDescription: {
    fontFamily: "mon",
    fontSize: 16,
    lineHeight: 24,
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  footerText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  roundedButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
  },
  header: {
    height: 120,
    backgroundColor: "#fff",
    flex: 1,
    elevation: 10,
    borderBottomColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default ListTingItemPage;
