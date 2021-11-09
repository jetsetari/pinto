import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  scrollView:{
    backgroundColor:"#123835"
  },
  container:{
    flex: 1,
    backgroundColor: "#123835",
    
  },
  headerText:{
    color:"#ffffff",
    fontSize:34,
    paddingLeft:0,
    fontFamily: "TitilliumBold",
  },
  header:{
    backgroundColor: "#123835",
    height:40,
    paddingLeft:0,
    paddingRight: 0,
    borderBottomWidth:0,
    marginBottom:20,
    shadowOpacity:0,
    elevation: 0
  },
  e_layout_large_title: {
    width: "86%",
    maxWidth:450,
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  e_layout_small_title: {
    width: "86%",
    marginTop: 15,
    maxWidth:450,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "flex-start",
    top:-4
  },
  smallTitles:{
    backgroundColor: "#123835",
    borderBottomColor:"#006443",
    paddingLeft:0,
    height: Platform.OS === 'ios' ? 45 : 70,
    paddingRight: 0,
    flexDirection:"row",
    alignItems: "flex-start",
  },
  hidden_title:{
    backgroundColor: "#123835",
    borderBottomWidth:0,
    height: Platform.OS === 'ios' ? 45 : 70,
  },
  smallTitlesText:{
    color:"#ffffff",
    paddingLeft:0,
    fontSize:18,
    marginTop: Platform.OS === 'ios' ? 0 : 24,
    paddingTop:0,
  },
  e_layout_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom:40
  },
});