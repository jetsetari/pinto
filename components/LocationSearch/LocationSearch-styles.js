import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components";

let statusBarHeight = getStatusBarHeight();

export const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    padding: 15,
    paddingTop: 18,
    marginTop: 10,
    width: "75%",
    borderBottomWidth: 0,
    position: "absolute",
    fontFamily: "TitilliumLight",
    top: statusBarHeight - 10,
    height: 45,
    right: 20,
    borderRadius: 40,
    borderWidth: 0,
    elevation: 0,
  },
  searchResults: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: statusBarHeight + 50,
    width: "75%",
    zIndex: 999,
    maxHeight:250,
    borderRadius: 9,
    right: 20
  },
  listItem: {
    height: 50,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 20,
  },
  listItemText: {
    fontSize: 16,
  },
  searchBarWrapper: {
    position: "absolute",
    top: 0,
    height:100,
    width: "100%",
  },
  searchBarWrapperActive: {
    position: "absolute",
    top: 0,
    height: 0,
    width: "100%",
    backgroundColor:"#fff"
  },
});
export const CloseBtn = styled.View`
  position: absolute;
  margin-right: 20px;
  top: ${statusBarHeight - 5};
  border-radius: 6px;
  padding: 4px;
  left: 20px;
  z-index:1000
`;
