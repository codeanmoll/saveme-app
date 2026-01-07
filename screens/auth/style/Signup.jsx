import { StyleSheet } from "react-native"
export default StyleSheet.create({
    Screen: {
        flex: 1,
        padding: 32,
        backgroundColor: "#0B0E11"

    },
    headline: {
        fontSize: 32,
        color: "#FFF",
        fontWeight: "900",
        marginBottom: 14
    },
    subline: {
        fontSize: 16,
         color: "#B0B6BE",
    },
    main: {
        marginVertical: 42
    }, primaryBtn: {
        backgroundColor: "#E5383B",
        padding: 12,
        borderRadius: 8,
        marginTop:22

    },
    primaryBtnText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 18
    },
    footer:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    plainLine:{
        width:150,
        height:1,
        backgroundColor:"#7A8088"
    },
     plainLineText:{
        marginHorizontal:18,
        color:"#7A8088"
     },
     hyperlink:{
        position:"absolute",
        bottom:70,
        display:"flex",
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        right:22,
         flexDirection:"row"
        // backgroundColor:"#000"
     },
     container:{
     display:"flex",
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
        
     },
     item:{
        fontSize:16,
        color:"#B0B6BE"
     },
     primaryFooterText:{
        color:"#E5383B",
        fontWeight:"600",
        fontSize:16
     }

});