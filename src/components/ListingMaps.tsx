import { Feature, ListingItemGeo } from "@/interfaces/ListingItemGeo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

interface Props {
  data: ListingItemGeo;
}

const airbnbcustommapstyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
]

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
    return markersVisible.map((item, index) => (
      <Marker
        description={`Marker ${index}`}
        id={item.properties.id}
        coordinate={{
          latitude: +item.properties.latitude,
          longitude: +item.properties.longitude,
        }}
        key={item.properties.id}
        onPress={() => onMarkerSelected(item)}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: "transparent",
          }}
        >
          <View style={styles.marker}>
            <Text style={styles.markerText}>$ {item.properties.price}</Text>
          </View>
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
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#1b56b5",
    zIndex: 100,
    elevation: 7,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: { width: 0, height: 2 },
  },
  markerText: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
  },
});
export default ListingMaps;
