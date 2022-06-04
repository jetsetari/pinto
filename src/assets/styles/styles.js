import { StyleSheet, Dimensions } from "react-native";

let borderRadius = 9;

export const globalStyles = StyleSheet.create({

  //
  loginLogoImg : { width: 155, height: 190, marginTop: 100 },
  errorMsg : { fontSize: 18, textAlign: "center", color: "#FF7A00", width: "80%", marginVertical: 10, fontFamily: "TitilliumLight", },

  mainLoginContainer : { width: '100%', flex: 1, alignItems: 'center', backgroundColor: 'transparent' },

  containerLogo: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#0E2D2A',
    borderRadius: 9,
    paddingTop: 0
  },
  h2: {
    color: "#ADC63A",
    fontSize:25,
    textAlign: "left",
    marginTop:20,
    fontFamily: "TitilliumRegular",
  },
  h1: {
    color: "#FFF",
    fontSize:32,
    textAlign: "left",
    marginTop:20,
    fontFamily: "TitilliumBold",
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#1A514D',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10000,
    position: 'absolute',
    left: 40,
    top: 40
  },
  inputText : {
    fontSize: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    padding: 10,
    marginTop: 10,
    width: "100%",
    fontFamily: "TitilliumLight",
    borderRadius: borderRadius
  },
  mainButton: {
    backgroundColor: "#ACC63C",
    height: 50,
    alignSelf: "stretch",
    width:"100%",
    maxWidth:450,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borderRadius,
    fontFamily: "TitilliumLight",
    paddingLeft: 15
  },
  mainButtonText: {
    fontFamily: "TitilliumBold",
    fontSize: 14,
    color: "#FFFFFF"
  },

  mainLineButton: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 20,
    borderColor: "#ACC63C",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borderRadius,
    paddingLeft: 0
  },
  mainLineWhiteButton: {
    height: 90,
    alignSelf: "stretch",
    marginTop: 20,
    borderColor: "#4D6967",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borderRadius,
    paddingLeft: 15,
    textAlign: 'center'
  },
  mainLineButtonText: {
    fontFamily: "TitilliumLight",
    fontSize: 14,
    color: "#ACC63C",
    textAlign: 'center',
    width: 100+'%'
  },
  e_layout: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20    
  },
  scrollView:{
    backgroundColor:"#123835"
  },
  container:{
    flex: 1,
    backgroundColor: "#123835",
  },
  e_layout_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom:40
  },
  accountlistitem: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "#ADC63A",
    marginHorizontal:20,
    borderRadius: 10
  },
  accountlistitem_content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center", 
    width:"100%",
    width: '86%',
    maxWidth:450,
  }
});
