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
    fontSize:28,
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
    fontSize: 18,
    marginTop:40,
    fontFamily: "TitilliumBold",
  },
  IngredientsText:{
    color:"#ffffff",
    marginTop:5,
    fontFamily: "TitilliumLight",
    fontSize: 16,
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
    flexDirection: "row",
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
  },
  price:{
    color: "#ffffff",
  },
  size_title: {
    color: "#9D9595",
    marginTop: 0,
    fontSize: 16,
    fontFamily: "TitilliumLight"
  },
  getPromo: {
    backgroundColor: "#ACC63C",
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
    backgroundColor: "#ACC63C",
    height: 55,
    borderRadius: 17,
    alignSelf: "center",
    width: 130,
    marginTop:10,
    marginLeft: 8 + '%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  promo: {
    width: 105,
    backgroundColor: "#018260",
    borderRadius:17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop:10,
    color: "#ffffff",
    textAlign: "left",
    paddingHorizontal: 10,
    fontFamily: "TitilliumBold",
    height: 55,
  },
  button: {
    backgroundColor: "#ACC63C",
    height: 70,
    borderRadius: 17,
    alignSelf: "center",
    width: 150,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:60
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "TitilliumBold",
    marginLeft: 20,
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

export const Price = styled.Text`
  font-size: 18px;
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