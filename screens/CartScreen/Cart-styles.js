import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 60, 
    color: "white",
    padding: 30
  },
  headerText:{
    color:"#ffffff",
    fontSize:34,
    paddingLeft:0,
    fontFamily: "TitilliumBold",
    marginBottom: 10
  },
  item : {
    width: '100%',
    backgroundColor: "#35726E",
    borderRadius: 9,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  textWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap', 
    width: '100%'
  },
  productTitle: {
    fontSize:16,
    color:"#fff",
    fontWeight: "normal",
    fontFamily: "TitilliumBold",
    flexWrap: 'wrap'
  },
  productDate: {
    fontSize:12,
    color:"#fff",
    fontWeight: "normal",
    fontFamily: "TitilliumBold",
    flexWrap: 'wrap'
  },
  deleteItem : {
    marginHorizontal: 20,
    marginLeft: 10,
    backgroundColor: '#9F0F28',
    padding: 5,
    borderRadius: 6
  },
  listImage: {
    width: 100,
    height: 100,
    backgroundColor:"#006443",
    paddingTop:0,
    paddingLeft: 0,
    paddingRight:0,
    paddingLeft:0,
    borderTopLeftRadius:9,
    borderBottomLeftRadius:9,
    marginRight: 20
  },
  priceWrap: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop:20,
    width:"100%",
    position: "relative"
  },

  sizes_inner_wrap: {
    flexDirection: "column",

  },
  promoButton: {
    position: 'absolute', backgroundColor: 'red', right: 10, zIndex: 9999,
    backgroundColor: '#ACC63C', top: 18,
    padding: 5,
    borderRadius: 6
  },
  price_inner_wrap: {
    flexDirection: "column",
    alignSelf: 'flex-end',
    marginLeft: 'auto',

  },
  price:{
    color: "#ffffff",
  },
  size_title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "TitilliumBold"
  },
  getPromo: {
    backgroundColor: "#018260",
    height: 55,
    borderRadius: 17,
    alignSelf: "center",
    width: 55,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});
