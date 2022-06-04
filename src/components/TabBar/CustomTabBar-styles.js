import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
 height:200,
    overflow: "hidden",
  },
  content: {
    flexDirection: "column",
    zIndex: 0,
    width: Dimensions.get("window").width - 30,
    marginBottom: "4%",
    left: "4%",
    right: "4%",
    position: "absolute",
    bottom: "1%",
  },
  subContent: {
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    zIndex: 1,
    position: "absolute",
    bottom: 5,
  }
});