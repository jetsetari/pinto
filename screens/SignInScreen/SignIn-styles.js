import { StyleSheet } from "react-native";

let main_green = "#123835";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#006443",
  },
  e_layout: {
    width: '86%',
    marginTop: 0,
    maxWidth: 450,
  },
  logo: {
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    padding: 15,
    marginTop: 10,
    width: "100%"
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
  },
  buttonTextCreate: {
    fontSize: 18,
    color:"#ffffff"
  },
  buttonText: {
    fontSize: 18,
  },
  forgotButton: {
    marginTop: 15,
    alignSelf: "flex-end",
    fontSize: 16,
    fontFamily: "TitilliumLight",
  },
  forgotButtonText: {
    fontSize: 16,
    color: "#ffffff",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textDecorationLine: "underline"
  },

  createButton: {
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
  or: {
    alignSelf: "stretch",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#ffffff",
    height: 1,
    marginTop: 20,
    marginBottom:20
  },
  leftOr: {
    borderColor: main_green,
    borderBottomWidth: 1,
    alignSelf: "stretch",
    // paddingRight:10,
  },
  rightOr: {
    borderColor: main_green,
    borderBottomWidth: 1,
    alignSelf: "stretch",
    // paddingLeft:10
  },
  orText:{
      color: "#ffffff",
      paddingLeft: 12,
      paddingRight: 12,
      marginTop:20,
      position: 'absolute',
      top: -31,
      zIndex: 100,
      fontSize:16,
      fontFamily: "TitilliumLight",
      backgroundColor: main_green,
  }
});
