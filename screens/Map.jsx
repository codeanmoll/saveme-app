import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import MapboxGL from "@rnmapbox/maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import Geolocation from '@react-native-community/geolocation';
// Rest of your code stays the same
import styles from "./style/MapStyle";

/* -------- MAPBOX SETUP -------- */
MapboxGL.setAccessToken(
  "pk.eyJ1IjoidmxhZG0xcnB1dGluIiwiYSI6ImNtazBhbTZnYzZkczMzZ3F4MW9heWMyYm8ifQ.KyfbEBFbq_nBjODevToCUg"
);
MapboxGL.setTelemetryEnabled(false);

const Map = () => {
  const [center, setCenter] = useState([77.209, 28.6139]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const hasRequested = useRef(false);

  /* -------- Request Location After Map Ready -------- */
  useEffect(() => {
    if (!mapReady) return;
    
    const timer = setTimeout(() => {
      requestLocation();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [mapReady]);

  /* -------- Location Request -------- */
  const requestLocation = async () => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "Location permission is required");
          return;
        }
      }

      Geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          console.log("Location received:", latitude, longitude);
          setUserLocation([longitude, latitude]);
          setCenter([longitude, latitude]);
        },
        err => {
          console.log("Location error:", err);
          Alert.alert("Location Error", err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (e) {
      console.log("Location exception:", e);
    }
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={StyleSheet.absoluteFill}
        styleURL={MapboxGL.StyleURL.Satellite}
        logoEnabled={false}
        compassEnabled={false}
        attributionEnabled={false}
        onDidFinishLoadingMap={() => {
          console.log("Map loaded");
          setMapReady(true);
        }}
      >
        <MapboxGL.Camera 
          zoomLevel={15} 
          centerCoordinate={center}
          animationDuration={0}
        />

        {/* USER LOCATION - only render when available */}
        {userLocation && mapReady && (
          <MapboxGL.PointAnnotation id="me" coordinate={userLocation}>
            <View style={styles.userDot} />
          </MapboxGL.PointAnnotation>
        )}

        {/* DANGER ZONE - only render when map ready */}
        {mapReady && (
          <MapboxGL.ShapeSource
            id="danger"
            shape={{
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [77.208, 28.6145],
              },
            }}
          >
            <MapboxGL.CircleLayer
              id="danger-circle"
              style={{
                circleRadius: 60,
                circleColor: "rgba(255,71,87,0.2)",
                circleStrokeColor: "rgba(255,71,87,0.6)",
                circleStrokeWidth: 2,
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        {/* EMERGENCY MARKER */}
        {mapReady && (
          <MapboxGL.PointAnnotation id="emergency" coordinate={[77.208, 28.6145]}>
            <View style={styles.emergencyMarker}>
              <Ionicons name="alert" size={18} color="#fff" />
            </View>
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>

      {/* CONTROLS */}
      <View style={styles.controls}>
        <Control icon="locate-outline" onPress={requestLocation} />
        <Control icon="layers-outline" />
        <Control icon="filter-outline" />
      </View>

      {/* SOS BUTTON */}
      <TouchableOpacity style={styles.sosBtn}>
        <Ionicons name="warning-outline" size={28} color="#fff" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Map;

const Control = ({ icon, onPress }) => (
  <TouchableOpacity style={styles.controlBtn} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#fff" />
  </TouchableOpacity>
);