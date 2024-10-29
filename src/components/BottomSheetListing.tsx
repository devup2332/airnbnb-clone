import BottomSheet, {
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { StyleSheet, Text, View } from "react-native";
import Listing from "./Listing";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useRef } from "react";

interface Props {
  items: Array<any>;
  category: string;
  hideTabBar: (hide: boolean) => void;
}

const BottomSheetListing = ({ items, category, hideTabBar }: Props) => {
  const snapPoints = [150, "100%"];
  const bottomSheetRef = useRef<BottomSheet>(null);

  const showMap = () => {
    bottomSheetRef.current?.collapse();
  };
  return (
    <BottomSheet
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      ref={bottomSheetRef}
      backgroundStyle={styles.backgroundBottomSheet}
      index={1}
      style={styles.bottomSheet}
      onChange={(i) => {
        if (i === 0) {
          hideTabBar(true);
        } else {
          hideTabBar(false);
        }
      }}
    >
      <BottomSheetView style={styles.bottomSheetView}>
        <Listing items={items} category={category} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity style={styles.btn} onPress={showMap}>
            <Text
              style={{
                fontFamily: "mon-sb",
                fontSize: 14,
                color: "#fff",
              }}
            >
              Map
            </Text>
            <Ionicons name="map" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
  },
  bottomSheetView: {
    flex: 1,
  },
  backgroundBottomSheet: {
    borderRadius: 20,
  },
  absoluteBtn: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    borderRadius: 20,
    alignItems: "center",
    padding: 8,
    paddingHorizontal: 20,
    gap: 10,
    flexDirection: "row",
  },
});

export default BottomSheetListing;
