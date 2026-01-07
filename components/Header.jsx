import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
const Header = () => {
    return (

        <View style={Style.Screen}>
            <View style={Style.Item1}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="chevron-down-outline" size={15} color="#FFF" />
                    <Text style={Style.Primary}>Location</Text>
                </View>

                <Text style={Style.Secondary}>Username</Text>
            </View>
            <View style={{backgroundColor:"#0B0E11",marginRight: 18,borderRadius: 50,padding:4}}>
                <View style={Style.ImgWrapper}>
                    <Image style={Style.Image} resizeMode="cover" source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/010/856/714/small/user-gradient-icon-button-free-png.png" }} />
                </View>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    Screen: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 12,
        justifyContent: "space-between"
    },
    Item1: {
        marginLeft: 18
    },
    Primary: {
        marginLeft: 3,
        color: "#B0B6BE"
    },
    Secondary: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "600",

    },
    ImgWrapper: {
        borderWidth: 4,
        borderRadius: 50,
        borderColor: "#E53935",
        backgroundColor: "#0B0E11",
        // #E53935   (Strong emergency red)
        // #FB8C00   (Amber / orange warning)
        // #43A047   (Calm safety green)
    },
    Image: {
        width: 40,
        height: 40,
        resizeMode: "cover",
        borderRadius: 25,
        margin: 4,
        backgroundColor: "#FFF"
    }
})

export default Header
