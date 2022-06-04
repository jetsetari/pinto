import { StyleSheet, Dimensions } from "react-native";
import styled from "styled-components";
import { getStatusBarHeight } from 'react-native-status-bar-height';

let statusBarHeight =  getStatusBarHeight()
const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.4;
export const styles = StyleSheet.create({
  HeadingText:{
    color:"#ffffff",
    fontSize:18,
    paddingLeft:0,
    paddingTop: 55,
    fontFamily: "TitilliumBold",
    marginBottom: 10
  },
  NormalText:{
    color:"#ffffff",
    fontSize:13,
    paddingLeft:0,
    fontFamily: "TitilliumLight",
    marginBottom: 10,
    paddingRight: 15
  },
  icon: {
    width: 75, textAlign: 'center', marginRight: 10
  },
  iconText: {
    color:"#ffffff",
    fontSize:11,
    paddingLeft:0,
    paddingTop: 6,
    fontFamily: "TitilliumLight",
    marginBottom: 10,
    textAlign: 'center'
  },
  bannerImage: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#FFFFFF'
  },
  label :{
    backgroundColor: '#FFFFFF',
    width: 65,
    textAlign: 'center',
    paddingVertical:3,
    marginBottom: -10,
    zIndex: 98000,
    marginLeft: 20,
    borderRadius: 8,
  },
  labelText :{
    textAlign: 'center',
    fontFamily: "TitilliumBold",
    fontSize: 10
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