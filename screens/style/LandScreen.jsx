import { StyleSheet } from "react-native";

export default StyleSheet.create({
    Screen: {
        flex: 1,
        backgroundColor: "#0B0E11",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    illustrationImg: {
        width: 300,
        height: 400,
        marginBottom: 18,
    },
    Main: {
        display: "flex",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    Content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        margin: 18,
        gap: 18

    },
    primary: {
        fontWeight: "900",
        color: "#FFFFFF",
        fontSize: 26,
        textAlign: "center"
    },
    secondary: {
        color: "#B0B6BE",
        textAlign: "center",
        fontSize: 16
    },
    footer: {
        display: "flex",
        flexDirection: "column",
        margin: 18,
        justifyContent: "center",
        alignSelf: "stretch",
        gap: 18
        // flex: 1,
    },
    primaryBtn: {
        backgroundColor: "#E5383B",
        padding: 12,
        borderRadius: 8

    },
    primaryBtnText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 18
    },
    secondaryBtn: {
        textAlign: "center",
        fontSize: 18,
        color:"#7A8088"
    }

});