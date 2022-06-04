import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#006443",
  },
  e_layout: {
    width: '100%',
    marginTop: 0,
    maxWidth:450,
    paddingHorizontal: 20
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
    width: "100%",
    borderRadius:0
  },
  arrowDown:{
    color:"gray"

  },
  button: {
    backgroundColor: "#ACC63C",
    height: 50,
    alignSelf: "stretch",
    marginTop: 20,
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
    marginTop: 10,
    alignSelf: "flex-end"
  },
  forgotButtonText: {
    fontSize: 16,
    color: "#ffffff",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
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
    backgroundColor: "#006443",
  },

});