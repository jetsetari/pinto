import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006443"
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 100,
    resizeMode: "cover",
    backgroundColor: "#3A3A3A",
    justifyContent: "center",
    alignItems: "center"
  },
  preview_image: {
    width: width,
    height: width,
    resizeMode: "cover",
    backgroundColor: "#3A3A3A",
    justifyContent: "center",
    alignItems: "center"
  },
  text_profile: {
    fontSize: 22,
    color: "#616161",
    fontFamily: "JakartaBold"
  },
  camera_options: {
    backgroundColor: "#C21331",
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    position: "absolute",
    right: -45,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  camera_preview: {
    flex: 1,
    backgroundColor: "#000",
    flexDirection: "column",
    justifyContent: "center",
    height: 100+"%"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    width: width - 40,
    marginBottom: 20
  },
  buttonContainerTop: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    width: width - 40,
    marginTop: 10
  },
  flash_button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  zap_text: {
    color: "#fff",
    marginLeft: 10
  },
  take_picture: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff"
  },
  camera: {
    height: 100+"%"
  },

  company_wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 86+"%",
    alignItems: "center",
    marginTop: 20
  },
  h2: {
    color: "#C21331",
    fontSize: 26,
    marginBottom: 0,
    textAlign: "left",
    fontFamily: "JakartaRegular"
  },
  h1: {
    color: "#fff",
    fontSize: 25,
    textAlign: "left",
    marginTop: 20,
    marginBottom: 10
  },
  text: {
    color: "#ffffff",
    marginBottom: 5,
    lineHeight: 20,
    fontFamily: "JakartaRegular"
  },
  info_text: {
    color: "#ffffff",
    marginBottom: 5,
    lineHeight: 17,
    fontSize: 12
  },
  company_text_wrapper: {
    marginLeft: 15
  },
  dropDown : {
    color: "#FFFFFF",
    height: 50,
    paddingLeft: 10,
    paddingTop: 15,
    paddingLeft: 20
  }
});
