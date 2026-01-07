import React, { useState } from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Image, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import HomeStyle from "./style/Home"
import Header from '../components/Header'
import SosBtn from '../components/SosBtn'
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import Services from '../components/Services';

const { height } = Dimensions.get('window');

const Home = () => {
    const [searchBar, setSearchBar] = useState("");

    const minHeight = 190;
    // const midHeight = height * 0.4;
    const maxHeight = height * 0.8;

    const sheetHeight = useSharedValue(minHeight);
    const snapPoints = [minHeight, maxHeight];


    const pan = Gesture.Pan()
        .onUpdate(e => {
            sheetHeight.value = Math.max(minHeight, Math.min(maxHeight, minHeight + e.translationY));
        })
        .onEnd(() => {
            const current = sheetHeight.value;

            let closest = snapPoints[0];
            let minDist = Math.abs(current - snapPoints[0]);

            for (let i = 1; i < snapPoints.length; i++) {
                const dist = Math.abs(current - snapPoints[i]);
                if (dist < minDist) {
                    minDist = dist;
                    closest = snapPoints[i];
                }
            }

            sheetHeight.value = withSpring(closest, { damping: 20 });
        });


    const animatedStyle = useAnimatedStyle(() => ({
        height: sheetHeight.value,
    }));


    return (
        <View style={HomeStyle.Screen}>
            <GestureDetector gesture={pan}>
                <Animated.View
                    style={[
                        {
                            backgroundColor: "#12161C",
                            marginBottom: 18,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            overflow: "hidden",
                        },
                        animatedStyle
                    ]}
                >
                    <Header />
                    <View style={{ paddingHorizontal: 16, paddingVertical: 22, paddingBottom: 12 }}>
                        <View style={HomeStyle.searchBar}>
                            <Ionicons name="search" size={25} color="#7A7A85" />
                            <Text style={HomeStyle.searchText}>Search Your Zone</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", paddingBottom: 8, position: "absolute", bottom: 0, width: "100%" }}>
                        <Ionicons name="chevron-down-outline" size={20} color="#7A8088" />
                    </View>

                    <View style={{ paddingVertical: 30 }}>
                        <Text style={{ color: "#FFF", fontWeight: "900", fontSize: 32, textAlign: "center" }}>Are you in an emergency?</Text>
                        <Text style={{ color: "#B0B6BE", textAlign: "center", padding: 22, paddingTop: 12, }}>
                            Press the SOS button, your live location will be shared with the
                            nearest help centre and your emergency contacts.
                        </Text>
                        <View style={{  padding: 22, margin: 22, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 12 }}>
                            <View style={{display: "flex", justifyContent: "center", alignItems: "center",backgroundColor: "#FFF",padding:22,borderRadius:200}}>
                                <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: "#D32F2F", padding: 22, borderRadius: 100, height: 200, width: 200, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#FFF", fontWeight: "600", fontSize: 62 }}>
                                        SOS
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Animated.View>
            </GestureDetector>

            <View style={HomeStyle.BannerView}>
                <View style={HomeStyle.BannerWrapper}>
                    <Image
                        resizeMode="cover"
                        style={HomeStyle.Banner}
                        source={{ uri: "https://lifesciences.iferp.in/blog/wp-content/uploads/2020/03/Recent-Challenges-in-Disaster-Management.jpg" }}
                    />
                </View>
            </View>

            <Services/>

            <SosBtn />
        </View>
    )
}

export default Home;
