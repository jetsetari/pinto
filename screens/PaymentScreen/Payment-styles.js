import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: '86%',
    maxWidth:450,
    height: 250,
    backgroundColor:"#006443",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  HeadingText:{
    color:"#ffffff",
    fontSize:28,
    paddingLeft:0,
    paddingTop: 55,
    fontFamily: "TitilliumBold",
  },
  description:{
    color:"#ffffff",
    marginTop:10,
    fontFamily: "TitilliumLight",
    fontSize: 18,
    lineHeight: 25
  },
  SubHeadingText:{
    color:"#ACC63C",
    fontSize: 18,
    marginTop:40,
    fontFamily: "TitilliumBold",
  },
  IngredientsText:{
    color:"#ffffff",
    marginTop:5,
    fontFamily: "TitilliumRegular",
  },
  CheckBoxItem:{
    borderBottomWidth:0,
    flexDirection:"row"

  },
  orderSuccess:{
    backgroundColor: "#006443",
    padding:20,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    width: '86%',
    maxWidth:450,
  },
  orderFailed:{
    backgroundColor: "#006443",
    padding:20,
    borderRadius:9,
    width: '86%',
    maxWidth:450,
  },
  CheckBox:{
    paddingLeft:0,
    marginLeft:0
  },
  CheckBoxText:{
    color:"#ffffff",
    fontFamily: "TitilliumRegular",
  },
  RadioButtonsWrap:{
    marginTop:30,
    marginBottom:40
  },
  RadioButtonWrap: {
    marginTop:10
  },
  BackArrowWrap:{
    top:0,
    left:0,
    position: 'absolute',
    backgroundColor:"#2A3E37",
    zIndex:998,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 100,
    borderTopWidth: 100,
    borderRightColor: "transparent",
    borderTopColor: "#2A3E37",
  },
  BackArrow:{
    zIndex:999,
    position: 'absolute',
    top:17,
    left:10,
  },
});
