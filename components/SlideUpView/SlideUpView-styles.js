import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    borderTopLeftRadius:27,
    borderTopRightRadius:27,
  },
  panelHeader: {
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    padding: 24,
    borderTopLeftRadius:27,
    borderTopRightRadius:27,

    display: "flex",
    alignItems: "center"
  },
  textHeader: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  iconBg: {
    backgroundColor: "red",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1
  },
  panelUpDownIcon:{
    width:40,
    height: 4,
    borderRadius:9,
    backgroundColor: "#CFCFD4",
    position:"absolute",
    top:7
  }
});