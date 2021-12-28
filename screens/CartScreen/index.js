import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Button } from "react-native";
import { Content } from "native-base";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { StatusBar } from "expo-status-bar";
import { setSelectedCompany } from "../../redux/actions/selectedCompany-actions";
//Redux
import { connect } from "react-redux";
import { getCartProducts, getUser } from "../../firebase/firestore/getData";
import { deleteFromCart } from "../../firebase/firestore/deleteData";


function CartScreen(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCartProducts(props.company.selectedCompany.user_id, (result) => {
      setProducts(result);
    })
  }, [])

  const deleteItem = (product_id) => {
    deleteFromCart(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, product_id, () => {
      getUser(props.company.selectedCompany.user_id, (result) => {
        setProducts(result)
      });
    })
  }

  return (
    <ScrollHeaderContainer title="Cart" >
      <StatusBar hidden={false} style="light" />
      <Content style={{marginTop: 50, color: "white"}}>
        {products.map(product => (
          <>
            <Text>{product?.title}</Text>
            <Button title="delete item" onPress={() => deleteItem(product.id)}/>
          </>
        ))}
        
        
      </Content>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});



export default connect(mapStateToProps, null)(CartScreen);
