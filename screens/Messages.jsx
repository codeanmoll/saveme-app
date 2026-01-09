import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InboxList from "../components/InboxList";
import styles from "./style/MessagesStyle";
import { useNavigation } from '@react-navigation/native';

const Messages = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="megaphone-outline" size={22} color="#ff4757" />
          </TouchableOpacity>
          <Image
            style={styles.avatar}
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Emergency Broadcast Card */}
        <TouchableOpacity style={styles.broadcastCard}>
          <Ionicons name="alert-circle-outline" size={24} color="#ff6b6b" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.broadcastTitle}>Emergency Broadcast</Text>
            <Text style={styles.broadcastSub}>
              Send alert to all nearby users
            </Text>
          </View>
        </TouchableOpacity>

        {/* Inbox */}
        <InboxList />
      </ScrollView>
      <View style={{backgroundColor:"#A4161A",width:70,height:70,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center", position:"absolute",bottom:30,right:20}} onTouchEnd={() => navigation.navigate("AiScreen")}>
        <MaterialCommunityIcons name="robot-happy" color="#FFF" size={40} />
      </View>
    </View>
  );
};

export default Messages;
