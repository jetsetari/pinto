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
    fontSize: 24,
    paddingLeft:0,
    marginTop: 5,
    paddingTop: 10,
    fontFamily: "TitilliumBold",
  },
  description:{
    color:"#D1F1EF",
    marginTop:0,
    fontFamily: "TitilliumLight",
    fontSize: 14,
    lineHeight: 25
  },
  descriptionname: {
    color:"#ffffff",
    marginTop:0,
    fontFamily: "TitilliumBold",
    fontSize: 14,
    lineHeight: 25
  },
  SubHeadingText:{
    color:"#ACC63C",
    fontSize: 18,
    marginTop:20,
    fontFamily: "TitilliumBold",
    marginBottom: 10
  },
  IngredientsText:{
    color:"#ffffff",
    marginTop:5,
    fontFamily: "TitilliumLight",
    fontSize: 14,
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
