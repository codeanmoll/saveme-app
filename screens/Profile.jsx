import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style/ProfileStyle";

const Profile = () => {
  const [locationShare, setLocationShare] = useState(true);
  const [autoSOS, setAutoSOS] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>Anmol Kumar</Text>
          <Text style={styles.email}>anmol@example.com</Text>
        </View>
      </View>

      {/* Sections */}
      <Section title="Emergency Settings">
        <Setting label="Auto SOS Detection" value={autoSOS} onChange={setAutoSOS} />
        <Setting label="Share Live Location" value={locationShare} onChange={setLocationShare} />
        <Action label="Emergency Contacts" icon="call-outline" />
      </Section>

      <Section title="Privacy & Security">
        <Action label="Change Password" icon="lock-closed-outline" />
        <Action label="Blocked Users" icon="ban-outline" />
        <Action label="Two-Factor Authentication" icon="shield-checkmark-outline" />
      </Section>

      <Section title="Notifications">
        <Setting label="Push Notifications" value={notifications} onChange={setNotifications} />
        <Action label="Sound & Vibration" icon="volume-high-outline" />
      </Section>

      <Section title="Appearance">
        <Setting label="Dark Mode" value={darkMode} onChange={setDarkMode} />
      </Section>

      <Section title="App">
        <Action label="Help & Support" icon="help-circle-outline" />
        <Action label="About SOS App" icon="information-circle-outline" />
      </Section>

      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default Profile;

// Reusable Components
const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Setting = ({ label, value, onChange }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Switch value={value} onValueChange={onChange} thumbColor="#ff4757" />
  </View>
);

const Action = ({ label, icon }) => (
  <TouchableOpacity style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Ionicons name={icon} size={18} color="#999" />
  </TouchableOpacity>
);
