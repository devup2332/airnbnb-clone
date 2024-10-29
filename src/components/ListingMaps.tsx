import { Feature, ListingItemGeo } from "@/interfaces/ListingItemGeo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

interface Props {
  data: ListingItemGeo;
}

const INITIAL_REGION: Region = {
  latitude: 52.45801601361907,
  longitude: 13.447302337735891,
  latitudeDelta: 0.46777815072576345,
  longitudeDelta: 0.4941430315375328,
};

const ListingMaps: React.FC<Props> = ({ data }) => {
  const getMarkersVisible = (r: Region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = r;
    return data.features
      .filter((item) => {
        const { latitude: lat, longitude: lon } = item.properties;
        return (
          +lat >= latitude - latitudeDelta / 2 &&
          +lat <= latitude + latitudeDelta / 2 &&
          +lon >= longitude - longitudeDelta / 2 &&
          +lon <= longitude + longitudeDelta / 2
        );
      })
      .slice(0, 20);
  };
  const [markersVisible, setMarkersVisible] = useState<Feature[]>(
    getMarkersVisible(INITIAL_REGION),
  );
  const router = useRouter();
  const onMarkerSelected = (data: Feature) => {
    router.push(`/listing/${data.properties.id}`);
  };

  const renderClusterMethod = () => {
    return markersVisible.map((item) => (
      <Marker
        id={item.properties.id}
        coordinate={{
          latitude: +item.properties.latitude,
          longitude: +item.properties.longitude,
        }}
        key={item.properties.id}
        onPress={() => onMarkerSelected(item)}
      >
        <View style={styles.marker}>
          <Text style={styles.markerText}>$ {item.properties.price}</Text>
        </View>
      </Marker>
    ));
  };
  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={(r) => {
          setMarkersVisible(getMarkersVisible(r));
        }}
        initialRegion={INITIAL_REGION}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
      >
        {renderClusterMethod()}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    padding: 6,
    elevation: 7,
    zIndex: 999,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowRadius: 100,
    shadowOpacity: 1,
    shadowOffset: { width: 20, height: 20 },
  },
  markerText: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
  },
});
export default ListingMaps;
