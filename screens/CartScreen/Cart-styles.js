import { StyleSheet, Dimensions } from "react-native";

import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from "styled-components";

let statusBarHeight =  getStatusBarHeight()
const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.4;
import Svg, { Text, TSpan, G, Circle, Path } from "react-native-svg";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 80, 
    color: "white",
    padding: 30,
  },
  headerText:{
    color:"#ffffff",
    fontSize:34,
    paddingLeft:0,
    fontFamily: "TitilliumBold",
    marginBottom: 10
  },
  item : {
    width: '100%',
    borderRadius: 9,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  itemcontent: {
    borderRadius: 9,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  textWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap', 
    width: '100%',
    paddingRight: 20
  },
  productTitle: {
    fontSize:14,
    color:"#000",
    fontWeight: "normal",
    fontFamily: "TitilliumBold",
    flexWrap: 'wrap',
    lineHeight: 16,
    width: '100%',
    marginTop: 7
  },
  countWrap: {
    backgroundColor: '#DFDFDF',
    width: 40,
    height: 40,
    borderRadius: 8,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  productDate: {
    fontSize:12,
    color:"#000",
    fontWeight: "normal",
    fontFamily: "TitilliumRegular",
    flexWrap: 'wrap'
  },
  deleteItem : {
    marginLeft: 10,
    backgroundColor: '#9F0F28',
    padding: 5,
    borderRadius: 6
  },
  editItem : {
    marginLeft: 10,
    backgroundColor: '#ACC63C',
    padding: 3,
    borderRadius: 6,
    marginTop: 2,
    marginBottom: 2
  },
  productCount: {
    fontFamily: "TitilliumBold",
    color: "#4F4F4F"
  },
  listImage: {
    width: 80,
    height: 80,
    backgroundColor:"#006443",
    paddingTop:0,
    paddingLeft: 0,
    paddingRight:0,
    paddingLeft:0,
    borderTopLeftRadius:9,
    borderBottomLeftRadius:9,
    marginRight: 20
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

  },
  promoButton: {
    position: 'absolute', backgroundColor: 'red', right: 10, zIndex: 9999,
    backgroundColor: '#ACC63C', top: 18,
    padding: 5,
    borderRadius: 6
  },
  price_inner_wrap: {
    flexDirection: "column",
    alignSelf: 'flex-end',
    marginLeft: 'auto',
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
    backgroundColor: "#018260",
    height: 55,
    borderRadius: 17,
    alignSelf: "center",
    width: 55,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});

export const Price = styled.Text`
  font-size: 32px;
  color: #fff;
  padding-left: 5px;
  text-align: left;
  font-family: "TitilliumBold";
`;

export const CloseBtn = styled.View`
  position: absolute;
  margin-right: 20px;
  top: ${statusBarHeight + 5};
  border-radius: 6px;
  padding: 4px;
  left: 20px;
  z-index:1000
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