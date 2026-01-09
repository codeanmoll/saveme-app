import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
const InboxList = ({ unread = 2, isEmergency = false, isOnline = true }) => {
     const navigation = useNavigation();

     
  return (
    <TouchableOpacity activeOpacity={0.7}  onPress={() => navigation.navigate("AiScreen")} style={styles.card}>
      {/* Avatar */}
      <View style={styles.avatarWrap}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://i.pravatar.cc/150?img=5" }}
        />
        {isOnline && <View style={styles.onlineDot} />}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.name}>Username</Text>
            {isEmergency && (
              <Ionicons
                name="alert-circle"
                size={16}
                color="#ff4757"
                style={{ marginLeft: 6 }}
              />
            )}
          </View>
          <Text style={styles.time}>00:24</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.message} numberOfLines={1}>
            Hello this is a description
          </Text>

          {unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#0B0E11",
  },

  avatarWrap: {
    position: "relative",
    marginRight: 12,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },

  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#0B0E11",
  },

  content: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
    paddingBottom: 10,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  time: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  message: {
    color: "#B0B6BE",
    fontSize: 13,
    flex: 1,
    marginRight: 8,
  },

  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff4757",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  unreadText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
});


export default InboxList;
