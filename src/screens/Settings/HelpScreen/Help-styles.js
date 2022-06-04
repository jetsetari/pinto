import { StyleSheet, Dimensions } from "react-native";
import styled from "styled-components";
import { getStatusBarHeight } from 'react-native-status-bar-height';

let statusBarHeight =  getStatusBarHeight()
const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.4;
export const styles = StyleSheet.create({
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
  accountlistitem: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "#0D2322",
    textAlign: "left"
  },
  accountlistitemFirst: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "#0D2322",
    textAlign: "left",
    borderRadius:10,
    width: 100+'%'
  }
});

export const CloseBtn = styled.View`
  position: absolute;
  margin-right: 20px;
  border-radius: 6px;
  padding: 4px;
  left: 20px;
  z-index:1000
`;