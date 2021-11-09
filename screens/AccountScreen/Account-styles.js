import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#006443",
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 100,
    paddingBottom: 15
  },

  company_wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "86%%",
    alignItems: "center",
    marginTop:20
  },
  h2: {
    color: "#fff",
    fontSize:20,
    marginBottom:10,
    textAlign: "left",
    fontFamily: "TitilliumBold"
  },
  h1: {
    color: "#ADC63A",
    fontSize:25,
    textAlign: "left",
    marginTop:20,
    fontFamily: "TitilliumRegular",
  },
  text: {
    color: "#ffffff",
    marginBottom:5,
    lineHeight:16,
    fontSize:16,
    fontFamily: "TitilliumLight",
  },
  info_text: {
    color: "#ffffff",
    marginBottom:5,
    lineHeight:21,
    fontSize:16,
    fontFamily: "TitilliumLight",
  },
  company_text_wrapper: {
    marginLeft: 15
  },
  icon: {
    width: 30
  },
  btnText : {
     textAlign:"left",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  accountlistitem: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "#2B5552",
    textAlign: "left",
    marginHorizontal:20,
    borderRadius:10,
  },
  accountlistitemFirst: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "#2B5552",
    textAlign: "left",
    marginHorizontal:20,
    borderRadius:10,
  }
});