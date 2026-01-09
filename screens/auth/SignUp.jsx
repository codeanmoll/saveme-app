import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, PermissionsAndroid, Platform  } from 'react-native';
import SignUpStyle from "./style/Signup";
import CustomInput from './CustomInput';
import { useNavigation } from '@react-navigation/native';
import api from "./api/api";
import DeviceInfo from "react-native-device-info";
import Geolocation from "@react-native-community/geolocation";
export const getLocation = async () => {
  try {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error("Location permission denied");
      }
    }

    return await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toISOString(),
          });
        },
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });

  } catch (err) {
    console.log("Location error:", err.message || err);
    return null;
  }
};

const SignUp = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");


  
  const getMobileInfo = async () => {
  return {
    os: DeviceInfo.getSystemName(),
    os_version: DeviceInfo.getSystemVersion(),
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    device_name: await DeviceInfo.getDeviceName(),
    app_version: DeviceInfo.getVersion(),
    battery_level: await DeviceInfo.getBatteryLevel(),
    is_charging: await DeviceInfo.isBatteryCharging(),
    last_seen: new Date().toISOString()
  };
};




  const signup = async () => {
    if (!username || !email || !phone || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {

       const mobileInfo = await getMobileInfo();
      const location = await getLocation();

      const res = await api.post("/signup.php", {
        phone,
        email,
        username,
        password,
        status: "Online",
        mobile_info: mobileInfo,
        location :location ,
      });

      if (res.data.success) {
        Alert.alert("Success", "Signup successful");
        navigation.navigate("LogIn");
      } else {
        Alert.alert("Error", res.data.message || "Signup failed");
         console.log("Error", res.data);
      }

    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Server error");
    }
  };

  return (
    <View style={SignUpStyle.Screen}>
      <Text style={SignUpStyle.headline}>Register</Text>
      <Text style={SignUpStyle.subline}>
        Login to make use emergency alert, top up & live tracking and more!
      </Text>

      <View style={SignUpStyle.main}>
        <CustomInput
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
        />
        <CustomInput
          placeholder="Enter your password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={signup}
          style={SignUpStyle.primaryBtn}
          activeOpacity={0.7}
        >
          <Text style={SignUpStyle.primaryBtnText}>Register to continue</Text>
        </TouchableOpacity>
      </View>

      <View style={SignUpStyle.footer}>
        <View style={SignUpStyle.plainLine}></View>
        <Text style={SignUpStyle.plainLineText}>Or</Text>
        <View style={SignUpStyle.plainLine}></View>
      </View>

      <View style={SignUpStyle.hyperlink}>
        <View style={SignUpStyle.container}>
          <Text style={SignUpStyle.item}>Have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("LogIn")}
            style={SignUpStyle.primaryFooterBtn}
            activeOpacity={0.7}
          >
            <Text style={SignUpStyle.primaryFooterText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
