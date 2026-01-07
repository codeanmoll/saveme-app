import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B0E11",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#fff",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBtn: {
    marginRight: 14,
    backgroundColor: "#12161C",
    padding: 8,
    borderRadius: 12,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 20,
  },

  content: {
    paddingBottom: 30,
  },

  broadcastCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#12161C",
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#ff4757",
  },

  broadcastTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },

  broadcastSub: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
});
