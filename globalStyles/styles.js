import { StyleSheet, Dimensions } from "react-native";

let borderRadius = 9;

export const globalStyles = StyleSheet.create({
  containerLogo: {
    marginTop: 50,
  },
  inputText : {
    fontSize: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    padding: 15,
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
    fontSize: 18,
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
    paddingLeft: 15
  },
  mainLineButtonText: {
    fontFamily: "TitilliumLight",
    fontSize: 18,
    color: "#ACC63C"
  },
  e_layout: {
    width: "86%",
    marginTop: 40,
    maxWidth:450,
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
    width: "86%",
    maxWidth:450,
  }
});
