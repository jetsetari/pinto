import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  ListContainer:{
    paddingTop:20
  },  
  listItem: {
    width:"100%",
    marginTop:0,
    marginLeft: 0,
    marginRight:0,
    paddingTop:0,
    paddingLeft: 0,
    paddingRight:0,
    borderBottomWidth:0,
    marginBottom: 20
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
    height: 160,
    backgroundColor:"#006443",
    paddingTop:0,
    paddingLeft: 0,
    paddingRight:0,
    paddingLeft:0,
    borderTopLeftRadius:9,
    borderTopRightRadius:9
  },
  listItemTextContainer:{
    paddingTop:10,
    backgroundColor: "#35726E",
    borderBottomLeftRadius:9,
    borderBottomRightRadius:9,
    paddingBottom:10,
    width:"100%",
    paddingLeft: 20,
    paddingRight:10,

  },
  noItemTextextContainer:{
    paddingTop:45,
    borderRadius:9,
    paddingBottom:15,
    width:"100%",
    paddingLeft: 10,
    paddingRight:10,
    color: "#6FA09D",
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
    color: "#FFF",
    fontSize:16,
    width: "100%",
    fontFamily: "TitilliumBold",
  },
  noItemText:{
    color: "#6FA09D",
    fontSize:16,
    width: "100%",
    textAlign: "center",
    fontFamily: "TitilliumLight",
  },
  noDishes: {
    
  }
});