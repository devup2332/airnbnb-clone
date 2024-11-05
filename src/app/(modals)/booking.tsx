import { places } from "@/assets/data/places";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import DatePicker from "react-native-modern-datepicker";

const guestGroups = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets Allowed",
    count: 0,
  },
];

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const BookingPage = () => {
  const [openCard, setOpenCard] = useState(0);
  const [selectPlace, setSelectedPlace] = useState(0);
  const today = new Date().toISOString().substring(0, 10);
  const [groups, setGroups] = useState(guestGroups);

  const onClearAll = () => {
    setOpenCard(0);
    setSelectedPlace(0);
    setGroups(guestGroups);
  };

  const addCountGroup = (name: string) => {
    setGroups((oldGroups) => {
      return oldGroups.map((group) => {
        if (group.name === name) {
          return {
            ...group,
            count: group.count + 1,
          };
        }
        return group;
      });
    });
  };

  const removeCountGroup = (name: string) => {
    setGroups((oldGroups) => {
      return oldGroups.map((group) => {
        if (group.name === name) {
          return {
            ...group,
            count: group.count - 1,
          };
        }
        return group;
      });
    });
  };
  return (
    <View style={styles.container}>
      <BlurView
        intensity={80}
        style={styles.blurContainer}
        tint="light"
        experimentalBlurMethod="dimezisBlurView"
      >
        <Animated.View style={styles.card}>
          {openCard != 0 && (
            <AnimatedTouchableOpacity
              onPress={() => setOpenCard(0)}
              style={styles.cardPreview}
            >
              <Text style={styles.previewText}>Where</Text>
              <Text style={styles.previewData}>I'm flexible</Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard === 0 && (
            <>
              <Animated.Text style={styles.cardHeader}>Where to?</Animated.Text>
              <Animated.View style={styles.cardBody}>
                <View style={styles.searchSection}>
                  <Ionicons
                    style={styles.searchIcon}
                    name="search-outline"
                    size={20}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Search Destination"
                    placeholderTextColor={Colors.grey}
                  />
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginTop: 20,
                  }}
                  contentContainerStyle={{
                    gap: 25,
                  }}
                >
                  {places.map((place, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedPlace(index)}
                      >
                        <Image
                          source={place.img}
                          style={
                            selectPlace === index
                              ? styles.selectedPlace
                              : styles.placeImage
                          }
                        />
                        <Text
                          style={{
                            fontFamily:
                              selectPlace === index ? "mon-sb" : "mon",
                            paddingTop: 6,
                            textAlign: "center",
                          }}
                        >
                          {place.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </Animated.View>
            </>
          )}
        </Animated.View>

        <View style={styles.card}>
          {openCard != 1 && (
            <AnimatedTouchableOpacity
              onPress={() => setOpenCard(1)}
              style={styles.cardPreview}
            >
              <Text style={styles.previewText}>When</Text>
              <Text style={styles.previewData}>Any week</Text>
            </AnimatedTouchableOpacity>
          )}
          {openCard === 1 && (
            <>
              <Text style={styles.cardHeader}>When's your trip?</Text>
              <Animated.View style={styles.cardBody}>
                <DatePicker
                  current={today}
                  selected={today}
                  mode="calendar"
                  options={{
                    defaultFont: "mon",
                    borderColor: "transparent",
                    textFontSize: 14,
                    headerFont: "mon-b",
                    mainColor: Colors.primary,
                  }}
                />
              </Animated.View>
            </>
          )}
        </View>

        <View style={styles.card}>
          {openCard != 2 && (
            <AnimatedTouchableOpacity
              onPress={() => setOpenCard(2)}
              style={styles.cardPreview}
            >
              <Text style={styles.previewText}>Who</Text>
              <Text style={styles.previewData}>Add guests</Text>
            </AnimatedTouchableOpacity>
          )}
          {openCard === 2 && (
            <>
              <Text style={styles.cardHeader}>Who's coming?</Text>
              <Animated.View>
                {groups.map((group, index) => {
                  return (
                    <View
                      style={[
                        styles.groupItem,
                        {
                          borderBottomWidth:
                            index === groups.length - 1
                              ? 0
                              : StyleSheet.hairlineWidth,
                        },
                      ]}
                      key={index}
                    >
                      <View
                        style={{
                          gap: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "mon-sb",
                            fontSize: 16,
                          }}
                        >
                          {group.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "mon",
                            fontSize: 12,
                          }}
                        >
                          {group.text}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 16,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => removeCountGroup(group.name)}
                          disabled={group.count === 0}
                          style={[
                            styles.buttonGroup,
                            {
                              borderColor:
                                group.count > 0 ? Colors.grey : "transparent",
                            },
                          ]}
                        >
                          <Ionicons
                            name="remove"
                            size={20}
                            color={group.count > 0 ? Colors.grey : "#C2C2C2"}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "mon-sb",
                            fontSize: 16,
                            width: 20,
                            textAlign: "center",
                          }}
                        >
                          {group.count}
                        </Text>
                        <TouchableOpacity
                          style={styles.buttonGroup}
                          onPress={() => addCountGroup(group.name)}
                        >
                          <Ionicons name="add" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </Animated.View>
            </>
          )}
        </View>
        <Animated.View
          style={[
            defaultStyles.footer,
            {
              justifyContent: "center",
            },
          ]}
          entering={SlideInDown}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexGrow: 0,
            }}
          >
            <TouchableOpacity
              onPress={onClearAll}
              style={{
                paddingBottom: 2,
                borderBottomColor: "#000",
                paddingHorizontal: 3,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "mon-sb",
                }}
              >
                Clear all
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.back()}
              style={[
                defaultStyles.btn,
                {
                  paddingHorizontal: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                },
              ]}
            >
              <Ionicons name="search-outline" size={20} color="#fff" />
              <Text style={defaultStyles.btnText}>Search</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
  },
  blurContainer: {
    flex: 1,
    gap: 20,
    paddingTop: WINDOW_HEIGHT * 0.12,
  },
  previewText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },
  previewData: {
    fontFamily: "mon-sb",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: WINDOW_WIDTH * 0.04,
    elevation: 7,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mon-b",
    fontSize: 22,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputField: {
    flex: 1,
    fontFamily: "mon",
  },
  searchIcon: {
    padding: 10,
  },
  searchSection: {
    paddingHorizontal: 10,
    gap: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  placeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  selectedPlace: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey,
  },
  groupItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#C2C2C2",
    marginHorizontal: 20,
  },
  buttonGroup: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 5,
  },
});

export default BookingPage;
