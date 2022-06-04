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