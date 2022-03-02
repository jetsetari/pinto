import { StyleSheet, Platform } from "react-native";

let light_green = "#124C47";
let main_green = "#123835"; //"#1E8C62"

export const styles = StyleSheet.create({
  scrollView:{
    backgroundColor: main_green
  },
  container:{
    flex: 1,
    backgroundColor: main_green,
  },
  headerText:{
    color:"#ffffff",
    fontSize:31,
    paddingLeft:0,

    fontFamily: "TitilliumBold",
  },
  header:{
    backgroundColor: main_green,
    height:45,
    width: 200,
    paddingLeft:20,
    paddingRight: 0,
    borderBottomWidth:0,
    shadowOpacity:0,
    elevation: 0,
    fontFamily: "TitilliumBold",
  },
  headerImage: {
    position: "absolute",
    zIndex: 2000,
    right: 20,
   
    width: 105,
    height:100
  },
  
  backButton: {
    backgroundColor: "transparent",
    elevation: 0,
    margin: 0,  
    marginTop: Platform.OS === 'ios' ? -10 : 20,
    alignItems: 'center',
    marginLeft:10,
    top:0
  },
backButtonText:{
  color:"#ffffff",
  fontSize:18,
  position: "relative",
  left: -24,
},
backButtonHidden:{
  opacity:0,
  width:0

},
backIcon: {
  position: "relative",
  left: -10,
  top: 5
},
  e_layout_large_title: {
    width: '86%',
    maxWidth:450,
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  e_layout_small_title: {
    width: "100%",
    marginTop: 17,
    maxWidth: 450,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    top: -4,
    marginBottom: 20
  },
  smallTitles:{
    backgroundColor: main_green,
    borderBottomColor:"#006443",
    borderBottomWidth:1,
    paddingLeft:0,
    height: Platform.OS === "ios" ? 50 : 70,
    paddingRight: 0,
    flexDirection:"row",
    alignItems: "flex-start",
  },
  hidden_title:{
    backgroundColor: main_green,
    borderBottomWidth:0,
    paddingLeft:0,
    height: Platform.OS === "ios" ? 50 : 70,
    paddingRight: 0,
    flexDirection:"row",
    alignItems: "flex-start",
  },
  smallTitlesText:{
    color:"#ffffff",
    fontSize: 18,
    marginTop: Platform.OS === "ios" ? 0 : 24,
    paddingTop:0,
    marginBottom: 20
  },
  e_layout_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom:40
  },
});