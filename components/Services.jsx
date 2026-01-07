import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
const Services = () => {
    const [Btn1, setBtn1] = useState(false);
    const [Btn2, setBtn2] = useState(false);
    const [Btn3, setBtn3] = useState(false);
    const [Btn4, setBtn4] = useState(false);

    return (
        <View style={style.screen}>
            <Text style={{ paddingTop: 12, paddingBottom: 4 }}>One Tap Services</Text>
            <View style={style.container}>

                <TouchableOpacity onPress={()=>setBtn1(!Btn1)} activeOpacity={1} style={[{ backgroundColor: Btn1? "#3B82F6": "#3B82F633" }, style.box]}>
                    <View style={{ display: "flex", alignItems: "center", position: "relative", top: 10}}>
                        <Entypo name="location" size={40} color={Btn1? "#FFF": "#3B82F6"}/>
                        <Text style={{ color:  Btn1? "#FFF" : "#3B82F6", paddingVertical: 12, textAlign: "center" }}>Live Location</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>setBtn2(!Btn2)}  activeOpacity={1} style={[{ backgroundColor:  Btn2?  "#6366F1" : "#6366F133" }, style.box]}>
                    <View style={{ display: "flex", alignItems: "center", position: "relative", top: 10 }}>
                        <MaterialCommunityIcons name="robot-outline" size={45} color={Btn2? "#FFF": "#6366F1"} />
                        <Text style={{ color: Btn2? "#FFF" : "#6366F1", paddingVertical: 12, textAlign: "center" }}>AI Urgency Detection</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>setBtn3(!Btn3)}  activeOpacity={1} style={[{ backgroundColor: Btn3? "#06B6D4" : "#06B6D433" }, style.box]}>

                    <View style={{ display: "flex", alignItems: "center", position: "relative", top: 10 }}>
                        <MaterialCommunityIcons name="account-group" size={45} color={Btn3? "#FFF": "#06B6D4"}/>
                        <Text style={{ color:  Btn3? "#FFF" : "#06B6D4", paddingVertical: 12, paddingHorizontal: 4, textAlign: "center" }}>Group Emergency Broadcast</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>setBtn4(!Btn4)}  activeOpacity={1} style={[{ backgroundColor: Btn4? "#EF4444": "#EF444433" }, style.box]}>
                    <View style={{ display: "flex", alignItems: "center", position: "relative", top: 10 }}>
                        <Feather name="alert-triangle" size={40} color={Btn4? "#FFF": "#EF4444"} />
                        <Text style={{ color: Btn4? "#FFF" : "#EF4444", paddingVertical: 12, textAlign: "center" }}>Disaster Mode</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    screen: {
        padding: 12,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    box: {
        width: '48%',     // 2 per row
        // height:100,
        aspectRatio: 1,   // make square
        // backgroundColor: '#e5e7eb',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,

    },
});

export default Services
