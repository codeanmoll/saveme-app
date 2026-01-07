import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F14",
    padding: 16,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121820",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  email: {
    fontSize: 13,
    color: "#8A94A6",
    marginTop: 4,
  },

  section: {
    backgroundColor: "#121820",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ff4757",
    marginVertical: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
  },

  rowLabel: {
    fontSize: 14,
    color: "#E5E7EB",
  },

  logoutBtn: {
    backgroundColor: "#ff4757",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});
