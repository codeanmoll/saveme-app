import { Text, View, PanResponder, Dimensions, Animated as RNAnimated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useRef, useState, useEffect } from "react";
import { BottomTabBar } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home";
import Messages from "../screens/Messages";
import Map from "../screens/Map";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarItemStyle: {
                        justifyContent:"space-between",
                        alignItems: "center",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor:"#12161C",
                       

                    },

                    tabBarIcon: ({ focused }) => {
                        let iconName = "home-outline";
                        let label = route.name;

                        if (route.name === "Home") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Map") {
                            iconName = focused ? "location" : "location-outline";
                        } else if (route.name === "Messages") {
                            iconName = focused ? "chatbox" : "chatbox-outline";
                        } else if (route.name === "Profile") {
                            iconName = focused ? "person" : "person-outline";
                        }

                        return (
                            <View style={{ alignItems: "center" }}>
                                <Ionicons
                                    name={iconName}
                                    size={26}
                                    color={focused ? "#FFF" : "#777"}
                                />
                                {/* <Text style={{ color: focused ? "#000" : "#777", fontSize: 12, width: 60, textAlign: "center" }}>
                                    {label}
                                </Text> */}
                            </View>
                        );
                    },
                })}
            >

                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Map" component={Map} />
                <Tab.Screen name="Messages" component={Messages} />
                <Tab.Screen name="Profile" component={Profile} />


            </Tab.Navigator>
        </>
    )
}

