import { StyleSheet, Dimensions } from "react-native";
import styled from "styled-components";
import { getStatusBarHeight } from 'react-native-status-bar-height';

let statusBarHeight =  getStatusBarHeight()
const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.4;
export const styles = StyleSheet.create({
  image: {
    width:"100%",
    height: ITEM_HEIGHT,
  },
  HeadingText:{
    color:"#ffffff",
    fontSize:28,
    paddingLeft:0,
    marginTop: 5,
    fontFamily: "TitilliumBold",
  },
  description:{
    color:"#ffffff",
    marginTop:0,
    fontFamily: "TitilliumLight",
    fontSize: 18,
    lineHeight: 25
  },
  SubHeadingText:{
    color:"#ACC63C",
    fontSize: 18,
    marginTop:10,
    fontFamily: "TitilliumBold",
  },
  IngredientsText:{
    color:"#ffffff",
    marginTop:5,
    fontFamily: "TitilliumLight",
    fontSize: 16,
    marginBottom: 10
  },
  CheckBoxItem:{
    borderBottomWidth:0,
    flexDirection:"row"

  },
  orderSuccess:{
    backgroundColor: "#006443",
    padding:20,
    borderRadius:9,
    marginTop:20,
    width: "86%",
    maxWidth:450,
  },
  CheckBox:{
    paddingLeft:0,
    marginLeft:0
  },
  CheckBoxText:{
    color:"#ffffff"
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



export const CloseBtn = styled.View`
  position: absolute;
  margin-right: 20px;
  top: ${statusBarHeight + 5};
  border-radius: 6px;
  padding: 4px;
  left: 20px;
  z-index:1000
`;
