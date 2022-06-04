import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: 85,
    height: 85,
    borderRadius: 100,
  },

  company_wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: '86%',
    alignItems: "center",

  },
  h1: {
    color: "#fff",
    fontSize:20,
    marginBottom:10,
    marginTop:20
  },
  h2: {
    color: "#fff",
    fontSize:20,
    marginBottom:10
  },
  text: {
    color: "#ffffff",
    marginBottom:5
  },
  company_text_wrapper: {
    marginLeft: 15
  },
});
