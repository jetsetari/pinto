import { StyleSheet, Dimensions } from "react-native";

export const globalStyles = StyleSheet.create({
  mainButton: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 20,
    borderColor: "#ACC63C",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E8C62",
  },
  containerLogo: {
    marginTop: 40
  },
  accountlistitem: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "#006443",
  },
  accountlistitem_content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center", 
    width:"100%",
    width: '86%',
    maxWidth:450,
  },
  switch_container:{
    marginTop: 0,
    width: 40,
    height: 27,
    borderRadius: 25,
    backgroundColor: "black",
    padding: 5,
  },
  switch_circle:{
    width: 18,
    height: 18,
    borderRadius: 19,
    backgroundColor: "white",
  },

  mainButtonText: {
    fontSize: 18,
    color:"#ffffff"
  },

  e_layout: {
    width: '86%',
    marginTop: 40,
    maxWidth:450,
  },
  scrollView:{
    backgroundColor:"#123835"
  },
  container:{
    flex: 1,
    backgroundColor: "#123835",
    
  },
  e_layout_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom:40
  },
  button: {
    backgroundColor: "#ACC63C",
    height: 50,
    alignSelf: "stretch",
    width:"100%",
    maxWidth:450,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop:40,
    zIndex:0,
    position:"relative"
  },
  buttonText: {
    fontSize: 18,
  },
});