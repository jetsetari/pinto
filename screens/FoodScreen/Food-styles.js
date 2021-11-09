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

  activeTabStyle: {
    backgroundColor: "transparent",
  },
  TabBarStyle:{
    // paddingLeft: "7%",
    // paddingRight: "7%"
    marginTop:50,
    flexDirection:"column", justifyContent:"center", alignItems:"center"
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
