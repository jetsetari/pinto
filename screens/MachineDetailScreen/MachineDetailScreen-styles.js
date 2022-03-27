import { StyleSheet, Dimensions } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from "styled-components";

let statusBarHeight =  getStatusBarHeight()
const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.4;
import Svg, { Text, TSpan, G, Circle, Path } from "react-native-svg";

export const styles = StyleSheet.create({
  image: {
    width:"110%",
    height: 160,
    borderBottomRightRadius: 80000
  },
  HeadingText:{
    color:"#ffffff",
    fontSize: 38,
    paddingLeft:0,
    marginTop: 5,
    paddingTop: 10,
    fontFamily: "TitilliumBold",
  },
  description:{
    color:"#D1F1EF",
    marginTop:0,
    fontFamily: "TitilliumLight",
    fontSize: 18,
    lineHeight: 25
  },
  descriptionname: {
    color:"#ffffff",
    marginTop:0,
    fontFamily: "TitilliumBold",
    fontSize: 18,
    lineHeight: 25
  },
  SubHeadingText:{
    color:"#ACC63C",
    fontSize: 22,
    marginTop:20,
    fontFamily: "TitilliumBold",
    marginBottom: 10
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
  item : {
    backgroundColor: '#1F504C',
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
    backgroundColor: '#112524'
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
    color:"#FFF",
    fontWeight: "normal",
    fontFamily: "TitilliumBold",
    flexWrap: 'wrap',
    lineHeight: 16,
    width: '100%',
    marginTop: 7
  },
  productCount: {
    fontFamily: "TitilliumBold",
    color: "#FFF"
  },
  countWrap: {
    backgroundColor: '#1F504C',
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
    color:"#FFF",
    fontWeight: "normal",
    fontFamily: "TitilliumRegular",
    flexWrap: 'wrap'
  },
  listImage: {
    width: 60,
    height: 60,
    backgroundColor:"#006443",
    paddingTop:0,
    paddingLeft: 0,
    paddingRight:0,
    paddingLeft:0,
    borderTopLeftRadius:9,
    borderBottomLeftRadius:9,
    marginRight: 20
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
  walletnote: {
    marginLeft: 'auto',
    color: "#ffffff",
    fontFamily: "TitilliumLight",
    fontSize: 13,
    marginTop: 5,
    marginRight: 5
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
