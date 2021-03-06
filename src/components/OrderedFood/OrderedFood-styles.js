import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  ListContainer:{
    paddingTop:30
  },  
  checkItem:{
    width: 30,
    height: 30,
    position: "absolute",
    top: 20,
    right: 20
  },
  listItem: {
    width:"100%",
    marginTop:0,
    marginLeft: 0,
    marginRight:0,
    paddingTop:0,
    paddingLeft: 0,
    paddingRight:0,
    borderBottomWidth:0
  },
  listItemTouch: {
    flexDirection: "column",
    width:"100%",
    marginTop:0,
    marginLeft: 0,
    marginRight:0,
    paddingTop:0,
    paddingLeft: 0,
    paddingRight:0,
    borderBottomWidth:0
  },
  listImage: {
    width: "100%",
    height: 120,
    backgroundColor:"#006443",
    paddingTop:0,
    paddingLeft: 0,
    paddingRight:0,
    paddingLeft:0,
    borderTopLeftRadius:9,
    borderTopRightRadius:9
  },
  listItemTextContainer:{
    paddingTop:5,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius:9,
    borderBottomRightRadius:9,
    paddingBottom:10,
    width:"100%",
    paddingLeft: 10,
    paddingRight:10
  },
  noItemTextextContainer:{
    paddingTop:15,
    backgroundColor: "#006443",
    borderRadius:9,
    paddingBottom:15,
    width:"100%",
    paddingLeft: 10,
    paddingRight:10,
  },
  loadingContainer:{
    paddingTop:15,
    borderRadius:9,
    paddingBottom:15,
    width:"100%",
    paddingLeft: 10,
    paddingRight:10,
  },
  listItemText:{
    color: "#000000",
    fontSize:10,
    width: "100%",
    fontFamily: "TitilliumLight",
  },
  listItemTitle:{
    color: "#000000",
    fontSize:14,
    width: "100%",
    fontFamily: "TitilliumBold",
  },
  noItemText:{
    color: "#ffffff",
    fontSize:16,
    width: "100%",
    textAlign: "center"
  },
  noDishes: {
    
  }
});