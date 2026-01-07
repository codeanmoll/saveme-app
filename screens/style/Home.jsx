import { StyleSheet } from "react-native";

export default StyleSheet.create({
Screen:{
    flex:1,
    // paddingTop:16
    backgroundColor:"#0B0E11"
},
searchBar:{
    borderWidth:1,
    borderColor:"#2F3640",
    padding:12,
    borderRadius:12,
    backgroundColor:"#1A1F26",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",

},
searchText:{
    fontSize:16,
    marginLeft:8,
    color:"#FFFFFF",
    // backgroundColor:"#12161C"
},
BannerWrapper:{
    paddingHorizontal:12,
},
Banner:{
    width:"100%",
    height:150,
    resizeMode:"cover",
    borderRadius:12
}
});