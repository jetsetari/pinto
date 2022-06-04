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
    marginTop:0,
    flexDirection:"column", 
    justifyContent:"center", 
    alignItems:"center",
    paddingTop: 0
  },
  TabBarStyleTop:{
    // paddingLeft: "7%",
    // paddingRight: "7%"
    marginTop:10,
    flexDirection:"column", 
    justifyContent:"center", 
    alignItems:"center",
    paddingTop: 10
  },
  orderSuccess:{
    backgroundColor: "#006443",
    padding:20,
    borderRadius:9,
    marginTop:20,
    width: '86%',
    maxWidth:450,
  },
  HeadingText:{
    color:"#ffffff"
  },
  SubHeadingText:{
    color:"#ffffff",
    fontSize: 16,
    marginTop:20
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
});
