import React from 'react'
import { Image, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import LandingPageStyle from "./style/LandScreen"
import Carousel from "react-native-reanimated-carousel"
import { useSharedValue } from 'react-native-reanimated';
import PaginationDot from "../components/PaginationDot"
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');


const LandScreen = () => {
     const navigation = useNavigation();
    const progress = useSharedValue(0);
    const slides = [
        { id: 1, img: require("../assets/swipperLandingPage/sos.jpg"), title: "Help works even when the internet doesn’t.", desc: "Send SOS without mobile data using nearby phones as a rescue mesh." },
        { id: 2, img: require("../assets/swipperLandingPage/autoSync.jpg"), title: "Auto-Syncs the Moment Connectivity Returns", desc: "Pending alerts auto-sync when connectivity comes back — even hours later." },
        { id: 3, img: require("../assets/swipperLandingPage/smartDetect.jpg"), title: "AI that understands danger.", desc: "Your message is analyzed to detect urgency and prioritize rescue." },
    ];

    return (
        <>
            <View style={LandingPageStyle.Screen}>
                <View style={LandingPageStyle.Main}>


                    <Carousel

                        width={width}
                        height={height * 0.7}

                        data={slides}
                        pagingEnabled
                        snapEnabled
                        onProgressChange={(_, p) => progress.value = p}
                        renderItem={({ item }) => (
                            <>
                                <View style={LandingPageStyle.Content}>
                                    <Image style={LandingPageStyle.illustrationImg} source={item.img} />
                                    <Text style={LandingPageStyle.primary}>{item.title}</Text>
                                    <Text style={LandingPageStyle.secondary}>{item.desc}</Text>
                                </View>
                            </>
                        )}
                    />


                    {/* <Image source={require("../assets/swipperLandingPage/autoSync.jpg")} />

                    <Text style={LandingPageStyle.primary}>Auto-Syncs the Moment Connectivity Returns</Text>
                    <Text style={LandingPageStyle.secondary}>Pending alerts auto-sync when connectivity comes back — even hours later.</Text> */}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16,marginBottom:18 }}>
                {slides.map((_, index) => (
                    <PaginationDot key={index} index={index} progress={progress} />
                ))}</View>
                <View style={LandingPageStyle.footer}>
                    <TouchableOpacity  onPress={() => navigation.navigate("LogIn")}  style={LandingPageStyle.primaryBtn} activeOpacity={0.7}>
                        <Text style={LandingPageStyle.primaryBtnText}>Get Started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={LandingPageStyle.secondaryBtn}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default LandScreen
