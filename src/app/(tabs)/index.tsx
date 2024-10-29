import ExploreHeader from "@/components/ExploreHeader";
import { Stack, useNavigation } from "expo-router";
import { useMemo, useState } from "react";
import { StatusBar } from "react-native";
import dataListing from "@/assets/data/airbnb.listin.json";
import ListingMaps from "@/components/ListingMaps";
import ListingDataGeo from "@/assets/data/airbnb.listing-geo.json";
import { ListingItemGeo } from "@/interfaces/ListingItemGeo";
import BottomSheetListing from "@/components/BottomSheetListing";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const IndexPageLayout = () => {
  const navigation = useNavigation();

  const data = useMemo(() => dataListing as any[], []);
  const [cat, setCat] = useState("Tiny homes");

  const hideTabBar = (hide: boolean) => {
    navigation.setOptions({});
  };

  const dataChanged = (category: string) => {
    setCat(category);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1,marginTop: -70 }}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen
        options={{
          header: () => <ExploreHeader dataChanged={dataChanged} />,
        }}
      />
      <ListingMaps data={ListingDataGeo as ListingItemGeo} />
      <BottomSheetListing items={data} category={cat} hideTabBar={hideTabBar} />
    </GestureHandlerRootView>
  );
};

export default IndexPageLayout;
