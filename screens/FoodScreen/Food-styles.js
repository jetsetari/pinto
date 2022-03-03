import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  tab: {
    backgroundColor: "red",
    color: "red",
  },

  tabStyle: {
    backgroundColor: "transparent"
  },

  foodContainer: {
    marginTop: 10
  },
  loadingContainer: {
    marginTop: 40
  },

  cart: {  
    top: 230, 
    right: 30, 
    zIndex: 999999, 
    position: 'absolute', 
    width: 60,
    height: 55,
    flex: 1
  },
  cartlogo: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 10000, 
    width: 50,
    height: 50,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginLeft: 'auto'
  },
  cartvalue : {
    position: 'absolute',
    bottom: 0,
    left: 5,
    backgroundColor: '#ACC63C',
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

  activeTabStyle: {
    backgroundColor: "transparent",
  },
  TabBarStyle:{
    // paddingLeft: "7%",
    // paddingRight: "7%"
    marginTop:50,
    flexDirection:"column", justifyContent:"center", alignItems:"center"
  },
  bannerWrapper : {
    width: "100%",
    height: 300,
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

  tabBarUnderlineStyle: {
    borderBottomWidth: 45,
    borderRadius: 40,
    zIndex: -1,
    borderBottomColor:"#ACC63C",
  },
  ScrollableTab:{
    backgroundColor:"transparent",
    borderBottomWidth:0,
    maxWidth:"100%",
    marginTop: -40,
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
    height: 45
  },
  backgroundTabBar:{
    backgroundColor:"transparent",
    paddingLeft: "7%",
    paddingRight: "7%"
  },
  TabHeadingContainer:{
    flexDirection:"column",
    backgroundColor:"transparent",
    margin: 10
  },
  ActiveTabHeading: {
    color: "#FFF",
    fontSize:16,
    fontWeight: "normal",
    fontFamily: "TitilliumBold",
  },
  TabHeading:{
    fontSize:16,
    color:"#fff",
    fontWeight: "normal",
    fontFamily: "TitilliumBold",
  }, 
  TabSubHeading:{
    fontSize:11,
    color:"#fff",
    fontFamily: "TitilliumLight",
  },
  ActiveTabSubHeading:{
    fontSize:11,
    color:"#FFF",
    fontFamily: "TitilliumLight",
  },
});
