import { StyleSheet, Dimensions } from "react-native";
import styled from "styled-components";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get("window");
let statusBarHeight =  getStatusBarHeight()
const CARD_HEIGHT = 120;
const CARD_WIDTH = width * 0.8;

export const styles = StyleSheet.create({

  marker: {
    borderRadius: 80,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  innerMarkerWhite: {
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    borderRadius: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  innerMarkerBlack: {
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    borderRadius: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },

  slideview: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyMachine: {
    width: 20,
    height: 20,
  },
});

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Bubble = styled.View`
  flex-direction: row;
  align-self: flex-start;
  background-color: white;
  border-radius: 6px;
  border: 0.5px solid #cccccc;
  padding: 15px;
  width: 150px;
`;

export const CustomMarkerCurrent = styled.View`
  background-color: black;
  border-radius: 20px;
  padding: 6px 16px;
`;

export const CustomMarker = styled.View`
  background-color: white;
  border-radius: 20px;
  padding: 6px 16px;
`;


