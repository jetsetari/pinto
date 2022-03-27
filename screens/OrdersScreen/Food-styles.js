import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  tab: {
    backgroundColor: "red",
    color: "red",
  },

  tabStyle: {
    backgroundColor: "transparent",
  },

  activeTabStyle: {
    backgroundColor: "transparent",
  },
  TabBarStyle:{
    // paddingLeft: "7%",
    // paddingRight: "7%"
    marginTop:20,
    flexDirection:"column", justifyContent:"center", alignItems:"center"
  },

  tabBarUnderlineStyle: {
    borderBottomWidth: 45,
    borderRadius: 40,
    zIndex: -1,
    borderBottomColor:"#fff",

  },
  ScrollableTab:{
    backgroundColor:"transparent",
    borderBottomWidth:0,
    maxWidth:"100%"
  },
  tabsContainerStyle:{
    paddingLeft: "7%",
    paddingRight: "7%",
    backgroundColor:"transparent",
    height: 45,
  },
  tabContainerStyle:{
    borderBottomWidth:0,
    backgroundColor:"transparent",
    height: 45,
  },
  backgroundTabBar:{
    backgroundColor:"transparent",
    paddingLeft: "7%",
    paddingRight: "7%"
  },
  TabHeadingContainer:{
    flexDirection:"column",
    backgroundColor:"transparent"
  },
  ActiveTabHeading: {
    color: "#000",
    fontSize:16,
    fontWeight: "normal",
  },
  TabHeading:{
    fontSize:16,
    color:"#fff",
    fontWeight: "normal",
  }, 
  TabSubHeading:{
    fontSize:11,
    color:"#fff",
  },
  ActiveTabSubHeading:{
    fontSize:11,
    color:"#000",
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
