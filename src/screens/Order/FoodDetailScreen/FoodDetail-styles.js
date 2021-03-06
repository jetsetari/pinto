import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import styled from "styled-components";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Svg, { Text, TSpan, G, Circle, Path } from "react-native-svg";

let statusBarHeight =  getStatusBarHeight()
const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.4;
export const styles = StyleSheet.create({
  image: {
    width:"100%",
    height: ITEM_HEIGHT,
  },
  HeadingText:{
    color:"#ffffff",
    fontSize:22,
    paddingLeft:0,
    marginTop: 5,
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
    fontSize: 16,
    marginTop: 10,
    fontFamily: "TitilliumBold",
  },
  IngredientsText:{
    color:"#ffffff",
    marginTop:5,
    fontFamily: "TitilliumLight",
    fontSize: 14,
    marginBottom: 0
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
    width: '86%',
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
  priceWrap: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop:20,
    width:"100%",
    position: "relative"
  },

  sizes_inner_wrap: {
    flexDirection: "column",
    width: width - 120,

  },
  price_inner_wrap: {
    flexDirection: "column",
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginTop: -10
  },
  price:{
    color: "#ffffff",
  },
  size_title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "TitilliumBold"
  },
  getPromo: {
    backgroundColor: "#1F504C",
    height: 55,
    borderRadius: 17,
    alignSelf: "center",
    width: 55,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toCart: {
    backgroundColor: "#1A514D",
    height: 50,
    borderRadius: 17,
    alignSelf: "center",
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10, marginRight: 10,
    flex: 5
  },
  toCartText: {
    textAlign: 'center',
    fontSize: 22,
    color: "#ffffff",
    fontFamily: "TitilliumBold",
    marginHorizontal: 20,
    width: 100
  },
  editCart: {
    backgroundColor: "#ACC63C",
    height: 35,
    width: 35,
    borderRadius: 9,
    alignSelf: "center",
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10,
  },
  cartAmount: {
    width: 60,
    backgroundColor: "#1A514D",
    height: 60,
    borderRadius: 9,
    alignSelf: "center",
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10,
    marginLeft: 15,
    marginRight: 15
  },
  promo: {
    width: 120,
    backgroundColor: "#1F504C",
    borderRadius:17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginTop:10,
    color: "#ffffff",
    textAlign: "left",
    paddingHorizontal: 20,
    fontFamily: "TitilliumBold",
    height: 55,
    fontSize: 10,
  },
  button: {
    backgroundColor: "#ACC63C",
    height: 55,
    borderRadius: 17,
    alignSelf: "center",
    width: '100%',
    marginTop:20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10
  },
  buttonText: {
    fontSize: 17,
    color: "#ffffff",
    fontFamily: "TitilliumBold",
    marginHorizontal: 20,
  },

  cart: {  
    top: 20, 
    right: 0, 
    zIndex: 999999, 
    position: 'absolute', 
    width: 60,
    height: 55,
    flex: 1
  },
  cartlogo: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 10000, 
    width: 60,
    height: 60,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginLeft: 'auto',
    borderColor: '#ACBF5C',
    borderWidth: 6
  },
  cartvalue : {
    position: 'absolute',
    bottom: -6,
    left: -6,
    backgroundColor: '#CB0606',
    width: 20,
    height: 20,
    zIndex: 999999, 
    borderRadius: 10000,
    textAlign: 'center'
  },
  carttext : {
    textAlign: 'center',
    color: '#FFF',
    fontSize:14,
    fontWeight: "normal",
    fontFamily: "TitilliumBold",
  },
  bannerWrapper : {
    width: "100%",
    position: "relative"
  },

  bannerImage: {
    width: "100%",
    height: 300,
    backgroundColor:"#006443",
  },
  arcImage: {
    width: "100%",
    height: 60,
    position: "absolute",
    bottom: 0,
    zIndex: 9000
  },

});


export const CloseBtn = styled.View`
  position: absolute;
  margin-right: 20px;
  top: 20px;
  border-radius: 6px;
  padding: 4px;
  left: 10px;
  z-index:1000
`;

export const Price = styled.Text`
  font-size: 32px;
  color: #fff;
  padding-left: 5px;
  text-align: left;
  font-family: "TitilliumBold";
`;

export const PriceSymbol = () => (
  <Svg width={27} height={38} viewBox="0 0 12 23" xmlns="http://www.w3.org/2000/svg">
    <Text transform="translate(-15 -220)" fill="#ACC63C" fillRule="evenodd" fontFamily="Thonburi-Bold, Thonburi" fontSize={19} fontWeight="bold">
      <TSpan x={14} y={240}>
        {"\u0E3F"}
      </TSpan>
    </Text>
  </Svg>
);

export const ShoppingCar = () => (
  <Svg width={22} height={22} viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
    <G transform="translate(1.111 1)" stroke="#fff" strokeWidth={2} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={5.485} cy={13.322} r={1} />
      <Circle cx={12.538} cy={13.322} r={1} />
      <Path d="M0 0h2.707l1.814 9.093a1.355 1.355 0 001.353 1.094h6.579a1.355 1.355 0 001.353-1.094l1.083-5.697H3.384" />
    </G>
  </Svg>
);