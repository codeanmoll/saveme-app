import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  emergencyMarker: {
    backgroundColor: "#ff4757",
    padding: 10,
    borderRadius: 20,
  },

pulseRing: {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 140,
  height: 140,
  marginLeft: -70,
  marginTop: -70,
  borderRadius: 70,
  borderWidth: 2,
  borderColor: "rgba(255,71,87,0.6)",
  zIndex: 10,
},


  controls: {
    position: "absolute",
    right: 16,
    top: 100,
  },

  controlBtn: {
    backgroundColor: "#121820",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },

  sosBtn: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#ff4757",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 6,
  },

  sosText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  userDot: {
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: "#4FD1C5",
  borderWidth: 3,
  borderColor: "#fff",
},

});
