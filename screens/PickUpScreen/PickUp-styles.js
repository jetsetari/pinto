import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({

  camera:{
    width: '100%',
    height: Dimensions.get('window').width 
  },
  scanText:{
    color:"#ffffff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontFamily: "TitilliumLight",
  },

  wrongQrCode: {
    width:"100%",
    position: "absolute",
    top:120,
    zIndex:999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  wrongQrCodeText: {
    color: "#ffffff",
    width:"100%",
    textAlign: "center", 
    fontSize: 20,
  },
  loadingContainer:{
    paddingTop:15,
    borderRadius:9,
    paddingBottom:15,
    width:"100%",
    paddingLeft: 10,
    paddingRight:10,
  },
});