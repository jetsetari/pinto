import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, Button, ActivityIndicator } from "react-native";
import { Content } from "native-base";
import ScrollHeaderContainer from "../../components/ScrollHeaderContainer";
import { StatusBar } from "expo-status-bar";
import { setSelectedCompany } from "../../redux/actions/selectedCompany-actions";
//Redux
import { connect } from "react-redux";
import { getCartProducts, getUser } from "../../firebase/firestore/getData";
import { deleteFromCart } from "../../firebase/firestore/deleteData";
import { View } from "react-native-animatable";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";


function CartScreen(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [promo, setPromo] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [found_promo, set_found_promo] = useState(0);

  useEffect(() => {
    getCartProducts(props.company.selectedCompany.user_id, (result) => {
      setProducts(result);
    })
  }, [products])

  const deleteItem = (product_id) => {
    deleteFromCart(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, product_id, () => {
      getUser(props.company.selectedCompany.user_id, (result) => {
        setProducts(result)
      });
    })
  }

  const getPromoCode = () =>  {
    setPromoLoading(true);
    if (promo.length > 0) {
      findPromo(props.company.selectedCompany.company_holder_id, promo, (result) => {
        setPromoLoading(false);
        if (result) {
          set_found_promo(result[0].price);
        }
      });
    }
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const chooseDish = (dish) => {
    console.log(dish);
    if (props.company.selectedCompany.individual_mode) {
      const {price, ...rest} = dish
      rest.price = price - found_promo
      props.navigation.navigate("Map", { dish: rest, date: dish.date });
    } else {
      setLoading(true);
      addOrderesDishToAisle(false, props.company.selectedCompany.type, props.company.selectedCompany.company_id, props.route.params.machine_id, formatDate(Date.parse(dish.date)), dish, props.company.selectedCompany.user_id, 0, (result, idx, machine_index) => {
        if (result === true) {
          if (props.company.selectedCompany.type === "payment_by_user") {
            setLoading(false);
            setMachineIndex(machine_index);
            const {price, ...rest} = dish
            rest.price = price - found_promo
            props.navigation.navigate("Payment", { dish: rest, aisle: idx, date: dish.date, machine: props.route.params.machine, machine_index: machine_index, result: result });
          } else {
            addEmployeesOrder(props.company.selectedCompany.company_id, props.company.selectedCompany.user_id, dish, idx, dish.date, props.route.params.machine[machine_index].name, props.route.params.machine[machine_index].machine_id, props.route.params.machine[machine_index].id, () => {
              setLoading(false);
              setItemOrdered(true);
              setMachineIndex(machine_index);
            });
          }
        } else {
          setMachineIsFull(true);
        }
      });
    }
  }

  const purchase = (products) => {
    products.forEach(product => {
       chooseDish(product);
    })
  }

  return (
    <ScrollHeaderContainer title="Cart" >
      <StatusBar hidden={false} style="light" />
      <Content style={{marginTop: 50, color: "white"}}>
        {products.map(product => (
          <>
            <Text>{product?.title}</Text>
            <Text>{product?.date}</Text>
            <Button title="delete item" onPress={() => deleteItem(product.id)}/>
          </>
        ))}

        <View >
          <View style={{ flexDirection: "row" }}>
            <TextInput editable={!loading} textAlign={"center"} placeholder="Promo code" placeholderTextColor="#A8A8A8" returnKeyType="done" value={promo} onChangeText={(e) => setPromo(e)} />
            <TouchableOpacity onPress={() => getPromoCode()}>
              {promoLoading ? <ActivityIndicator size="small" color="#fff" /> : <Feather name="chevrons-right" size={22} color="#fff" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addToCart(dish)} >
              <Text style={{color: 'white', marginRight: 10}}>Add to cart</Text><Feather name="shopping-bag" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Button title="purchase items" onPress={() => purchase(products)}/>
        
      </Content>
    </ScrollHeaderContainer>
  );
}

const mapStateToProps = (state) => ({
  company: state.selectedCompany,
});



export default connect(mapStateToProps, null)(CartScreen);
